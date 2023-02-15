import ProjectDashboardTabBar from "../../UI/ProjectDasboardTabBar";
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
      <ProjectDashboardTabBar   />
    
    </>
  );
};

export default ProjectDashboard;
