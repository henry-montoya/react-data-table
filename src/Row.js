import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
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
    fontSize: 12,
    userSelect: "none",
    "&:hover": {
      cursor: "pointer"
    },
    "&:active": {
      outline: "solid gray 2px",
      outlineOffset: "-2px"
    }
  },
  inactiveHeader: {
    background: "whitesmoke",
    border: "solid lightgray 1px",
    borderCollapse: "collapse",
    width: 60,
    height: 20,
    margin: 0,
    padding: 0,
    fontSize: 12,
    userSelect: "none"
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
    handleChangeInput,
    showRowHeaders,
    rowHeaders,
    disableSelectRow,
    handlePaste
  } = props;
  return (
    <tr>
      {showRowHeaders && (
        <th
          id={`r-${rowIndex}`}
          className={classNames(
            !disableSelectRow ? classes.headerCell : classes.inactiveHeader
          )}
        >
          {rowHeaders[rowIndex].label}
        </th>
      )}
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
            handlePaste={handlePaste}
          />
        );
      })}
    </tr>
  );
};

export default withStyles(styles)(Row);
