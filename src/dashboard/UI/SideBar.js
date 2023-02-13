import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "./SideBar.module.css";
import {
  IconCategory2,
  IconWorld,
  IconCheckbox,
  IconBulb,
  IconWallet,
} from "@tabler/icons";

const SideBar = (props) => {
  const [currentMenu, setCurrentMenu] = useState("Project Dashboard");

  const handleMenuButton = (event) => {
    setCurrentMenu(event.target.innerText);
  };
  return (
    <div className={classes["dash_sidebar-container"]}>
      <div className={classes["dash_sidebar-container_logo"]}>
        <img src="/pamogi-logo.png" width={100} />
      </div>
      <div className={classes.dash_buttons_section}>
        <div className={classes["dash_buttons-container"]}>
          <Link className={classes.button_menu_div} to="/">
            <IconCategory2 className={classes["dash_project-icon"]} />
            <button
              className={
                currentMenu === "Project Dashboard"
                  ? classes["left_menu_buttons-active"]
                  : classes.left_menu_buttons
              }
              onClick={handleMenuButton}
            >
              Project Dashboard
            </button>
          </Link>
          <Link className={classes.button_menu_div} to="/projects">
            <IconWorld className={classes["dash_project-icon"]} />
            <button
              className={
                currentMenu === "Projects"
                  ? classes["left_menu_buttons-active"]
                  : classes.left_menu_buttons
              }
              onClick={handleMenuButton}
            >
              Projects
            </button>
          </Link>
          <Link className={classes.button_menu_div} to="/tasks">
            <IconCheckbox className={classes["dash_project-icon"]} />
            <button
              className={
                currentMenu === "Tasks"
                  ? classes["left_menu_buttons-active"]
                  : classes.left_menu_buttons
              }
              onClick={handleMenuButton}
            >
              Tasks
            </button>
          </Link>
          <Link className={classes.button_menu_div} to="/contributions">
            <IconBulb className={classes["dash_project-icon"]} />
            <button
              className={
                currentMenu === "Contributions"
                  ? classes["left_menu_buttons-active"]
                  : classes.left_menu_buttons
              }
              onClick={handleMenuButton}
            >
              Contributions
            </button>
          </Link>
          <Link className={classes.button_menu_div} to="/investments">
            <IconWallet className={classes["dash_project-icon"]} />
            <button
              className={
                currentMenu === "Investments"
                  ? classes["left_menu_buttons-active"]
                  : classes.left_menu_buttons
              }
              onClick={handleMenuButton}
            >
              Investments
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
