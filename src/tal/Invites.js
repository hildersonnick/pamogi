import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Table } from '@mantine/core';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pamogi.pockethost.io');

export default function Invites() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const userEmail = pb.authStore.model.email;
            const records = await pb.collection('projects').getFullList();
            const filteredProjects = records.filter((project) => project.collaborators && project.collaborators.includes(userEmail));
            setProjects(filteredProjects);
        };
        fetchProjects();
    }, []);

    const rows = projects.map((project) => (
        <tr key={project.id} onClick={() => navigate(`/project/${project.id}`)} style={{ cursor: 'pointer' }}>
            <td>{project.projectName}</td>
            <td>{project.email}</td>
            <td>{project.budget}</td>
            <td>{project.collaborators.length}</td>
        </tr>
    ));

    return (
        <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Project Owner</th>
                    <th>Budget</th>
                    <th>Number of Collaborators</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
