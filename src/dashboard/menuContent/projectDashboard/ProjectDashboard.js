import HeaderBar from "../../UI/HeaderBar";
import { useEffect, useState } from "react";
import Overview from './tabs/Overview'
import Departments from './tabs/Departments'
import { createClient } from '@supabase/supabase-js'

const ProjectDashboard = (props) => {
  const [headerData , setHeaderData] = useState("Overview");

  const handleHeaderData = (data) => {
    setHeaderData(data);
  }


  return (
    <>
      <HeaderBar getHeaderData={handleHeaderData}  />
      <div>
        {headerData === "Overview" && <Overview />}
        {headerData === "Departments" && <Departments />}
      </div>
    </>
  );
};

export default ProjectDashboard;
