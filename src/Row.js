import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Cell from "./Cell";

const styles = {
  headerCell: {
    background: "whitesmoke",
    border: "solid lightgray 1px",
    borderCollapse: "collapse",
    width: 60,
    height: 20,
    margin: 0,
    padding: 0,
    userSelect: "none",
    "&:hover": {
      cursor: "pointer"
    },
    "&:active": {
      outline: "solid gray 2px",
      outlineOffset: "-2px"
    }
  }
};

const Row = props => {
  const {
    classes,
    row,
    rowIndex,
    selectedCells,
    startSelect,
    inputMode,
    inputValue,
    handleChangeInput
  } = props;
  return (
    <tr>
      <th id={`r-${rowIndex}`} className={classes.headerCell} />
      {row.map((cell, i) => {
        const id = `${rowIndex}-${i}`;
        return (
          <Cell
            id={id}
            selectedCells={selectedCells}
            startSelect={startSelect}
            cell={cell}
            inputMode={inputMode}
            inputValue={inputValue}
            handleChangeInput={handleChangeInput}
          />
        );
      })}
    </tr>
  );
};

export default withStyles(styles)(Row);
