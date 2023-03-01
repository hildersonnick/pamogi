import classes from "./TopicRows.module.css";
import { useState } from "react";
import {
  Box,
  Collapse,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Divider,
  Button,
} from "@material-ui/core";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import SubSubTopicRows from "./SubSubTopicRows";

const SubTopicRows = (props) => {
  const { subtopics } = props;
  const [secondOpen, setSecondOpen] = useState(false);
  function addSubSubTopicHandler() {
    console.log("Add subsubtopic");
  }

  return (
    <>
      <TableRow
        style={{ backgroundColor: props.open ? "rgb(64,32,81)" : "#3a194d" }}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell style={{ border: "none", padding: 0 }} colSpan={6}>
          <Collapse in={props.open} timeout="auto" unmountOnExit>
            <Box style={{ margin: 1 }}>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  style={{
                    color: "rgb(231, 206, 254)",
                    padding: "0px 16px",
                    fontSize: "0.875rem",
                  }}
                  variant="h6"
                  gutterBottom
                >
                  Subtopics
                </Typography>
                <Button
                  startIcon={<Add />}
                  onClick={addSubSubTopicHandler}
                  size="small"
                  style={{
                    fontSize: "12px",
                    marginRight: "1%",
                    color: "#ab91bb",
                    cursor: "pointer",
                  }}
                  className={classes.button}
                >
                  Add a Subsubtopic
                </Button>
              </Box>

              <Divider
                style={{
                  backgroundColor: "rgb(125,79,135)",
                  height: "2px",
                  width: "98%",
                  marginLeft: "1%",
                }}
              />
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {subtopics.map((subsubTaskRow) => (
                    <>
                      <TableRow key={subsubTaskRow.id}>
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
                          {subsubTaskRow.id}
                        </TableCell>
                        <TableCell
                          style={{
                            border: "none",

                            textAlign: "left",
                            color: "rgb(231, 206, 254)",
                            width: "15%",
                          }}
                        >
                          {subsubTaskRow.user}
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
                          {subsubTaskRow.title}
                        </TableCell>
                        <TableCell style={{ border: "none" }}>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                              setSecondOpen(
                                secondOpen ? false : true
                              );
                            }}
                          >
                            {secondOpen ? (
                              <KeyboardArrowUp style={{ color: "white" }} />
                            ) : (
                              <KeyboardArrowDown style={{ color: "white" }} />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <SubSubTopicRows
                        subtopics={subtopics}
                        open={props.open}
                        setOpen={props.setOpen}
                        secondOpen={secondOpen}
                        setSecondOpen={setSecondOpen}
                        subtopicId = {subsubTaskRow.id}
                      />
                    </>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SubTopicRows;
