import { Link } from "react-router-dom";
import classes from "./SideBar.module.css";
import {IconCategory2,IconWorld,IconCheckbox,IconBulb,IconWallet} from "@tabler/icons";
const SideBar = (props) => {
  return (
    <div className={classes["dash_sidebar-container"]}>
      <div className={classes["dash_sidebar-container_logo"]}>
        <img src="/pamogi-logo.png" width={100} />
      </div>
      <div className={classes.dash_buttons_section}>
        <div className={classes["dash_buttons-container"]}>
          <Link className={classes.button_menu_div} to="/">
            <IconCategory2 className={classes["dash_project-icon"]}/>
            <button className={classes.left_menu_buttons }onClick={props.handleMenuButton}>Project Dashboard</button>
          </Link>
          <Link  className={classes.button_menu_div} to="/projects">
            <IconWorld className={classes["dash_project-icon"]}/>
            <button  className={classes.left_menu_buttons }onClick={props.handleMenuButton}>Projects</button>
          </Link>
          <Link  className={classes.button_menu_div} to="/tasks">
            <IconCheckbox className={classes["dash_project-icon"]}/>
            <button className={classes.left_menu_buttons }onClick={props.handleMenuButton}>Tasks</button>
          </Link>
          <Link  className={classes.button_menu_div} to="/contributions">
            <IconBulb className={classes["dash_project-icon"]}/>
          <button className={classes.left_menu_buttons }onClick={props.handleMenuButton}>Contributions</button>
          </Link>
          <Link  className={classes.button_menu_div} to="/investments">
            <IconWallet className={classes["dash_project-icon"]}/>
            <button className={classes.left_menu_buttons }onClick={props.handleMenuButton}>Investments</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
