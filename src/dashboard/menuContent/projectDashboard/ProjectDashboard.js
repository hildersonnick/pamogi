import HeaderBar from "../../UI/HeaderBar";
import { useState } from "react";
const ProjectDashboard = (props) => {

  const [headerData , setHeaderData] = useState("Overview");
  const handleHeaderData = (data) => {
    setHeaderData(data);
  }
  return (
    <>
      <HeaderBar getHeaderData={handleHeaderData}  />
      <div>
        <h1>{props.projectData}</h1>

        <h2>Project Dashboard Menu</h2>
        <p>{headerData}</p>
      </div>
    </>
  );
};

export default ProjectDashboard;
