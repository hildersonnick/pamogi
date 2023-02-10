import React, { useState } from "react";
import classes from "./HeaderBar.module.css";

const HeaderBar = (props) => {
  const [activeMenu, setActiveMenu] = useState("Overview");

  const handleMenuClick = (menu) => {
    props.getHeaderData(menu);
    setActiveMenu(menu);
  };
  const headers = [
    "Overview",
    "Description",
    "Tasks",
    "Departments",
    "Suggestions",
    "Funding",
    "Dao",
    "Jobs",
    "Introductions",
    "Mindmap",
    "Invite others",
  ];
  const width = 100 / headers.length;

  return (
    <div>
      <div className={classes.container}>
        {headers.map((header) => (
          <div
            key={header}
            className={classes.menuItem}
            onClick={() => handleMenuClick(header)}
          >
            <h4>{header}</h4>
          </div>
        ))}
      </div>
      <div
        className={classes.menuBar}
        style={{
            background: `linear-gradient(to right, rgb(171,144,185) ${(width * headers.indexOf(activeMenu))}%, #c34594 ${(width * headers.indexOf(activeMenu))}%, #c34594 ${(width * headers.indexOf(activeMenu)) + width}%, rgb(171,144,185) ${(width * headers.indexOf(activeMenu)) + width}%)`,
          }}
      />
    </div>
  );
};

export default HeaderBar;
