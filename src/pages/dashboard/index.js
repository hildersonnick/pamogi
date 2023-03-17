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
import { useParams } from 'react-router-dom';

import { Container, Title, Accordion, createStyles, rem, ThemeIcon, Progress, Text, Group, Badge, Paper } from '@mantine/core';

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

    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Tasks" count="52" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Contributions" count="105" percentage={70.5} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Investments" count="$18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Budget" count="$35,078" extra="$20,395" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Topics</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable />
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
                        <Paper radius="md" withBorder className={classes.card2} mt={`calc(${ICON_SIZE} / 3)`} mb={20}>
                            {/* <ThemeIcon className={classes.icon2} size={ICON_SIZE} radius={ICON_SIZE}>
                                <AiFillProject size="2rem" stroke={1.5} />
                            </ThemeIcon> */}

                            <Text ta="center" fw={750} sx={{ fontSize: 20 }} className={classes.title2}>
                                Project Name
                            </Text>
                            {/* <Text c="dimmed" ta="center" fz="sm">
                                32 km / week
                            </Text> */}

                            <Group position="apart" mt="xs">
                                <Text fz="sm" color="dimmed">
                                    Progress
                                </Text>
                                <Text fz="sm" color="dimmed">
                                    50%
                                </Text>
                            </Group>

                            <Progress value={50} mt={5} />

                            <Group position="apart" mt="md">
                                <Text fz="sm">26 / 52 Tasks Completed</Text>
                                <Badge color="grape" size="sm">
                                    4 days left
                                </Badge>
                            </Group>
                        </Paper>

                        <Accordion variant="separated">
                            <Accordion.Item className={classes.item} value="reset-password">
                                <Accordion.Control>What</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="another-account">
                                <Accordion.Control>Why</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="newsletter">
                                <Accordion.Control>How</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="credit-card">
                                <Accordion.Control>Who</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="payment">
                                <Accordion.Control>Measurable Goals</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
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
                            <ListItemText primary={<Typography variant="subtitle1">Travis Howard</Typography>} secondary="Today, 2:00 AM" />
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
                            <ListItemText primary={<Typography variant="subtitle1">Cindy Baker</Typography>} secondary="7 hours ago" />
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
                            <ListItemText primary={<Typography variant="subtitle1">Travis Howard</Typography>} secondary="Today, 2:00 AM" />
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
                            <ListItemText primary={<Typography variant="subtitle1">Travis Howard</Typography>} secondary="7 hours ago" />
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
    );
};

export default DashboardDefault;
