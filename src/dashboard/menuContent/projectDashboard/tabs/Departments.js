import classes from "./Departments.module.css";
import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Box,
  Collapse,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { MockData } from "./MockData";
import TopicRows from "./components/TopicRows";




const dashboardTabDepartments = () => {
  const [projects, setProjects] = useState();
  const [subprojects, setSubprojects] = useState();
  const [tasks, setTasks] = useState();
  const [expanded, setExpanded] = useState(false);
  const unique_id = uuid();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const addSubtopicHandler = () => {
    console.log("Subtopic adding checked");
  };
  const addTopicHandler = () => {
    console.log("Topic adding checked");
  }

  useEffect(() => {
    const supabase = createClient(
      process.env.REACT_APP_SUPABASE_URL,
      process.env.REACT_APP_SUPABASE_ANON_KEY
    );

    async function getProjects() {
      const data = await supabase.from("projects_sample").select();
      setProjects(data.data);
    }

    async function getSubprojects() {
      const data = await supabase.from("subproject_sample").select();
      setSubprojects(data.data);
    }

    async function getSubsubprojects() {
      const data = await supabase.from("subsubproject_sample").select();
      setTasks(data.data);
    }

    getProjects();
    getSubprojects();
    getSubsubprojects();
    console.log("projects->>", projects);
    console.log("subprojects->>", subprojects);
    console.log("tasks->>", tasks);
  }, []);

  const rows = MockData;

  if (projects != undefined && subprojects != undefined && tasks != undefined) {
    return (
      <>
        <Box>
          <select className={classes["select"]}>
            {projects.map((projects, i) => {
              return <option key={projects.id}>{projects.title}</option>;
            })}
          </select>
          <Button
            startIcon={<Add />}
            onClick={addTopicHandler}
            size="small"
            style={{
              borderRadius: "10px",
              padding: "8px 15px",
              fontSize: "12px",
              marginLeft: "20px",
              backgroundColor: "#3a194d",
              color: "#ab91bb",
              cursor: "pointer",
            }}
            className={classes.button}
          >
            Add a Topic
          </Button>
        </Box>

        <TableContainer
          style={{
            padding: "10px 15px",
            backgroundColor: "#3a194d",
            borderRadius: "25px",
          }}
          component={Paper}
        >
          <Table aria-label="collapsible table">
            <TableHead style={{ border: "unset" }}>
              <TableRow>
                <TableCell
                  style={{
                    borderBottom: "2px solid rgba(118, 74, 129, 1)",
                    textAlign: "left",
                    textAlign: "left",
                    color: "white",
                  }}
                >
                  Topic #
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "2px solid rgba(118, 74, 129, 1)",

                    textAlign: "left",
                    textAlign: "left",
                    color: "white",
                  }}
                  align="right"
                >
                  User
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "2px solid rgba(118, 74, 129, 1)",

                    textAlign: "left",
                    textAlign: "left",
                    color: "white",
                  }}
                  align="right"
                >
                  Title
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "2px solid rgba(118, 74, 129, 1)",
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TopicRows key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};

export default dashboardTabDepartments;
