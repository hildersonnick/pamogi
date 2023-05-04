import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

import TreeMenu, { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
import './treeStyles.css';
import {
    Group,
    Button,
    Center,
    TextInput,
    Input,
    Divider,
    ActionIcon,
    Tooltip,
    Dialog,
    Text,
    Title,
    Modal,
    Container,
    Paper,
    Stack,
    Accordion,
    MultiSelect,
    createStyles,
    rem,
    Select,
    Loader
} from '@mantine/core';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { TiDeleteOutline } from 'react-icons/ti';
import { TiDelete } from 'react-icons/ti';
import { useDisclosure } from '@mantine/hooks';
import { DatePicker } from '@mantine/dates';
import { BiErrorAlt } from 'react-icons/bi';

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        minHeight: 650
    },

    title: {
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`
    },

    item: {
        zIndex: 1,

        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
    }
}));

export default function Departments(props) {
    const { classes } = useStyles();

    const [topics, setTopics] = useState([]);
    const pb = new PocketBase('https://pamogi.pockethost.io');

    const [loadingTopics, setLoadingTopics] = useState(false);

    const fetchTopics = async () => {
        setLoadingTopics(true); // Set loading state to true before fetching topics

        try {
            const departmentLabel = props.department;
            const projectId = props.projectId; // Add this line
            const departments = await pb.collection('departments').getFullList();

            const fetchedDepartment = departments.find(
                (department) => department.label === departmentLabel && department.projectId === projectId
            );

            if (fetchedDepartment) {
                const departmentId = fetchedDepartment.id;

                const fetchedItems = await pb.collection('items').getFullList();

                // Update the filteredItems with an additional filter for projectId
                const filteredItems = fetchedItems.filter(
                    (item) =>
                        item.parentDepartmentId.includes(departmentId) &&
                        item.projectId === projectId &&
                        (item.approved || item.creator === pb.authStore.model.email || props.owner)
                );

                const topics = filteredItems
                    .filter((item) => item.type === 'topic')
                    .map((topic) => ({
                        id: topic.id, // Add this line
                        key: topic.id,
                        label: topic.label,
                        url: '',
                        subtopics: [],
                        synced: topic.synced,
                        approved: topic.approved
                    }));

                const subtopics = filteredItems.filter((item) => item.type === 'subtopic');
                const subsubtopics = filteredItems.filter((item) => item.type === 'subsubtopic');

                for (const subtopic of subtopics) {
                    const parentTopic = topics.find((topic) => topic.key === subtopic.parentItemId[0]);
                    if (parentTopic) {
                        parentTopic.subtopics.push({
                            key: subtopic.id,
                            label: subtopic.label,
                            approved: subtopic.approved,
                            url: '',
                            subsubtopics: []
                        });
                    }
                }

                for (const subsubtopic of subsubtopics) {
                    for (const topic of topics) {
                        const parentSubtopic = topic.subtopics.find((subtopic) => subtopic.key === subsubtopic.parentItemId[0]);
                        if (parentSubtopic) {
                            parentSubtopic.subsubtopics.push({
                                key: subsubtopic.id,
                                label: subsubtopic.label,
                                approved: subsubtopic.approved,
                                url: ''
                            });
                            break;
                        }
                    }
                }
                console.log(topics);
                setTopics(topics); // Add this line to update the state with the fetched topics

                return topics;
            }
        } catch (error) {
            console.error('Error fetching topics:', error);
        } finally {
            setLoadingTopics(false); // Set loading state to false after fetching topics
        }
    };

    useEffect(() => {
        if (props.department) {
            fetchTopics().then((fetchedTopics) => setTopics(fetchedTopics));
        }
    }, [props.department]);

    useEffect(() => {
        setOwner(props.owner);
    }, [props.owner]);

    const handleApiCall = async (id, data) => {
        // Ensure parentDepartmentId is an array of strings
        if (data.parentDepartmentId && Array.isArray(data.parentDepartmentId)) {
            data.parentDepartmentId = data.parentDepartmentId.flat();
        }

        // Ensure parentItemId is an array of strings
        if (data.parentItemId && Array.isArray(data.parentItemId)) {
            data.parentItemId = data.parentItemId.flat();
        }

        try {
            const response = await pb.collection('items').create({ ...data, synced: true });
            return response; // Return the response object
        } catch (error) {
            console.error(`Error creating item for element with ID: ${id}`, error);
        }
    };

    const deleteItemAndChildren = async (itemKey, level) => {
        // Delete the item itself
        await pb.collection('items').delete(itemKey);

        if (level === 0) {
            // If the item is a topic, delete all its subtopics and subsubtopics
            const subtopics = topics.find((topic) => topic.key === itemKey)?.subtopics || [];
            for (const subtopic of subtopics) {
                await deleteItemAndChildren(subtopic.key, 1);
            }
        } else if (level === 1) {
            // If the item is a subtopic, delete all its subsubtopics
            const subsubtopics =
                topics.flatMap((topic) => topic.subtopics).find((subtopic) => subtopic.key === itemKey)?.subsubtopics || [];
            for (const subsubtopic of subsubtopics) {
                await deleteItemAndChildren(subsubtopic.key, 2);
            }
        }
    };

    const extractKey = (key) => {
        const keyParts = key.split('/');
        return keyParts[keyParts.length - 1];
    };
    const handleDeleteClick = async (item) => {
        const [topicKey, subtopicKey, subsubtopicKey] = item.key.split('/');

        const itemKeyToDelete = extractKey(item.key);

        if (subsubtopicKey) {
            // We're on the subsubtopic level, delete the subsubtopic from its parent subtopic
            const newTopics = topics.map((topic) => ({
                ...topic,
                subtopics: topic.subtopics.map((subtopic) => ({
                    ...subtopic,
                    subsubtopics: subtopic.subsubtopics.filter((subsubtopic) => extractKey(subsubtopic.key) !== itemKeyToDelete)
                }))
            }));
            setTopics(newTopics);
        } else if (subtopicKey) {
            // We're on the subtopic level, delete only the subtopic and its children (subsubtopics)
            const newTopics = topics.map((topic) => ({
                ...topic,
                subtopics: topic.subtopics.filter((subtopic) => extractKey(subtopic.key) !== itemKeyToDelete)
            }));
            setTopics(newTopics);
        } else {
            // We're on the topic level, delete the entire topic and all its children (subtopics and subsubtopics)
            const newTopics = topics.filter((topic) => extractKey(topic.key) !== itemKeyToDelete);
            setTopics(newTopics);
        }

        if (topicKey) {
            if (subsubtopicKey) {
                // We're on the subsubtopic level
                await deleteItemAndChildren(itemKeyToDelete, 2);
            } else if (subtopicKey) {
                // We're on the subtopic level
                await deleteItemAndChildren(itemKeyToDelete, 1);
            } else {
                // We're on the topic level
                await deleteItemAndChildren(itemKeyToDelete, 0);
            }
        }
    };

    const handleAddTopic = () => {
        setNewName('New Topic');
        setEditItem({
            key: `topic-${topics.length + 1}`,
            label: 'New Topic',
            level: 0
        });
        toggle();
    };

    const handleHelloClick = (item) => {
        const [topicKey, subtopicKey, subsubtopicKey] = item.key.split('/');

        if (subsubtopicKey) {
            // We're on the subsubtopic level, adding subsubtopics is not allowed
            return;
        } else if (subtopicKey) {
            // We're on the subtopic level, add a new subsubtopic to the current subtopic
            handleAddSubtopicOrSubsubtopic(topicKey, subtopicKey, 2);
        } else {
            // We're on the topic level, add a new subtopic to the current topic
            handleAddSubtopicOrSubsubtopic(topicKey, null, 1);
        }
    };
    const [errorMessage, setErrorMessage] = useState('');

    const fetchDepartmentId = async (departmentLabel, projectId) => {
        try {
            // Fetch the first record that matches the specified department label and project ID
            const record = await pb.collection('departments').getFirstListItem(`label="${departmentLabel}" && projectId="${projectId}"`);

            if (record && record.id) {
                setDepartmentId(record.id);
            } else {
                console.error('Department ID not found.');
            }
        } catch (error) {
            console.error('Error fetching department ID:', error);
        }
    };

    useEffect(() => {
        if (props.department) {
            fetchTopics();
            fetchDepartmentId(props.department, props.projectId); // Add this line
        }
    }, [props.department, props.projectId]);

    const [owner, setOwner] = useState();

    const handleConfirm = async () => {
        setLoading(true);

        const existingTopic = topics.find((topic) => topic.label === newName);
        if (existingTopic) {
            setLoading(false);
            setErrorMessage('A topic with the same name already exists. Please provide a unique name.');
            return;
        }

        let newTopics = [...topics];
        let itemType = 'topic';
        let parentId = null;

        if (!editItem || (editItem && !editItem.isAdding)) {
            itemType = 'topic';
            parentId = null;
        } else {
            if (editItem.level === 0) {
                itemType = 'topic';
                parentId = null;
            } else if (editItem.level === 1) {
                itemType = 'subtopic';
                const parentTopic = topics.find((t) => t.key === editItem.key.split('/')[0]);
                parentId = parentTopic.id; // This should now work correctly
            } else if (editItem.level === 2) {
                itemType = 'subsubtopic';
                const parentTopic = topics.find((t) => t.key === editItem.key.split('/')[0]);
                const parentSubtopic = parentTopic.subtopics.find((st) => st.key === editItem.key.split('/')[1]);
                parentId = parentSubtopic.id || parentSubtopic.key; // Use id if available, else use key
                console.log(parentSubtopic);
            }
        }

        const newItem = {
            key: `${itemType}-${newTopics.filter((t) => !t.synced).length + 1}`,
            label: newName,
            url: '',
            synced: false,
            approved: props.owner // Set approved status to true if the user is an owner
        };

        if (itemType === 'topic') {
            newItem.subtopics = [];
            newTopics = [...topics, newItem];
        } else if (itemType === 'subtopic') {
            const parentTopic = newTopics.find((t) => t.key === editItem.key.split('/')[0]);
            newItem.subsubtopics = [];
            parentTopic.subtopics = [...parentTopic.subtopics, newItem];
        } else if (itemType === 'subsubtopic') {
            const parentTopic = newTopics.find((t) => t.key === editItem.key.split('/')[0]);
            const parentSubtopic = parentTopic.subtopics.find((st) => st.key === editItem.key.split('/')[1]);
            parentSubtopic.subsubtopics = [...parentSubtopic.subsubtopics, newItem];
        }

        setTopics(newTopics);
        setNewName('');
        setEditItem(null);
        setLoading(false);
        close();

        const apiCallData = {
            label: newItem.label,
            type: itemType,
            projectId: props.projectId,
            parentDepartmentId: departmentId ? [departmentId] : [],
            parentItemId: parentId ? [parentId] : [],
            approved: owner,
            creator: props.creatorEmail // Add the creator's ID or username here
        };

        const response = await handleApiCall(newItem.key, apiCallData);

        if (response) {
            const setItemData = (item) => {
                if (item.key === newItem.key) {
                    return { ...item, id: response.id, synced: true };
                }
                return item;
            };

            const updatedTopics = newTopics.map((topic) => {
                if (itemType === 'topic') {
                    return setItemData(topic);
                }

                return {
                    ...topic,
                    subtopics: topic.subtopics.map((subtopic) => {
                        if (itemType === 'subtopic') {
                            return setItemData(subtopic);
                        }

                        return {
                            ...subtopic,
                            subsubtopics: subtopic.subsubtopics.map((subsubtopic) => {
                                if (itemType === 'subsubtopic') {
                                    return setItemData(subsubtopic);
                                }
                                return subsubtopic;
                            })
                        };
                    })
                };
            });

            setTopics(updatedTopics);
        }
    };

    const [opened, { toggle, close }] = useDisclosure(false);
    const [editItem, setEditItem] = useState(null);
    const [newName, setNewName] = useState('');

    const handleAddSubtopicOrSubsubtopic = (topicKey, subtopicKey, level) => {
        let editKey;
        if (level === 1) {
            editKey = topicKey;
        } else {
            editKey = `${topicKey}/${subtopicKey}`;
        }

        setEditItem({
            key: editKey,
            level: level,
            isAdding: true // Add this line
        });
        setNewName(level === 1 ? 'New Subtopic' : 'New Subsubtopic');
        toggle();
    };

    const getDialogTitle = () => {
        if (!editItem) {
            return '';
        }
        if (editItem.level === undefined) {
            return 'Edit Name';
        } else if (editItem.level === 1) {
            return 'Add Subtopic';
        } else if (editItem.level === 2) {
            return 'Add Subsubtopic';
        } else if (editItem.level === 0) {
            return 'Add Topic';
        }
    };

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setNewName(e.target.value);
        setErrorMessage(''); // Reset the error message
    };
    const [departmentId, setDepartmentId] = useState(null);

    const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskTags, setTaskTags] = useState([]);
    const [taskCompetencies, setTaskCompetencies] = useState([]);
    const [taskBudget, setTaskBudget] = useState('');
    const [taskReferralBudget, setTaskReferralBudget] = useState('');
    const [taskEndDate, setTaskEndDate] = useState();
    const [taskAssignedTo, setTaskAssignedTo] = useState('');
    const [taskResult, setTaskResult] = useState('');

    const handleAddTask = (item) => {
        const itemParts = item.key.split('/');
        const newItemKey = itemParts[itemParts.length - 1]; // Extract the last part of the key
        const newItem = { ...item, key: newItemKey };
        setSelectedItem(newItem);
        open2();
    };

    const [selectedItem, setSelectedItem] = useState('');

    const handleSubmitTask = async () => {
        if (formMode === 'create') {
            if (!selectedItem) {
                console.error('No item selected');
                return;
            }

            setSubmitting(true); // Start the loading state

            const taskData = {
                title: taskTitle,
                description: taskDescription,
                assignedTo: taskAssignedTo,
                status: 'New', // Set an initial status for the task
                itemId: selectedItem.key, // Update this line, change from array to string
                tags: JSON.stringify(taskTags.map((tag) => tag.label)),
                competencies: JSON.stringify(taskCompetencies.map((competency) => competency.label)),
                budget: taskBudget,
                referralBudget: taskReferralBudget,
                endDate: taskEndDate,
                result: taskResult,
                approved: owner,
                creator: props.creatorEmail // Add the creator's ID or username here
            };

            try {
                await pb.collection('tasks').create(taskData); // Add this line to create the task in the backend

                close2(); // Close the modal
                fetchTaskCount(selectedItem.key); // Fetch the new task count for the selected item
            } catch (error) {
                console.error('Error creating task:', error);
            } finally {
                setSubmitting(false); // End the loading state
            }
        } else if (formMode === 'edit') {
            const data = {
                title: taskTitle,
                description: taskDescription,
                assignedTo: taskAssignedTo,
                tags: JSON.stringify(taskTags),
                competencies: JSON.stringify(taskCompetencies),
                budget: taskBudget,
                referralBudget: taskReferralBudget,
                endDate: taskEndDate,
                result: taskResult
            };

            await pb.collection('tasks').update(editingTaskDetails.id, data); // Use editingTaskDetails here
            // Update the task in the `selectedTasks` list
            // Reset form state
            resetForm();
            // Close the form
            close2();
            close3();
        }
    };

    const handleFormClose = () => {
        close2();
        setFormMode('create');
        setTaskTitle('');
        setTaskDescription('');
        setTaskAssignedTo('');
        setTaskTags([]);
        setTaskCompetencies([]);
        setTaskBudget('');
        setTaskReferralBudget('');
        setTaskEndDate(null);
        setTaskResult('');
    };
    const resetForm = () => {
        setTaskTitle('');
        setTaskDescription('');
        setTaskAssignedTo('');
        setTaskTags([]);
        setTaskCompetencies([]);
        setTaskBudget('');
        setTaskReferralBudget('');
        setTaskEndDate('');
        setTaskResult('');
    };

    const [taskCounts, setTaskCounts] = useState({});

    const fetchTaskCount = async (itemId) => {
        const tasks = await pb.collection('tasks').getFullList();

        // Filter tasks using Array.prototype.some() method and only include approved tasks
        const tasksForItem = tasks.filter((task) => task.itemId.some((id) => id === itemId) && task.approved);

        setTaskCounts((prevTaskCounts) => {
            const updatedTaskCounts = {
                ...prevTaskCounts,
                [itemId]: tasksForItem.length
            };

            return updatedTaskCounts;
        });
    };

    const fetchTaskCountsForItems = async (items) => {
        for (const item of items) {
            await fetchTaskCount(item.key);
            if (item.subtopics) {
                await fetchTaskCountsForItems(item.subtopics);
            }
            if (item.subsubtopics) {
                await fetchTaskCountsForItems(item.subsubtopics);
            }
        }
    };

    useEffect(() => {
        if (topics) {
            fetchTaskCountsForItems(topics);
        }
    }, [topics]);
    const [submitting, setSubmitting] = useState(false);

    const [selectedTasks, setSelectedTasks] = useState([]);

    const handleViewTasks = async (itemKey) => {
        // Remove the forward slash from the itemKey
        const filteredItemKey = itemKey.split('/').pop();

        setLoadingTasks(true); // Set loading state to true before fetching tasks

        // Fetch all tasks
        const allTasks = await pb.collection('tasks').getFullList();

        // Filter tasks with the specified itemKey
        const tasks = allTasks.filter((task) => {
            return (
                task.itemId.includes(filteredItemKey) &&
                (props.owner || task.approved || (task.creator && task.creator === props.creatorEmail))
            );
        });

        // Store the fetched tasks in the selectedTasks state
        setSelectedTasks(tasks);

        // Open the modal
        open3();

        setLoadingTasks(false); // Set loading state to false after the modal is opened
    };

    const [opened3, { open: open3, close: close3 }] = useDisclosure(false);

    const [loadingTasks, setLoadingTasks] = useState(false);

    const handleStatusChange = async (taskId, newStatus) => {
        const data = {
            status: newStatus
        };

        try {
            setSelectedTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleApproveClick = async (item) => {
        setApprovingItem(true);

        const data = {
            ...item,
            approved: true
        };

        try {
            // Get the last part of the item key after the last forward slash
            const recordId = item.key.split('/').pop();
            const updatedRecord = await pb.collection('items').update(recordId, data);

            // Refresh the topics
            await fetchTopics();
        } catch (error) {
            console.error('Failed to approve item', error);
        } finally {
            setApprovingItem(false);
        }
    };

    const [approvingItem, setApprovingItem] = useState(false);

    const [approvingTask, setApprovingTask] = useState(false);

    const handleTaskApproveClick = async (task) => {
        setApprovingTask(true);

        const data = {
            ...task,
            approved: true
        };

        try {
            const updatedRecord = await pb.collection('tasks').update(task.id, data);

            // Update the local state or refetch the data
            const updatedTasks = selectedTasks.map((t) => (t.id === task.id ? updatedRecord : t));
            setSelectedTasks(updatedTasks);
        } catch (error) {
            console.error('Failed to approve task', error);
        } finally {
            setApprovingTask(false);
        }
    };

    const [editingItem, setEditingItem] = useState(null);

    const handleEditClick = (item) => {
        setEditingItem(item);
        toggle(); // This should open the modal for editing the name
    };

    const handleUpdateLabel = async () => {
        if (editingItem) {
            const updatedData = {
                label: newName
            };

            const itemKey = editingItem.key.split('/').pop();

            const record = await pb.collection('items').update(itemKey, updatedData);

            if (record) {
                setTopics((prevTopics) => {
                    const updateItemRecursively = (items, parentKey = '') => {
                        return items.map((item) => {
                            const currentItemKey = parentKey ? `${parentKey}/${item.key}` : item.key;
                            if (currentItemKey === editingItem.key) {
                                return { ...item, label: newName };
                            } else if (item.subtopics) {
                                return { ...item, subtopics: updateItemRecursively(item.subtopics, currentItemKey) };
                            } else if (item.subsubtopics) {
                                return { ...item, subsubtopics: updateItemRecursively(item.subsubtopics, currentItemKey) };
                            } else {
                                return item;
                            }
                        });
                    };

                    return updateItemRecursively(prevTopics);
                });

                setEditingItem(null);
                setNewName('');
                toggle();
            } else {
                console.error('Failed to update the record in the database.');
            }
        }
    };

    const handleTaskDeleteClick = async (task, e) => {
        e.stopPropagation();

        // Remove the task from the selectedTasks state
        const newSelectedTasks = selectedTasks.filter((t) => t.id !== task.id);
        setSelectedTasks(newSelectedTasks);

        // Delete the task from the database
        await pb.collection('tasks').delete(task.id);
    };

    const [editingTask, setEditingTask] = useState(null);

    const handleTaskEditClick = (task, e) => {
        e.stopPropagation();
        setEditingTask(task);
    };

    const handleTaskTitleChange = async () => {
        try {
            setLoading(true);
            const updatedTask = await pb.collection('tasks').update(editingTask.id, { title: newName });
            const updatedTasks = selectedTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
            setSelectedTasks(updatedTasks);
            setLoading(false);
            setNewName('');
            setEditingTask(null);
            close();
        } catch (error) {
            setLoading(false);
            setErrorMessage('An error occurred while updating the task title. Please try again.');
        }
    };

    const [formMode, setFormMode] = useState('create');

    const handleTaskEditFormOpen = (task, e) => {
        e.stopPropagation();
        setFormMode('edit');
        setEditingTaskDetails(task); // Set the editingTaskDetails state with the task object
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setTaskAssignedTo(task.assignedTo);
        setTaskTags(task.tags); // Directly use the tags array
        setTaskCompetencies(task.competencies); // Directly use the competencies array
        setTaskBudget(task.budget);
        setTaskReferralBudget(task.referralBudget);
        setTaskEndDate(task.endDate);
        setTaskResult(task.result);
        open2();
    };

    const [editingTaskDetails, setEditingTaskDetails] = useState(null);

    return (
        <>
            <Modal size={800} opened={opened3} onClose={close3} centered>
                <Container className={classes.wrapper}>
                    <Title align="center" className={classes.title}>
                        Tasks
                    </Title>

                    <Accordion variant="separated">
                        {selectedTasks.map((task, id) => (
                            <>
                                <Accordion.Item className={classes.item} value={id.toString()}>
                                    <Accordion.Control>
                                        <Group position="apart">
                                            {props.owner && !task.approved && (
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    color="violet"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTaskApproveClick(task);
                                                    }}
                                                    loading={approvingTask}
                                                >
                                                    Approve
                                                </Button>
                                            )}
                                            <Group>
                                                {`${task.title}${!task.approved ? ' (suggestion)' : ''}`}
                                                <ActionIcon onClick={(e) => handleTaskEditClick(task, e)}>
                                                    <BiEdit size={20} />
                                                </ActionIcon>

                                                <Tooltip label="Delete Task">
                                                    <TiDelete onClick={(e) => handleTaskDeleteClick(task, e)} size={20} />
                                                </Tooltip>
                                            </Group>

                                            <Group>
                                                Status:
                                                <div style={{ maxHeight: '40px', overflow: 'hidden' }}>
                                                    <Select
                                                        // label="Status"
                                                        onClick={(e) => e.stopPropagation()}
                                                        value={task.status}
                                                        onChange={(value) => handleStatusChange(task.id, value)}
                                                        data={[
                                                            { label: 'New', value: 'New' },
                                                            { label: 'In Progress', value: 'In Progress' },
                                                            { label: 'Completed', value: 'Completed' }
                                                        ]}
                                                    />
                                                </div>
                                            </Group>
                                        </Group>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Stack spacing="md">
                                            <Text>
                                                <b>Description:</b> {task.description}
                                            </Text>
                                            <Text>
                                                <b>Assigned To:</b> {task.assignedTo}
                                            </Text>

                                            <Text>
                                                <b>Status:</b> {task.status}
                                            </Text>

                                            <Text>
                                                <b>Tags:</b> {task.tags.map((tag) => tag.label).join(', ')}
                                            </Text>

                                            <Text>
                                                <b>Competencies:</b> {task.competencies.map((comp) => comp.label).join(', ')}
                                            </Text>

                                            <Text>
                                                <b>Budget:</b> {task.budget}
                                            </Text>

                                            <Text>
                                                <b>Referral Budget:</b> {task.referralBudget}
                                            </Text>

                                            <Text>
                                                <b>End Date:</b> {task.endDate}
                                            </Text>

                                            <Text>
                                                <b>Result:</b> {task.result}
                                            </Text>
                                            <Center>
                                                <Button variant="light" color="violet" onClick={(e) => handleTaskEditFormOpen(task, e)}>
                                                    Edit Task Details
                                                </Button>
                                            </Center>
                                        </Stack>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </>
                        ))}
                    </Accordion>
                </Container>
            </Modal>
            <Modal size={800} opened={opened2} onClose={handleFormClose} centered>
                <Container my={40}>
                    <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                        {formMode === 'create' ? 'Add a Task' : `Edit Task Details for: ${taskTitle}`}
                    </Title>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Stack mt={25} mb={25} spacing="xl">
                            <TextInput onChange={(event) => setTaskTitle(event.target.value)} label="Title" />
                            <TextInput onChange={(event) => setTaskDescription(event.target.value)} label="Description" />
                            <MultiSelect
                                getCreateLabel={(query) => `+ Add ${query}`}
                                onCreate={(query) => {
                                    const item = { value: query, label: query };
                                    setTaskTags((current) => [...current, item]);
                                    return item;
                                }}
                                data={taskTags}
                                searchable
                                creatable
                                label="Tags"
                            />
                            <MultiSelect
                                getCreateLabel={(query) => `+ Add ${query}`}
                                onCreate={(query) => {
                                    const item = { value: query, label: query };
                                    setTaskCompetencies((current) => [...current, item]);
                                    return item;
                                }}
                                data={taskCompetencies}
                                searchable
                                creatable
                                label="Competencies"
                            />
                            <TextInput onChange={(event) => setTaskBudget(event.target.value)} label="Budget" />
                            <TextInput onChange={(event) => setTaskReferralBudget(event.target.value)} label="Referral Budget" />
                            <TextInput
                                onChange={(event) => setTaskAssignedTo(event.target.value)}
                                label="Assigned To"
                                placeholder="Enter email"
                            />
                            <TextInput onChange={(event) => setTaskResult(event.target.value)} label="Result" />
                            <Center>
                                <Stack align={'center'}>
                                    <Title order={4}>End Date</Title>
                                    <DatePicker value={taskEndDate} onChange={setTaskEndDate} />
                                </Stack>
                            </Center>
                            <Button loading={submitting} variant="light" color="grape" onClick={handleSubmitTask}>
                                Submit
                            </Button>
                        </Stack>
                    </Paper>
                </Container>
            </Modal>
            <div style={{ zIndex: 1500, position: 'relative' }}>
                <Dialog
                    zIndex={1500}
                    style={{ zIndex: 1000 }}
                    opened={opened || editingTask !== null}
                    withCloseButton
                    onClose={() => {
                        setNewName('');
                        setEditItem(null);
                        setEditingItem(null); // Update this line
                        setEditingTask(null);

                        close();
                    }}
                    size="lg"
                    radius="md"
                >
                    <Text size="sm" mb="xs" weight={500}>
                        {editingItem ? 'Edit Name' : getDialogTitle()}
                    </Text>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <Group align="flex-end">
                        <TextInput sx={{ flex: 1 }} value={newName} onChange={(e) => handleInputChange(e)} />
                        <Button
                            variant="light"
                            color="violet"
                            onClick={editingTask ? handleTaskTitleChange : editingItem ? handleUpdateLabel : handleConfirm}
                            loading={loading}
                        >
                            {editingTask ? 'Update Task Name' : editingItem ? 'Update Name' : 'Confirm'}
                        </Button>
                    </Group>
                </Dialog>
            </div>
            {props.department ? (
                loadingTopics ? (
                    <Center>
                        <Loader color="black" m={100} />
                    </Center>
                ) : (
                    <>
                        <Center>
                            <Title order={3} p={20}>
                                Department: {props.department}
                            </Title>
                        </Center>

                        <TreeMenu
                            data={topics?.map((topic) => ({
                                key: topic.key,
                                label: topic.label,
                                approved: topic.approved,
                                nodes: topic.subtopics.map((subtopic) => ({
                                    key: subtopic.key,
                                    label: subtopic.label,
                                    approved: subtopic.approved,

                                    nodes: subtopic.subsubtopics.map((subsubtopic) => ({
                                        key: subsubtopic.key,
                                        label: subsubtopic.label,
                                        approved: subsubtopic.approved,

                                        url: subsubtopic.url
                                    })),
                                    url: subtopic.url
                                })),
                                url: topic.url
                            }))}
                            debounceTime={125}
                            disableKeyboard={false}
                            hasSearch
                            resetOpenNodesOnDataUpdate={false}
                        >
                            {({ search, items }) => (
                                <>
                                    <TextInput p={20} type="text" onChange={(e) => search(e.target.value)} placeholder="Search" />

                                    <ul>
                                        {items.map((item) => (
                                            <>
                                                <Group grow>
                                                    <Group spacing="xs">
                                                        <ItemComponent
                                                            key={item.key}
                                                            hasNodes={item.hasNodes}
                                                            isOpen={item.isOpen}
                                                            level={item.level}
                                                            label={`${item.label}${!item.approved ? ' (suggestion)' : ''}`}
                                                            active={item.active}
                                                            focused={item.focused}
                                                            toggleNode={item.toggleNode}
                                                        />
                                                        {!props.collaborator && (
                                                            <>
                                                                {' '}
                                                                <Tooltip label="Edit Name">
                                                                    <ActionIcon onClick={() => handleEditClick(item)}>
                                                                        <BiEdit size={20} />
                                                                    </ActionIcon>
                                                                </Tooltip>
                                                                <Tooltip label="Delete">
                                                                    <ActionIcon onClick={() => handleDeleteClick(item)}>
                                                                        <TiDelete size={20} />
                                                                    </ActionIcon>
                                                                </Tooltip>
                                                            </>
                                                        )}
                                                    </Group>
                                                    <Group>
                                                        {owner && !item.approved && (
                                                            <Button
                                                                loading={approvingItem}
                                                                onClick={() => handleApproveClick(item)}
                                                                size="sm"
                                                                compact
                                                                variant="filled"
                                                                color="violet"
                                                            >
                                                                Approve Item
                                                            </Button>
                                                        )}
                                                        <Button
                                                            onClick={() => handleViewTasks(item.key)}
                                                            size="sm"
                                                            compact
                                                            variant="light"
                                                            color="violet"
                                                            loading={loadingTasks}
                                                        >
                                                            View Tasks ({taskCounts[item.key.split('/').pop()] || 0})
                                                        </Button>
                                                        {/* <Tooltip label="Add Task"> */}
                                                        <Button
                                                            onClick={() => {
                                                                handleAddTask(item);
                                                            }}
                                                            size="sm"
                                                            compact
                                                            variant="light"
                                                            color="violet"
                                                            rightIcon={<AiOutlinePlus />}
                                                        >
                                                            Add Task {props.collaborator && '(Suggestion)'}
                                                        </Button>
                                                        {/* </Tooltip> */}
                                                        {item.level !== 2 && (
                                                            <Button
                                                                size="sm"
                                                                compact
                                                                variant="light"
                                                                color="violet"
                                                                rightIcon={<AiOutlinePlus />}
                                                                onClick={() => {
                                                                    handleHelloClick(item);
                                                                }}
                                                            >
                                                                {item.level === 0 ? 'Add Subtopic' : 'Add Subsubtopic'}
                                                                {props.collaborator && ' (Suggestion)'}
                                                            </Button>
                                                        )}
                                                    </Group>
                                                </Group>

                                                <Divider my="sm" color="black" />
                                            </>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </TreeMenu>
                        <Center p={20}>
                            <Button variant="light" color="violet" rightIcon={<AiOutlinePlus />} onClick={handleAddTopic}>
                                Add Topic {props.collaborator && '(Suggestion)'}
                            </Button>
                        </Center>
                    </>
                )
            ) : (
                <Center>
                    <Title order={3} p={20}>
                        Select a department
                    </Title>
                </Center>
            )}
        </>
    );
}
