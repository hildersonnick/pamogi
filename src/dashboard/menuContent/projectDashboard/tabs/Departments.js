import classes from "./Departments.module.css";
import React from "react";
import PropTypes from "prop-types";
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
  Button,
  Card,
} from "@material-ui/core";
import {
  ExpandMore,
  Add,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
import { MockData } from "./MockData";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          style={{
            textAlign: "left",
            color: "rgb(231, 206, 254)",
            width: "10%",
          }}
          component="th"
          scope="row"
        >
          {row.id}
        </TableCell>
        <TableCell
          style={{
            textAlign: "left",
            color: "rgb(231, 206, 254)",
            width: "15%",
          }}
          align="right"
        >
          {row.user}
        </TableCell>
        <TableCell
          style={{
            textAlign: "left",
            color: "rgb(231, 206, 254)",
            width: "70%",
          }}
          align="right"
        >
          {row.title}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUp style={{ color: "white" }} />
            ) : (
              <KeyboardArrowDown style={{ color: "white" }} />
            )}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box style={{ margin: 1 }}>
              <Typography
                style={{ color: "rgb(231, 206, 254)", padding:"16px" }}
                variant="h6"
                gutterBottom
              >
                Subtopics
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.subtopics.map((subTaskRow) => (
                    <TableRow key={subTaskRow.id}>
                      <TableCell
                        style={{
                          border: "none",
                          textAlign: "left",
                          color: "rgb(231, 206, 254)",
                          width: "10%",
                        }}
                        component="th"
                        scope="row"
                      >
                        {subTaskRow.id}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "none",

                          textAlign: "left",
                          color: "rgb(231, 206, 254)",
                          width: "15%",
                        }}
                      >
                        {subTaskRow.user}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "none",

                          textAlign: "left",
                          color: "rgb(231, 206, 254)",
                          width: "70%",
                        }}
                        align="right"
                      >
                        {subTaskRow.title}
                      </TableCell>
                      <TableCell style={{borderBottom:"none"}} >
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setSecondOpen(!secondOpen)}
                        >
                          {secondOpen ? (
                            <KeyboardArrowUp style={{ color: "white" }} />
                          ) : (
                            <KeyboardArrowDown style={{ color: "white" }} />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={secondOpen} timeout="auto" unmountOnExit>
            <Box style={{ margin: 1 }}>
              <Typography
                style={{ color: "rgb(231, 206, 254)", padding:"16px" }}
                variant="h6"
                gutterBottom
              >
                Subsubtopics
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.subtopics.map((subTaskRow) => (
                    <TableRow key={subTaskRow.id}>
                      <TableCell
                        style={{
                          border: "none",
                          textAlign: "left",
                          color: "rgb(231, 206, 254)",
                          width: "10%",
                        }}
                        component="th"
                        scope="row"
                      >
                        {subTaskRow.id}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "none",

                          textAlign: "left",
                          color: "rgb(231, 206, 254)",
                          width: "15%",
                        }}
                      >
                        {subTaskRow.user}
                      </TableCell>
                      <TableCell
                        style={{
                          border: "none",

                          textAlign: "left",
                          color: "rgb(231, 206, 254)",
                          width: "70%",
                        }}
                        align="right"
                      >
                        {subTaskRow.title}
                      </TableCell>
                      <TableCell style={{borderBottom:"none"}} >
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setSecondOpen(!secondOpen)}
                        >
                         
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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

  Row.propTypes = {
    row: PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtopics: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          user: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

  const rows = MockData;

  if (projects != undefined && subprojects != undefined && tasks != undefined) {
    return (
      <>
        <div>
          <select className={classes["select"]}>
            {projects.map((projects, i) => {
              return <option key={projects.id}>{projects.title}</option>;
            })}
          </select>
        </div>
        <TableContainer
          style={{ backgroundColor: "#3a194d" }}
          component={Paper}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    textAlign: "left",
                    textAlign: "left",
                    color: "white",
                  }}
                >
                  Topic #
                </TableCell>
                <TableCell
                  style={{
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
                    textAlign: "left",
                    textAlign: "left",
                    color: "white",
                  }}
                  align="right"
                >
                  Title
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
};

export default dashboardTabDepartments;
