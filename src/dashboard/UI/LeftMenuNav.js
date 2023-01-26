import classes from "./LeftMenuNav.module.css";

const LeftMenuBar = (props) => {
  return (
    <div className={classes["dash_sidebar-container"]}>
      <div className={classes["dash_sidebar-container_logo"]}>
        <img src="/pamogi-logo.png" width={100} />
      </div>
      <div className={classes.dash_buttons_section}>
        <div className={classes["dash_buttons-container"]}>
          <button onClick={props.handleMenuButton}>Project Dashboard</button>
          <button onClick={props.handleMenuButton}>Projects</button>
          <button onClick={props.handleMenuButton}>Tasks</button>
          <button onClick={props.handleMenuButton}>Contributions</button>
          <button onClick={props.handleMenuButton}>Investments</button>
        </div>
      </div>
    </div>
  );
};

export default LeftMenuBar;