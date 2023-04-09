import React, { useState, useEffect } from 'react';
import { Select } from '@mantine/core';
import PocketBase from 'pocketbase';

import TreeMenu, { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
// import '../../node_modules/react-simple-tree-menu/dist/main.css';
import './treeStyles.css';
import { Group, Button, Center, TextInput, Input, Divider, ActionIcon, Tooltip, Dialog, Text, Title } from '@mantine/core';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { TiDeleteOutline } from 'react-icons/ti';
import { TiDelete } from 'react-icons/ti';
import { useDisclosure } from '@mantine/hooks';

export default function Departments(props) {
    const pb = new PocketBase('https://pamogi.pockethost.io');
    const [topics, setTopics] = useState([]);
    const [departmentId, setDepartmentId] = useState(null);

    const fetchTopics = async () => {
        try {
            const departmentLabel = props.department;
            console.log('Department label:', departmentLabel);

            const fetchedDepartment = await pb.collection('departments').getFirstListItem(`label="${departmentLabel}"`);
            console.log('Department:', fetchedDepartment);

            if (fetchedDepartment) {
                const departmentId = fetchedDepartment.id;
                console.log('Department ID:', departmentId);

                const fetchedItems = await pb.collection('items').getFullList();
                console.log(
                    'Fetched items:',
                    fetchedItems.map((item) => ({ ...item, parentDepartmentId: item.parentDepartmentId }))
                );

                const filteredItems = fetchedItems.filter((item) => item.parentDepartmentId.includes(departmentId));
                console.log('Filtered items:', filteredItems);

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

                console.log('Topics:', topics);
                setTopics(topics); // Add this line to update the state with the fetched topics

                return topics;
            }
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    useEffect(() => {
        if (props.department) {
            fetchTopics().then((fetchedTopics) => setTopics(fetchedTopics));
        }
    }, [props.department]);

    const handleApiCall = async (id, data) => {
        console.log(data);
        // Ensure parentDepartmentId is an array of strings
        if (data.parentDepartmentId && Array.isArray(data.parentDepartmentId)) {
            data.parentDepartmentId = data.parentDepartmentId.flat();
        }

        // Ensure parentItemId is an array of strings
        if (data.parentItemId && Array.isArray(data.parentItemId)) {
            data.parentItemId = data.parentItemId.flat();
        }

        console.log('Sending data to API:', data);

        try {
            const response = await pb.collection('items').create({ ...data, synced: true });
            console.log(`Created item with ID: ${response.id} for element with ID: ${id}`);
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
        if (props.department && props.projectId) {
            fetchDepartmentId(props.department, props.projectId);
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
                parentId = topics.find((t) => t.key === editItem.key.split('/')[0]).id;
            } else if (editItem.level === 2) {
                itemType = 'subsubtopic';
                parentId = topics
                    .find((t) => t.key === editItem.key.split('/')[0])
                    .subtopics.find((st) => st.key === editItem.key.split('/')[1]).id;
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

    return (
        <>
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
                <>
                    <Center>
                        <Title order={3} p={20}>
                            Department: {props.department}
                        </Title>
                    </Center>

                    <TreeMenu
                        data={topics.map((topic) => ({
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
                                                    <Tooltip label="Add Task">
                                                        <Button
                                                            size="sm"
                                                            compact
                                                            variant="light"
                                                            color="violet"
                                                            rightIcon={<AiOutlinePlus />}
                                                        >
                                                            Add Task
                                                        </Button>
                                                    </Tooltip>
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
