import { useEffect, useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  Button,
  Stack,
  Center,
} from "@mantine/core";
import {
  TablerIcon,
  IconCalendarStats,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons";
import "../styles.css";
import { BsPlusSquareDotted } from "react-icons/bs";
import useStore from "../store";
import { GiWaterfall } from "react-icons/gi";

const useStyles = createStyles((theme) => ({
  control: {
    // border: "2px dotted",
    // borderColor: "red",

    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? "#2F1138" : "#2F1138",
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? "rgba(47, 17, 56,0.1)"
          : "rgba(47, 17, 56,0.1)",
      color:
        theme.colorScheme === "dark" ? "rgba(47, 17, 56,0.5)" : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? "white" : "white",
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : "rgba(47, 17, 56,0.1)",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  index,
  tasks,
  subtasks,
}) {
  const mockData = useStore((state) => state.mockData);
  const setMockData = useStore((state) => state.setMockData);
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link, index) => (
    <>
      <Group>
        <Text
          component="a"
          className={classes.link}
          href={link.link}
          key={link.label}
          onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </Text>
        <Button
          disabled={maxSubTasks}
          onClick={(e) => handleSubsubTask(e, index)}
          size="xs"
          variant="outline"
          color="teal"
          compact
        >
          Add Task
        </Button>
      </Group>
    </>
  ));

  const handleSubsubTask = (event, index) => {
    // event.stopPropagation();
    // console.log(index);
    // const updatedTopics = [...mockData];
    // if (!updatedTopics[index].subtasks) {
    //   updatedTopics[index].subtasks = [];
    // }
    // console.log(updatedTopics[index]);
    // updatedTopics[index].subtasks.push({ subtasks: index });
    // // updatedTopics[index] = {
    // //   ...updatedTopics[index],
    // //   subtasks: [...updatedTopics[index].subtasks, { subtasks: index }],
    // // };
    // setMockData(updatedTopics);
  };

  const handleSubtopic = (index) => {
    const updatedTopics = [...mockData];
    updatedTopics[index] = {
      ...updatedTopics[index],
      links: [
        ...updatedTopics[index].links,
        { label: "Subtopic " + (links.length + 1), link: "/" },
      ],
    };
    setMockData(updatedTopics);
  };

  const handleSubTask = (event, index) => {
    event.stopPropagation();

    const updatedTopics = [...mockData];
    updatedTopics[index] = {
      ...updatedTopics[index],
      tasks: [...updatedTopics[index].tasks, { tasks: index }],
    };
    setMockData(updatedTopics);
  };

  const [maxLinks, setMaxLinks] = useState(false);
  const [maxTasks, setMaxTasks] = useState(false);
  const [maxSubTasks, setMaxSubTasks] = useState(false);

  useEffect(() => {
    if (subtasks.length >= 5) {
      setMaxSubTasks(true);
    }
  }, [subtasks]);

  useEffect(() => {
    if (tasks.length >= 4) {
      setMaxTasks(true);
    }
  }, [tasks]);

  useEffect(() => {
    if (links.length >= 5) {
      setMaxLinks(true);
    }
  }, [links]);

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon color="violet" variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          <Button
            disabled={maxTasks}
            onClick={(e) => handleSubTask(e, index)}
            size="xs"
            variant="outline"
            color="teal"
            compact
          >
            Add Task +
          </Button>

          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened}>
          {/* <Stack> */}
          {items}
          <Center>
            <Button
              size="xs"
              disabled={maxLinks}
              mt={20}
              mb={20}
              onClick={() => handleSubtopic(index)}
              variant="light"
              color="violet"
              rightIcon={<BsPlusSquareDotted color="violet" />}
            >
              Add Subtopic
            </Button>
          </Center>
          {/* </Stack> */}
        </Collapse>
      ) : null}
    </>
  );
}
