// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { Select, Text, Group, Button } from '@mantine/core';
import { AiOutlinePlus } from 'react-icons/ai';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const pb = new PocketBase('https://pamogi.pockethost.io');
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const records = await pb.collection('projects').getFullList({
                filter: `email = "${pb.authStore.model.email}"`
            });
            setProjects(records.map((record) => ({ value: record.id, label: record.projectName })));
        };

        fetchData();
    }, [location]);

    const getSelectedProjectId = () => {
        const match = location.pathname.match(/\/project\/(\w+)/);
        return match ? match[1] : null;
    };

    return (
        <>
            <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
                {/* <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                <OutlinedInput
                    style={{ boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.5)' }}
                    size="small"
                    id="header-search"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchOutlined />
                        </InputAdornment>
                    }
                    aria-describedby="header-search-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                    placeholder="Search"
                />
            </FormControl> */}
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
                </Group>
            </Box>
        </>
    );
};

export default Search;
