import classes from "./Departments.module.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  Accordion,
  Button,
  Card,
} from "@material-ui/core";
import { ExpandMore, Add } from "@material-ui/icons";

const dashboardTabDepartments = () => {
  const [projects, setProjects] = useState();
  const [subprojects, setSubprojects] = useState();
  const [tasks, setTasks] = useState();
  const [expanded, setExpanded] = useState(false);
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

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

  if (projects != undefined && subprojects != undefined && tasks != undefined) {
    return (
      <div>
        <div>
          <select className={classes["select"]}>
            {projects.map((projects, i) => {
              return <option key={projects.id}>{projects.title}</option>;
            })}
          </select>
        </div>
        <Card
          style={{
            padding: "30px 0px",
            backgroundColor: "#3A1D51",
            borderRadius: "15px",
          }}
        >
          {subprojects.map((subproject, i) => {
            return (
              <Accordion
                className={classes["accordion"]}
                expanded={expanded === `panel${i + 1}`}
                onChange={handleChange(`panel${i + 1}`)}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore style={{ color: "rgb(171, 145, 187)" }} />
                  }
                  style={{ padding: "0px" }}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{ color: "#fff" }}
                >
                  <Typography style={{ width: "5%", flexShrink: 0 }}>
                    #{subproject.index}
                  </Typography>
                  <Typography style={{ width: "15%", flexShrink: 0 }}>
                    Mr Dogi
                  </Typography>
                  <Typography style={{ width: "80%", flexShrink: 0 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex,
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    display: "block",
                    marginTop: "10px",
                    padding: "0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography style={{}}>Subtopics</Typography>
                    <Button
                      startIcon={<Add />}
                      onClick={addSubtopicHandler}
                      size="small"
                      style={{
                        fontSize: "12px",
                        color: "#ab91bb",
                        cursor: "pointer",
                      }}
                      className={classes.button}
                    >
                      Add a Subtopic
                    </Button>
                  </div>
                  <hr
                    style={{
                      backgroundColor: "#ab91bb",
                      height: "1px",
                      backgroundColor: "#ab91bb",
                      border: "none",
                    }}
                  />

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {tasks.map((task, i) => {
                      if (task.parent == subproject.index) {
                        console.log("SUB: ", subprojects);
                        return (
                          <AccordionDetails style={{ padding: "0px" }}>
                            <Typography>{task.title}</Typography>
                          </AccordionDetails>
                        );
                      }
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Card>
      </div>
    );
  }
};

export default dashboardTabDepartments;
