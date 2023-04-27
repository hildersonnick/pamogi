// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { Select, Text, Group, Button, TextInput, Dialog } from '@mantine/core';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdPersonAdd } from 'react-icons/io';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
    const [opened, { toggle, close }] = useDisclosure(false);

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [ownerEmail, setOwnerEmail] = useState('');
    const pb = new PocketBase('https://pamogi.pockethost.io');
    const location = useLocation();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const records = await pb.collection('projects').getFullList({
                filter: `email = "${pb.authStore.model.email}"`
            });
            setProjects(records.map((record) => ({ value: record.id, label: record.projectName })));

            const selectedProjectId = getSelectedProjectId();
            if (selectedProjectId) {
                const projectDetails = await pb.collection('projects').getOne(selectedProjectId);
                setOwnerEmail(projectDetails.email);
                setIsOwner(projectDetails.email === pb.authStore.model.email);
            }
        };
        fetchData();
    }, [location]);

    const getSelectedProjectId = () => {
        const match = location.pathname.match(/\/project\/(\w+)/);
        return match ? match[1] : null;
    };

    const [loading, setLoading] = useState(false);
    const [collaborator, setCollaborator] = useState('');
    const handleConfirm = async () => {
        setLoading(true);

        // Get the selected project ID
        const selectedProjectId = getSelectedProjectId();

        // Fetch the current project data
        const projectData = await pb.collection('projects').getOne(selectedProjectId);

        // Check if the project data is valid
        if (!projectData) {
            console.error('Failed to fetch project data.');
            setLoading(false);
            return;
        }

        // Check if the collaborators field exists and create it if it doesn't
        if (!projectData.collaborators) {
            projectData.collaborators = [];
        }

        // Check if the collaborator is already added
        if (projectData.collaborators.includes(collaborator)) {
            // Show an error message or alert
            console.log('This email is already a collaborator.');
            setLoading(false);
            return;
        }

        // Add the new collaborator email to the collaborators array
        const updatedCollaborators = [...projectData.collaborators, collaborator];

        // Update the project record with the new collaborators array
        await pb.collection('projects').update(selectedProjectId, {
            collaborators: updatedCollaborators
        });

        setLoading(false);
        close();
    };
    const handleInputChange = (e) => {
        setCollaborator(e.target.value);
    };

    return (
        <>
            <Dialog
                opened={opened}
                withCloseButton
                onClose={() => {
                    close();
                }}
                size="lg"
                radius="md"
            >
                <Text size="sm" mb="xs" weight={500}>
                    Invite Collaborator to Project
                </Text>

                <Group align="flex-end">
                    <TextInput placeholder={'Enter Email'} sx={{ flex: 1 }} value={collaborator} onChange={(e) => handleInputChange(e)} />
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
            <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
                <Group ml={20} justifyContent="center">
                    <Text color={'#2F1138'} style={{ fontWeight: 700 }} mr={1}>
                        Project:
                    </Text>
                    <Select
                        style={{ width: '20%' }}
                        mr={10}
                        value={getSelectedProjectId()}
                        placeholder="Select a project"
                        onChange={(value) => {
                            const selectedProject = projects.find((project) => project.value === value);
                            navigate(`/project/${selectedProject.value}`);
                        }}
                        data={projects}
                    />
                    <Button variant="light" color="violet" rightIcon={<AiOutlinePlus />} onClick={() => navigate('/create')}>
                        Create New Project
                    </Button>
                    {isOwner && (
                        <Button onClick={toggle} variant="light" color="violet" rightIcon={<IoMdPersonAdd />}>
                            Invite Collaborator
                        </Button>
                    )}

                    <Text>Project Owner: {ownerEmail}</Text>
                </Group>
            </Box>
        </>
    );
};

export default Search;
