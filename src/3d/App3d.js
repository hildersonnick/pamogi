import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { Center, Image } from '@mantine/core';

import { Navbar, Group, Code, ScrollArea, createStyles, Button, Container } from '@mantine/core';

import { UserButton } from './interface/UserButton';
import { LinksGroup } from './interface/LinksGroup';
import { GiWaterfall } from 'react-icons/gi';
import { BsPlusSquareDotted } from 'react-icons/bs';

import { Dialog, TextInput, Text } from '@mantine/core';
import Scene from './3Dworld/Scene';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import useStore from './store';
import Dashboard from './2Dworld/Dashboard';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.05)',

        paddingBottom: 0,
        position: 'absolute',
        zIndex: '10'
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
    }
}));

export default function App3d() {
    // const [mockdata, setMockdata] = useState([
    //   // { label: "Overview", icon: GrOverview },
    //   // {
    //   //   label: "Challenge 1",
    //   //   icon: GiWaterfall,
    //   //   initiallyOpened: false,
    //   //   links: [
    //   //     { label: "Subtopic 1", link: "/" },
    //   //     { label: "Subtopic 2", link: "/" },
    //   //   ],
    //   // },
    // ]);
    const mockdata = useStore((state) => state.mockData);
    const setMockData = useStore((state) => state.setMockData);
    const { classes } = useStyles();

    const [links, setLinks] = useState([]);
    useEffect(() => {
        setLinks(
            mockdata.map((item, index) => (
                <>
                    <div>
                        <LinksGroup index={index} {...item} key={item.label} />
                    </div>
                </>
            ))
        );
    }, [mockdata]);

    const [opened, setOpened] = useState(false);
    const [challengeName, setChallengeName] = useState('');

    const handleAddChallenge = () => {
        setOpened(false);

        if (!challengeName) return;

        const newChallenge = {
            index: mockdata.length,
            label: challengeName,
            icon: GiWaterfall,
            initiallyOpened: false,
            links: [],
            tasks: [],
            subtasks: [],
            status: 'Initialized'
        };
        setMockData([...mockdata, newChallenge]);
        setChallengeName('');
    };
    const [navIndex, setNavIndex] = useState(0);

    return (
        <>
            {/* <BrowserRouter> */}
            {/* <Routes> */}
            {/* <Route path="/home" exact element={<Home />} />
          <Route path="/whyus" exact element={<WhyUs />} />
          <Route path="/about" exact element={<AboutUs />} />
          <Route path="/contact" exact element={<ContactUs />} />
          <Route path="/FAq" exact element={<FAq />} />
          <Route path="/how-it-work" exact element={<HowItWork />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/shipper" element={<Shipper />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/email" element={<Email />} /> */}
            {/* <Route path="/" element={<Dashboard />} /> */}
            {/* <Route
                path="3d"
                element={ */}
            <>
                {' '}
                <Dialog opened={opened} withCloseButton onClose={() => setOpened(false)} size="lg" radius="md">
                    <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                        Add Challenge
                    </Text>
                    <Group align="flex-end">
                        <TextInput
                            placeholder="New Challenge"
                            style={{ flex: 1 }}
                            onChange={(e) => setChallengeName(e.target.value)}
                            value={challengeName}
                        />
                        <Button variant="light" color="violet" onClick={handleAddChallenge}>
                            Submit
                        </Button>
                    </Group>
                </Dialog>
                <Navbar
                    sx={{ backdropFilter: 'blur(5px)' }}
                    // height={800}
                    width={{ sm: 300 }}
                    p="md"
                    className={classes.navbar}
                >
                    <Navbar.Section className={classes.header}>
                        <Group position="apart">
                            <Image src={process.env.PUBLIC_URL + '/pamogi-logo.png'} width={100} />
                        </Group>
                    </Navbar.Section>

                    <Navbar.Section grow className={classes.links} component={ScrollArea}>
                        <div className={classes.linksInner}>{links}</div>
                        <Center>
                            <Button
                                onClick={() => setOpened(true)}
                                variant="light"
                                color="violet"
                                rightIcon={<BsPlusSquareDotted color="violet" />}
                                disabled={mockdata.length >= 5}
                            >
                                Add Challenge
                            </Button>
                        </Center>
                    </Navbar.Section>

                    <Navbar.Section className={classes.footer}>
                        <UserButton image="/mogi.jpg" name="Pamogi Bot" email="pamogi@pamogi.com" />
                    </Navbar.Section>
                </Navbar>
                <Canvas
                    gl={{ logarithmicDepthBuffer: true }}
                    shadows
                    camera={{
                        position: [15, 15, 10],
                        fov: 25
                    }}
                >
                    <Scene navIndex={navIndex} mockdata={mockdata} />
                </Canvas>
            </>
            {/* </Routes> */}
            {/* </BrowserRouter> */}
        </>
    );
}
