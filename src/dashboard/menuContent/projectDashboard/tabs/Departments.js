import classes from "./Departments.module.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Accordion } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { green } from "@material-ui/core/colors/green";

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
                style={{ paddingLeft: "31px" }}
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
              <AccordionDetails>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <Typography style={{ fontWeight: "bold" }}>
                    Subtopics
                  </Typography>
                  <Button size="small"  color="#ab91bb">
                    Add a Subtopic
                  </Button>
                </div>
                <hr style={{ borderTop: "1px solid #e5e5e5" }} />
                <div style={{display:"flex", justifyContent:"space-between"}} >
                {tasks.map((task, i) => {
                  if (task.parent == subproject.index) {
                    console.log("SUB: ", subprojects);
                    return (
                      <AccordionDetails>
                          <Typography>{task.title}</Typography>
                      </AccordionDetails>
                    );
                  } })}
                </div>
                
               
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    );
  }
};

export default dashboardTabDepartments;
