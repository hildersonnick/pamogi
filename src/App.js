import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  Grid,
  OrbitControls,
  Environment,
  Hud,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Center, Image } from "@mantine/core";
import * as THREE from "three";
import gsap from "gsap";
import Waterfall from "./models/Waterfall";
import Trees from "./models/Trees";
import River1 from "./models/River1";
import River2 from "./models/River2";
import River3 from "./models/River3";
import River4 from "./models/River4";
import River5 from "./models/River5";
import River6 from "./models/River6";
import { OrthographicCamera } from "@react-three/drei";
import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Button,
  Container,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from "@tabler/icons";
import { UserButton } from "./interface/UserButton";
import { LinksGroup } from "./interface/LinksGroup";
import { GrOverview } from "react-icons/gr";
import { GiWaterfall } from "react-icons/gi";
import { BsPlusSquareDotted } from "react-icons/bs";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? "rgba(0,0,0,0.2)"
        : "rgba(255,255,255,0.05)",

    paddingBottom: 0,
    position: "absolute",
    zIndex: "10",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function App() {
  const [mockdata, setMockdata] = useState([
    // { label: "Overview", icon: GrOverview },
    {
      label: "Topic 1",
      icon: GiWaterfall,
      initiallyOpened: false,
      links: [
        { label: "Subtopic 1", link: "/" },
        { label: "Subtopic 2", link: "/" },
      ],
    },
    {
      label: "Topic 2",
      icon: GiWaterfall,
      initiallyOpened: false,
      links: [
        { label: "Subtopic 1", link: "/" },
        { label: "Subtopic 2", link: "/" },
      ],
    },
  ]);
  const { classes } = useStyles();

  const handleClick = (index) => {
    setNavIndex(index);
  };

  const links = mockdata.map((item, index) => (
    // <Container onClick={() => console.log(index)}>
    <div onClick={() => handleClick(index)}>
      <LinksGroup index={index} {...item} key={item.label} />
    </div>
    // </Container>
  ));

  const handleAddTopic = () => {
    const newTopic = {
      label: "New Topic",
      icon: GiWaterfall,
      initiallyOpened: false,
      links: [
        { label: "Subtopic 1", link: "/" },
        { label: "Subtopic 2", link: "/" },
      ],
    };
    setMockdata([...mockdata, newTopic]);
    setNavIndex(mockdata.length);
  };
  const [navIndex, setNavIndex] = useState(0);

  return (
    <>
      <Navbar
        sx={{ backdropFilter: "blur(5px)" }}
        // height={800}
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Image src="/pamogi-logo.png" width={100} />
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
          <Center>
            <Button
              onClick={() => handleAddTopic()}
              variant="light"
              color="violet"
              rightIcon={<BsPlusSquareDotted color="violet" />}
            >
              Add Topic
            </Button>
          </Center>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton
            image="/mogi.jpg"
            name="Pamogi Smith"
            email="pamogi@pamogi.com"
          />
        </Navbar.Section>
      </Navbar>
      <Canvas
        gl={{ logarithmicDepthBuffer: true }}
        shadows
        camera={{
          position: [15, 15, 10],
          fov: 25,
        }}
      >
        <Scene navIndex={navIndex} mockdata={mockdata} />
      </Canvas>
    </>
  );
}

const Scene = (props) => {
  useEffect(() => {
    setTargetPosition([
      0 + props.navIndex * 5,
      -1.85,
      0 - props.navIndex * 2.5,
    ]);
    setIsMoving(true);
  }, [props.navIndex]);
  const [targetPosition, setTargetPosition] = useState([0, -1.85, 0]);
  const [waterfalls, setWaterfalls] = useState([]);
  const [isMoving, setIsMoving] = useState(true);
  const handleClick = (index) => {
    setTargetPosition([0 + index * 5, -1.85, 0 - index * 2.5]);
    setIsMoving(true);
  };
  useEffect(() => {
    const newWaterfalls = props.mockdata.map((item, index) => {
      return (
        <group onClick={() => handleClick(index)}>
          <Waterfall key={item.label} index={index} />
        </group>
      );
    });
    setWaterfalls(newWaterfalls);
  }, [props.mockdata]);

  const dummyRef = useRef();
  let vec = new THREE.Vector3();

  useFrame((state, delta) => {
    // console.log(targetPosition);
    if (isMoving) {
      gsap.to(dummyRef.current.position, {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
        duration: 2,
      });
      gsap.to(state.camera.position, {
        x: dummyRef.current.position.x + 10,
        y: dummyRef.current.position.y + 7.5,
        z: dummyRef.current.position.z + 5,
        duration: 2,
      });
      setIsMoving(false);
    }
    state.camera.lookAt(dummyRef.current.position);
  });

  return (
    <>
      {/* <Waterfall /> */}
      {waterfalls}
      <mesh ref={dummyRef}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          attach="material"
          color="black"
        />
      </mesh>

      <pointLight position={[0, 10, 0]} intensity={1} />

      <Grid
        renderOrder={-1}
        position={[0, -1.85, 0]}
        infiniteGrid={true}
        cellSize={0.5}
        cellThickness={0.6}
        sectionSize={2}
        sectionThickness={1.5}
        sectionColor={[0.5, 0.5, 10]}
        fadeDistance={50}
      />
      <OrbitControls
        enablePan={false}
        zoomSpeed={0.3}
        rotateSpeed={0.4}
        maxPolarAngle={Math.PI / 2}
      />
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={2} mipmapBlur />
      </EffectComposer>
      <Environment background preset="sunset" blur={0.8} />
    </>
  );
};
