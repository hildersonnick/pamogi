import { useState } from 'react';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { Center } from '@mantine/core';
import { AiFillProject } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { useParams, useLocation } from 'react-router-dom';

import { Container, Title, Accordion, createStyles, rem, ThemeIcon, Progress, Text, Group, Badge, Paper } from '@mantine/core';
import PocketBase from 'pocketbase';
import { useEffect } from 'react';
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import Departments from 'tal/Departments';
import { Select, Button as ButtonMantine } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dialog, TextInput } from '@mantine/core';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //
const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: `calc(${theme.spacing.xl} )`
        // paddingBottom: `calc(${theme.spacing.xl} )`
        // minHeight: 500
        // backgroundColor: '#f1e3ff'
    },

    title: {
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`
    },

    item: {
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        backgroundColor: '#f1e3ff'
    },
    card2: {
        position: 'relative',
        overflow: 'visible',
        padding: theme.spacing.xl,
        backgroundColor: '#f1e3ff'

        // paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`
    },

    icon2: {
        position: 'absolute',
        top: `calc(-${ICON_SIZE} / 3)`,
        left: `calc(50% - ${ICON_SIZE} / 2)`
    },

    title2: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1
    }
}));

const placeholder =
    'This is placeholder text that should be changed later. I am typing randomly to make it seem like text actually exists here. Please ignore, come back and change later.';

