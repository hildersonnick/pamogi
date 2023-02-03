import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import classes from "./Dashboard.module.css";
import SideBar from "./UI/SideBar";
import TopBar from "./UI/TopBar";
import Tasks from "./menuContent/tasks/Tasks";
import ProjectDashboard from "./menuContent/projectDashboard/ProjectDashboard";
import Projects from "./menuContent/projects/Projects";
import Contributions from "./menuContent/contributions/Contributions";
import Investments from "./menuContent/investments/Investments";
const Dashboard = (props) => {
  const [placeholderProjects, setPlaceholderProjects] = useState([
    "Equilibrium Project",
    "Lorem Project",
    "Ipsum Project",
  ]);
  const [SelectedProject, setSelectedProject] = useState(
    placeholderProjects[0]
  );

  const handleProjectSelection = (event) => {
    setSelectedProject(event.target.value);
  };
  

  return (
    <div className={classes.dash_container}>
      <BrowserRouter>
        <SideBar />
        <div className={classes["dash_main-canva"]}>
          <TopBar
            placeholderProjects={placeholderProjects}
            handleProjectSelection={handleProjectSelection}
            setDashboardVisible={props.setDashboardVisible}
          />
          <Routes>
            <>
              <Route path="/" element={<ProjectDashboard projectData={SelectedProject} />} />
              <Route path="/projects/" element={<Projects projectData={SelectedProject} />} />
              <Route path="/tasks" element={<Tasks projectData={SelectedProject} />} />
              <Route path="/contributions" element={<Contributions projectData={SelectedProject} />} />
              <Route path="/investments" element={<Investments projectData={SelectedProject} />} />
            </>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Dashboard;
