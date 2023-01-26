import classes from "./ProjectSelectionNav.module.css";

const ProjectSelectionNav = (props) => {

    return(
        <div className={classes["dash_project-selection_container"]}>
          <select className={classes["dash_project-selection_select"]} onChange={props.handleProjectSelection} >
            {props.placeholderProjects.map((project, index) => {
              return (
                <option key={index} value={project}>
                  {project}
                </option>
              );
            })}
          </select>
          <div>
            <button className={classes["dash_project-selection_create-button"]}>
              {" "}
              Create new project
            </button>
          </div>
        </div>
    )
};

export default ProjectSelectionNav;