const DashboardDefault = () => {
    const { classes } = useStyles();
    const { projectId } = useParams();
    const location2 = useLocation();

    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const pb = new PocketBase('https://pamogi.pockethost.io');

    const [projectName, setProjectName] = useState('');
    const [budget, setBudget] = useState('');
    const [budgetper, setBudgetper] = useState('');
    const [category, setCategory] = useState();
    const [tags, setTags] = useState([]);
    const [location, setLocation] = useState('');
    const [visibility, setVisibility] = useState('');
    const [description, setDescription] = useState('');
    const [departmentRelations, setDepartmentRelations] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const projectId = location2.pathname.split('/').pop();
            const record = await pb.collection('projects').getFirstListItem(`id="${projectId}"`);

            if (record) {
                setProjectName(record.projectName);
                setBudget(record.budget);
                setBudgetper(record.budgetper);
                setCategory(record.category);
                setTags(record.tags);
                setLocation(record.location);
                setVisibility(record.visibility);
                setDescription(record.description);
                setDepartmentRelations(record.departmentRelations || []);
                const relatedDepartments = await pb.collection('departments').getFullList({ filter: `projectId="${projectId}"` });
                setDepartments(relatedDepartments);
            }
        };

        fetchData();
    }, [location2]);

    const [newDepartmentName, setNewDepartmentName] = useState('');
    const handleDepartmentNameChange = (event) => {
        setNewDepartmentName(event.target.value);
    };

    const handleAddDepartment = async () => {
        setLoading(true);

        const projectId = location2.pathname.split('/').pop();

        // Create a new department in the "departments" collection
        const newDepartment = {
            label: newDepartmentName,
            projectId
        };
        const createdDepartment = await pb.collection('departments').create(newDepartment);

        // Update the departmentRelations field in the "projects" collection
        const newDepartmentRelations = [...departmentRelations, createdDepartment.id];
        const data = { departmentRelations: newDepartmentRelations };
        const updatedRecord = await pb.collection('projects').update(projectId, data);

        setDepartmentRelations(updatedRecord.departmentRelations);
        setNewDepartmentName('');

        // Update the local departments state
        setDepartments((prevDepartments) => [...prevDepartments, createdDepartment]);
        setLoading(false);

        close();
    };

    const [opened, { toggle, close }] = useDisclosure(false);
    const [departmentProp, setDepartmentProp] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteDepartment = async () => {
        try {
            // Find the department record based on its label/name
            const departmentRecord = await pb.collection('departments').getFirstListItem(`label="${departmentProp}"`, {
                projectId: projectId
            });

            if (departmentRecord) {
                // Delete the department using its ID
                await pb.collection('departments').delete(departmentRecord.id);
                console.log('Department deleted:', departmentRecord.label);

                // Update the local departments state
                setDepartments(departments.filter((department) => department.id !== departmentRecord.id));

                // Reset the selected department
                if (departments.length > 0) {
                    setDepartmentProp(departments[0].label);
                } else {
                    setDepartmentProp(null);
                }
            } else {
                console.log('Department not found');
            }
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    return (
        <>
            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
                <Text size="sm" mb="xs" weight={500}>
                    Name of Department
                </Text>
                <Group align="flex-end">
                    <TextInput placeholder="" sx={{ flex: 1 }} value={newDepartmentName} onChange={handleDepartmentNameChange} />
                    <ButtonMantine loading={loading} variant="light" color="violet" onClick={handleAddDepartment}>
                        Confirm
                    </ButtonMantine>
                </Group>
            </Dialog>
            {location2.pathname.includes('project') ? (
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {/* row 1 */}
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <Typography variant="h5">Dashboard</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce title="Tasks" count="52" percentage={59.3} extra="35,000" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce title="Contributors" count="105" percentage={70.5} extra="8,900" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce title="Timeline" count={'placeholder'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce title="Budget" count={budget} extra="$20,395" />
                    </Grid>

                    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                    {/* row 2 */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Group>
                                    <Typography variant="h5">Departments</Typography>
                                    <Select
                                        value={departmentProp}
                                        placeholder="Select a department"
                                        data={departments.map((department) => ({ value: department.label, label: department.label }))}
                                        onChange={setDepartmentProp}
                                    />

                                    <ButtonMantine variant="light" color="violet" onClick={toggle} rightIcon={<AiOutlinePlus />}>
                                        Add Department
                                    </ButtonMantine>
                                    {departmentProp && (
                                        <ButtonMantine
                                            variant="outline"
                                            color="violet"
                                            onClick={() => deleteDepartment()}
                                            // rightIcon={<TiDelete size={20} />}
                                        >
                                            Delete Current Department
                                        </ButtonMantine>
                                    )}
                                </Group>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <Departments projectId={projectId} department={departmentProp} />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Project Description</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>

                        <MainCard sx={{ mt: 2 }} content={false}>
                            <Container size="sm" className={classes.wrapper}>
                                {/* <Title align="center" className={classes.title} sx={{ fontSize: 25 }}>
                            Project Name
                        </Title> */}
                                <Tabs color="grape" defaultValue="gallery">
                                    <Tabs.List grow>
                                        <Tabs.Tab
                                            value="gallery"
                                            //  icon={<IconPhoto size="0.8rem" />}
                                        >
                                            Info
                                        </Tabs.Tab>
                                        <Tabs.Tab
                                            value="messages"
                                            //  icon={<IconMessageCircle size="0.8rem" />}
                                        >
                                            Description
                                        </Tabs.Tab>
                                    </Tabs.List>

                                    <Tabs.Panel value="gallery" pt="xs">
                                        <Paper radius="md" withBorder className={classes.card2} mt={`calc(${ICON_SIZE} / 3)`} mb={20}>
                                            {/* <ThemeIcon className={classes.icon2} size={ICON_SIZE} radius={ICON_SIZE}>
                                <AiFillProject size="2rem" stroke={1.5} />
                            </ThemeIcon> */}

                                            <Text ta="center" fw={750} sx={{ fontSize: 20 }} className={classes.title2}>
                                                {projectName}
                                            </Text>
                                            {/* <Text c="dimmed" ta="center" fz="sm">
                                32 km / week
                            </Text> */}

                                            <Group position="apart" mt="xs">
                                                <Text fz="sm" color="dimmed">
                                                    Progress
                                                </Text>
                                                <Text fz="sm" color="dimmed">
                                                    0%
                                                </Text>
                                            </Group>

                                            <Progress value={0} mt={5} />

                                            <Group position="apart" mt="md">
                                                <Text fz="sm">0 / 0 Tasks Completed</Text>
                                                <Badge color="grape" size="sm">
                                                    4 days left
                                                </Badge>
                                            </Group>
                                        </Paper>

                                        <Accordion variant="separated">
                                            <Accordion.Item className={classes.item} value="reset-password">
                                                <Accordion.Control>Budget</Accordion.Control>
                                                <Accordion.Panel>{budget}</Accordion.Panel>
                                            </Accordion.Item>

                                            <Accordion.Item className={classes.item} value="another-account">
                                                <Accordion.Control>Budget Per Contribution</Accordion.Control>
                                                <Accordion.Panel>{budgetper}</Accordion.Panel>
                                            </Accordion.Item>

                                            <Accordion.Item className={classes.item} value="newsletter">
                                                <Accordion.Control>Category</Accordion.Control>
                                                <Accordion.Panel>{category}</Accordion.Panel>
                                            </Accordion.Item>

                                            {/* <Accordion.Item className={classes.item} value="credit-card">
                                <Accordion.Control>Who</Accordion.Control>
                                <Accordion.Panel>{who}</Accordion.Panel>
                            </Accordion.Item> */}

                                            <Accordion.Item className={classes.item} value="payment">
                                                <Accordion.Control>Location</Accordion.Control>
                                                <Accordion.Panel>{location}</Accordion.Panel>
                                            </Accordion.Item>
                                            <Accordion.Item className={classes.item} value="payment2">
                                                <Accordion.Control>Visibility</Accordion.Control>
                                                <Accordion.Panel>{visibility}</Accordion.Panel>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Tabs.Panel>

                                    <Tabs.Panel value="messages" pt="xs">
                                        {/* <Paper radius="md" withBorder className={classes.card2} mt={`calc(${ICON_SIZE} / 3)`} mb={20}> */}
                                        {/* <ThemeIcon className={classes.icon2} size={ICON_SIZE} radius={ICON_SIZE}>
                                <AiFillProject size="2rem" stroke={1.5} />
                            </ThemeIcon> */}
                                        {/* 
                                            <Text ta="center" fw={750} sx={{ fontSize: 20 }} className={classes.title2}>
                                                {projectName}
                                            </Text> */}
                                        {/* <Text c="dimmed" ta="center" fz="sm">
                                32 km / week
                            </Text> */}

                                        {/* <Group position="apart" mt="xs">
                                                <Text fz="sm" color="dimmed">
                                                    Progress
                                                </Text>
                                                <Text fz="sm" color="dimmed">
                                                    0%
                                                </Text>
                                            </Group> */}

                                        {/* <Progress value={0} mt={5} /> */}

                                        {/* <Group position="apart" mt="md">
                                                <Text fz="sm">0 / 0 Tasks Completed</Text>
                                                <Badge color="grape" size="sm">
                                                    4 days left
                                                </Badge>
                                            </Group>
                                        </Paper> */}

                                        <Accordion variant="separated">
                                            <Accordion.Item className={classes.item} value="what">
                                                <Accordion.Control>What</Accordion.Control>
                                                <Accordion.Panel></Accordion.Panel>
                                            </Accordion.Item>

                                            <Accordion.Item className={classes.item} value="why">
                                                <Accordion.Control>Why</Accordion.Control>
                                                <Accordion.Panel></Accordion.Panel>
                                            </Accordion.Item>

                                            <Accordion.Item className={classes.item} value="how">
                                                <Accordion.Control>How</Accordion.Control>
                                                <Accordion.Panel></Accordion.Panel>
                                            </Accordion.Item>

                                            <Accordion.Item className={classes.item} value="who">
                                                <Accordion.Control>Who</Accordion.Control>
                                                <Accordion.Panel></Accordion.Panel>
                                            </Accordion.Item>
                                            <Accordion.Item className={classes.item} value="measurable">
                                                <Accordion.Control>Measurable Goals</Accordion.Control>
                                                <Accordion.Panel></Accordion.Panel>
                                            </Accordion.Item>
                                            <Accordion.Item className={classes.item} value="tags">
                                                <Accordion.Control>Tags</Accordion.Control>
                                                <Accordion.Panel></Accordion.Panel>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Tabs.Panel>
                                </Tabs>
                            </Container>
                            {/* <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItemButton divider>
                            <ListItemText primary="Company Finance Growth" />
                            <Typography variant="h5">+45.14%</Typography>
                        </ListItemButton>
                        <ListItemButton divider>
                            <ListItemText primary="Company Expenses Ratio" />
                            <Typography variant="h5">0.58%</Typography>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Business Risk Cases" />
                            <Typography variant="h5">Low</Typography>
                        </ListItemButton>
                    </List>
                    <ReportAreaChart /> */}
                        </MainCard>
                    </Grid>

                    {/* row 3 */}

                    <Grid item xs={12} md={7} lg={8}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Investments/Contributions</Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" alignItems="center" spacing={0}>
                                    <Button
                                        size="small"
                                        onClick={() => setSlot('month')}
                                        color={slot === 'month' ? 'primary' : 'secondary'}
                                        variant={slot === 'month' ? 'outlined' : 'text'}
                                    >
                                        Past Year
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => setSlot('week')}
                                        color={slot === 'week' ? 'primary' : 'secondary'}
                                        variant={slot === 'week' ? 'outlined' : 'text'}
                                    >
                                        Past Week
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <MainCard content={false} sx={{ mt: 1.5 }}>
                            <Box sx={{ pt: 1, pr: 2 }}>
                                <IncomeAreaChart slot={slot} />
                            </Box>
                        </MainCard>
                    </Grid>

                    <Grid item xs={12} md={5} lg={4}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h5">Activity</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <List
                                component="nav"
                                sx={{
                                    px: 0,
                                    py: 0,
                                    '& .MuiListItemButton-root': {
                                        py: 1.5,
                                        '& .MuiAvatar-root': avatarSX,
                                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                    }
                                }}
                            >
                                <ListItemButton divider>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: 'success.main',
                                                bgcolor: 'success.lighter'
                                            }}
                                        >
                                            {/* <GiftOutlined /> */}
                                            {/* <Avatar alt="Remy Sharp" src={avatar1} /> */}
                                            <Avatar alt="Travis Howard" src={avatar2} />
                                            {/* <Avatar alt="Cindy Baker" src={avatar3} />
                                    <Avatar alt="Agnes Walker" src={avatar4} /> */}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="subtitle1">Travis Howard</Typography>}
                                        secondary="Today, 2:00 AM"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography variant="subtitle1" noWrap>
                                                Completed Task
                                            </Typography>
                                            <Typography variant="h6" color="secondary" noWrap>
                                                + $1,430
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                                <ListItemButton divider>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: 'primary.main',
                                                bgcolor: 'primary.lighter'
                                            }}
                                        >
                                            <Avatar alt="Agnes Walker" src={avatar4} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="subtitle1">Agnes Walker</Typography>}
                                        secondary="August 5th, 1:45 PM"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography variant="subtitle1" noWrap>
                                                Completed Task
                                            </Typography>
                                            <Typography variant="h6" color="secondary" noWrap>
                                                + $302
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                                <ListItemButton divider>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: 'error.main',
                                                bgcolor: 'error.lighter'
                                            }}
                                        >
                                            <Avatar alt="Cindy Baker" src={avatar3} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="subtitle1">Cindy Baker</Typography>}
                                        secondary="7 hours ago"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography variant="subtitle1" noWrap>
                                                Completed Task
                                            </Typography>
                                            <Typography variant="h6" color="secondary" noWrap>
                                                + $682
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                                <ListItemButton divider>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: 'success.main',
                                                bgcolor: 'success.lighter'
                                            }}
                                        >
                                            <Avatar alt="Travis Howard" src={avatar2} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="subtitle1">Travis Howard</Typography>}
                                        secondary="Today, 2:00 AM"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography variant="subtitle1" noWrap>
                                                Completed Task
                                            </Typography>
                                            <Typography variant="h6" color="secondary" noWrap>
                                                + $1,430
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                                <ListItemButton divider>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: 'primary.main',
                                                bgcolor: 'primary.lighter'
                                            }}
                                        >
                                            <Avatar alt="Agnes Walker" src={avatar4} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="subtitle1">Agnes Walker</Typography>}
                                        secondary="August 5th, 1:45 PM"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography variant="subtitle1" noWrap>
                                                Completed Task
                                            </Typography>
                                            <Typography variant="h6" color="secondary" noWrap>
                                                + $302
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: 'error.main',
                                                bgcolor: 'error.lighter'
                                            }}
                                        >
                                            <Avatar alt="Travis Howard" src={avatar2} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="subtitle1">Travis Howard</Typography>}
                                        secondary="7 hours ago"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography variant="subtitle1" noWrap>
                                                Completed Task
                                            </Typography>
                                            <Typography variant="h6" color="secondary" noWrap>
                                                + $682
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            </List>
                        </MainCard>
                    </Grid>

                    {/* row 4 */}
                    {/* <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Sales Report</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-select-currency"
                            size="small"
                            select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                    <Stack spacing={1.5} sx={{ mb: -12 }}>
                        <Typography variant="h6" color="secondary">
                            Net Profit
                        </Typography>
                        <Typography variant="h4">$1560</Typography>
                    </Stack>
                    <SalesColumnChart />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Income Overview</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                This Week Statistics
                            </Typography>
                            <Typography variant="h3">$7,650</Typography>
                        </Stack>
                    </Box>
                    <MonthlyBarChart />
                </MainCard>
                <MainCard sx={{ mt: 2 }}>
                    <Stack spacing={3}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Stack>
                                    <Typography variant="h5" noWrap>
                                        Help & Support Chat
                                    </Typography>
                                    <Typography variant="caption" color="secondary" noWrap>
                                        Typical replay within 5 min
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                    <Avatar alt="Remy Sharp" src={avatar1} />
                                    <Avatar alt="Travis Howard" src={avatar2} />
                                    <Avatar alt="Cindy Baker" src={avatar3} />
                                    <Avatar alt="Agnes Walker" src={avatar4} />
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                        <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                            Need Help?
                        </Button>
                    </Stack>
                </MainCard>
            </Grid> */}
                </Grid>
            ) : (
                <>
                    <Center>
                        <Title>Select Project Above</Title>
                    </Center>
                </>
            )}
        </>
    );
};

export default DashboardDefault;
