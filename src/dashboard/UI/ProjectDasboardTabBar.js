import React, { useState } from "react";
import PropTypes from "prop-types";

import Overview from "../menuContent/projectDashboard/tabs/Overview";
import Departments from "../menuContent/projectDashboard/tabs/Departments";
import { Tabs, Tab, Accordion, Typography, Box } from "@material-ui/core";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ProjectDashboardTabBar = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box style={{ width: "100%" }}>
      
      <Box style={{ marginTop:"2px", borderBottom: "1px solid rgb(231, 206, 254)" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="project-dashboard-tabs"
          style={{ padding: 0}}
           TabIndicatorProps={{ style: { marginTop:"-5px", background: "#c34594",  height:"3px" } }}

        >
          <Tab
            label="Overview"
            {...a11yProps(0)}
            style={{ color: "rgb(231, 206, 254)" }}
          />
          <Tab
            label="Description"
            {...a11yProps(1)}
            style={{ color: "rgb(231, 206, 254)" }}
          />
          <Tab
            label="Departmants"
            {...a11yProps(2)}
            style={{ color: "rgb(231, 206, 254)" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Overview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Departments />
      </TabPanel>
    </Box>
  );
};

export default ProjectDashboardTabBar;
