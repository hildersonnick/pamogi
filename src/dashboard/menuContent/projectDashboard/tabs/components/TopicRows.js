import { useEffect, useState } from "react";
import {
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import SubTopicRows from "./SubTopicRows";


function TopicRows(props) {
  function addSubTopicHandler() {
    console.log("Add subtopic");
  }
  function addSubSubTopicHandler() {
    console.log("Add subsubtopic");
  }

  const { row } = props;
  console.log("first incoming data------->>>", row);
  const [open, setOpen] = useState(false);
  

  return (
    <>
      <TableRow
        style={{ backgroundColor: open ? "rgb(64,32,81)" : "#3a194d" }}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell
          style={{
            border: "none",
            textAlign: "left",
            color: "rgb(231, 206, 254)",
            width: "10%",
          }}
          component="th"
          scope="row"
        >
          {row.id}
        </TableCell>
        <TableCell
          style={{
            border: "none",
            textAlign: "left",
            color: "rgb(231, 206, 254)",
            width: "15%",
          }}
          align="right"
        >
          {row.user}
        </TableCell>
        <TableCell
          style={{
            border: "none",
            textAlign: "left",
            color: "rgb(231, 206, 254)",
            width: "70%",
          }}
          align="right"
        >
          {row.title}
        </TableCell>
        <TableCell style={{ border: "none" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              setSecondOpen(false);
            }}
          >
            {open ? (
              <KeyboardArrowUp style={{ color: "white" }} />
            ) : (
              <KeyboardArrowDown style={{ color: "white" }} />
            )}
          </IconButton>
        </TableCell>
      </TableRow>

      <SubTopicRows
        subtopics={row.subtopics}
        open={open}
        setOpen={setOpen}
        
      />
    </>
  );
}

export default TopicRows;
