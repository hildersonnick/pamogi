import { useState } from "react";

import classes from "./Dashboard.module.css";
import LeftMenuBar from "./UI/LeftMenuNav";
import ProjectSelectionNav from "./UI/ProjectSelectionNav";
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
  const [SelectedProject, setSelectedProject] = useState(placeholderProjects[0]);
  const [currentMenu, setCurrentMenu] = useState("Project Dashboard");

  const handleProjectSelection = (event) => {
    setSelectedProject(event.target.value);
  }
  const handleMenuButton = (event) => {
    setCurrentMenu(event.target.innerText);
  }
  
  return (
    <div className={classes.dash_container}>
      <LeftMenuBar handleMenuButton={handleMenuButton}  />
      <div className={classes["dash_main-canva"]}>
      <ProjectSelectionNav placeholderProjects={placeholderProjects} handleProjectSelection={handleProjectSelection} />     
        <button onClick={() => setDashboardVisible(false)}>Switch to 3D</button>
        {currentMenu === "Project Dashboard" && <ProjectDashboard projectData={SelectedProject} />}
        {currentMenu === "Projects" && <Projects projectData={SelectedProject} />}
        {currentMenu === "Tasks" && <Tasks projectData={SelectedProject} />}
        {currentMenu === "Contributions" && <Contributions projectData={SelectedProject} />}
        {currentMenu === "Investments" && <Investments projectData={SelectedProject} />}     
      </div>
    </div>
  );
};

export default Dashboard;