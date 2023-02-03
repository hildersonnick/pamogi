import classes from "./TopBar.module.css";
import { Link } from "react-router-dom";
import { IconBell, IconUserCircle, IconWorld } from "@tabler/icons";
const TopBar = (props) => {
  const switwchTo3D = () => {
    window.history.pushState({}, "", "/");
    props.setDashboardVisible(false);
  };

  return (
    <div className={classes["dash_project-selection_container"]}>
      <div>
        
        <select
          className={classes["dash_project-selection_select"]}
          onChange={props.handleProjectSelection}
        >
          {props.placeholderProjects.map((project, index) => {
            return (
              <option key={index} value={project}>
                {project}
              </option>
            );
          })}
        </select>
        <button className={classes["dash_project-selection_create-button"]}>
          {" "}
          Create new project
        </button>
      </div>

      <div className={classes.top_menu_right_elements} >
        <button
          className={classes.switch_3d_button}
          onClick={switwchTo3D}
        > 
        <IconWorld className={classes["dash_project-icon"]}/>
          Switch to 3D view
        </button>

        <IconBell
          className={classes["dash_project-icon"]}
          size={28}
        />
        <IconUserCircle
          className={classes["dash_project-icon"]}
          size={28}
        />
        {/* UserName */}
        <p>Mr Bogi</p>
      </div>
    </div>
  );
};

export default TopBar;
