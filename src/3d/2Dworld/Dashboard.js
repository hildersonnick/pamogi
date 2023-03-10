import { Navbar, Group, Code, ScrollArea, createStyles, Image, Stack } from '@mantine/core';

import { UserButton } from './UserButton';
import { LinksGroup } from './NavbarLinksGroup';
// import { Logo } from "";

const mockdata = [
    {
        label: 'Projects',
        // icon: IconNotes,
        initiallyOpened: true,
        links: [
            { label: 'Project 1', link: '/' },
            { label: 'Project 2', link: '/' },
            { label: 'Project 3', link: '/' }
        ]
    },
    { label: 'Tasks' },
    { label: 'Contributions' },
    { label: 'Investments' }
];

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor:
            //   theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
            //   theme.colors.grape,
            '#3A194C',
        paddingBottom: 0
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: ` 1 solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
    },

    links: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl
    },

    footer: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        borderTop: ` 1 solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
    }
}));

export default function Dashboard() {
    const { classes } = useStyles();
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        // <div style={{ width: "100vw", height: "100vh", background: "purple" }}>
        <Navbar height={'100vh'} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section mt={20} className={classes.header}>
                <Group position="apart">
                    <Image src={'/logo-transparent.png'} width={120} />
                    {/* <Code sx={{ fontWeight: 700 }}>v3.1.2</Code> */}
                </Group>
            </Navbar.Section>

            <Navbar.Section mt={50} grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>
                    <Stack spacing={'xl'}>{links}</Stack>
                </div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <UserButton
                    image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                    name="Ann Nullpointer"
                    email="anullpointer@yahoo.com"
                />
            </Navbar.Section>
        </Navbar>
        // </div>
    );
}
