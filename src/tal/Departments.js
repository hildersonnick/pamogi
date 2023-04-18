import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

import TreeMenu, { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
// import '../../node_modules/react-simple-tree-menu/dist/main.css';
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
                    (item) => item.parentDepartmentId.includes(departmentId) && item.projectId === projectId
                );

                const topics = filteredItems
                    .filter((item) => item.type === 'topic')
                    .map((topic) => ({
                        key: topic.id,
                        label: topic.label,
                        url: '',
                        subtopics: [],
                        synced: topic.synced // Add this line
                    }));

                const subtopics = filteredItems.filter((item) => item.type === 'subtopic');
                const subsubtopics = filteredItems.filter((item) => item.type === 'subsubtopic');

                for (const subtopic of subtopics) {
                    const parentTopic = topics.find((topic) => topic.key === subtopic.parentItemId[0]);
                    if (parentTopic) {
                        parentTopic.subtopics.push({
                            key: subtopic.id,
                            label: subtopic.label,
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
                                url: ''
                            });
                            break;
                        }
                    }
                }

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

    const handleDeleteClick = async (item) => {
        const [topicKey, subtopicKey, subsubtopicKey] = item.key.split('/');

        if (subsubtopicKey) {
            // We're on the subsubtopic level, delete the subsubtopic from its parent subtopic
            const newTopics = topics.map((topic) => ({
                ...topic,
                subtopics: topic.subtopics.map((subtopic) => ({
                    ...subtopic,
                    subsubtopics: subtopic.subsubtopics.filter((subsubtopic) => subsubtopic.key !== item.key)
                }))
            }));
            setTopics(newTopics);
        } else if (subtopicKey) {
            // We're on the subtopic level, delete only the subtopic and its children (subsubtopics)
            const newTopics = topics.map((topic) => ({
                ...topic,
                subtopics: topic.subtopics.filter((subtopic) => subtopic.key !== item.key)
            }));
            setTopics(newTopics);
        } else {
            // We're on the topic level, delete the entire topic and all its children (subtopics and subsubtopics)
            const newTopics = topics.filter((topic) => topic.key !== item.key);
            setTopics(newTopics);
        }
        if (topicKey) {
            if (subsubtopicKey) {
                // We're on the subsubtopic level
                await deleteItemAndChildren(item.key, 2);
            } else if (subtopicKey) {
                // We're on the subtopic level
                await deleteItemAndChildren(item.key, 1);
            } else {
                // We're on the topic level
                await deleteItemAndChildren(item.key, 0);
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
                parentId = topics.find((t) => t.key === editItem.key.split('/')[0]).key; // Use key instead of id
            } else if (editItem.level === 2) {
                itemType = 'subsubtopic';
                parentId = topics
                    .find((t) => t.key === editItem.key.split('/')[0])
                    .subtopics.find((st) => st.key === editItem.key.split('/')[1]).key; // Use key instead of id
            }
        }

        const newItem = {
            key: `${itemType}-${newTopics.filter((t) => !t.synced).length + 1}`,
            label: newName,
            url: '',
            synced: false
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
            projectId: props.projectId, // Add this line
            parentDepartmentId: departmentId ? [departmentId] : [], // Use the departmentId from the state
            parentItemId: parentId ? [parentId] : []
        };

        const response = await handleApiCall(newItem.key, apiCallData);

        if (response) {
            // Set the new item's ID and synced status
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
            result: taskResult
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
    };

    const [taskCounts, setTaskCounts] = useState({});

    const fetchTaskCount = async (itemId) => {
        const tasks = await pb.collection('tasks').getFullList();

        // Filter tasks using Array.prototype.some() method
        const tasksForItem = tasks.filter((task) => task.itemId.some((id) => id === itemId));

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
        console.log('Original itemKey:', itemKey);

        // Remove the forward slash from the itemKey
        const filteredItemKey = itemKey.split('/').pop();
        console.log('Filtered itemKey:', filteredItemKey);

        setLoadingTasks(true); // Set loading state to true before fetching tasks

        // Fetch all tasks
        const allTasks = await pb.collection('tasks').getFullList();

        // Filter tasks with the specified itemKey
        const tasks = allTasks.filter((task) => task.itemId.includes(filteredItemKey));

        console.log('Tasks:', tasks);

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
            const updatedTask = await pb.collection('tasks').update(taskId, data);
            console.log('Task updated:', updatedTask);

            setSelectedTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
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
                                            {task.title}
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
                                        </Stack>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </>
                        ))}
                    </Accordion>
                </Container>
            </Modal>
            <Modal size={800} opened={opened2} onClose={close2} centered>
                <Container my={40}>
                    <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                        Add a Task
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
            <Dialog
                opened={opened}
                withCloseButton
                onClose={() => {
                    setNewName('');
                    setEditItem(null);
                    close();
                }}
                size="lg"
                radius="md"
            >
                <Text size="sm" mb="xs" weight={500}>
                    {getDialogTitle()}
                </Text>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <Group align="flex-end">
                    <TextInput sx={{ flex: 1 }} value={newName} onChange={(e) => handleInputChange(e)} />
                    <Button
                        variant="light"
                        color="violet"
                        onClick={() => {
                            handleConfirm();
                        }}
                        loading={loading}
                    >
                        Confirm
                    </Button>
                </Group>
            </Dialog>
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
                                nodes: topic.subtopics.map((subtopic) => ({
                                    key: subtopic.key,
                                    label: subtopic.label,
                                    nodes: subtopic.subsubtopics.map((subsubtopic) => ({
                                        key: subsubtopic.key,
                                        label: subsubtopic.label,
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
                                                            label={item.label}
                                                            active={item.active}
                                                            focused={item.focused}
                                                            toggleNode={item.toggleNode}
                                                        />

                                                        <Tooltip label="Edit Name">
                                                            <ActionIcon
                                                                onClick={() => {
                                                                    // toggle();
                                                                }}
                                                            >
                                                                <BiEdit size={20} />
                                                            </ActionIcon>
                                                        </Tooltip>
                                                        {item.level === 0 && (
                                                            <Tooltip label="Delete">
                                                                <ActionIcon onClick={() => handleDeleteClick(item)}>
                                                                    <TiDelete size={20} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        )}
                                                    </Group>
                                                    <Group>
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
                                                            Add Task
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
                                Add Topic
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
