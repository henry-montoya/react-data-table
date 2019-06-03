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
    rowindex,
    selectedCells,
    startCell,
    inputMode,
    activeInput,
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
          id={`r-${rowindex}`}
          className={classNames(
            !disableSelectRow ? classes.headerCell : classes.inactiveHeader
          )}
        >
          {rowHeaders[rowindex].label}
        </th>
      )}
      {row.map((cell, i) => {
        const id = `${rowindex}-${i}`;
        return (
          <Cell
            key={id}
            id={id}
            rowindex={rowindex}
            colindex={i}
            inputMode={inputMode}
            activeInput={activeInput}
            inputValue={inputValue}
            handleChangeInput={handleChangeInput}
            startCell={startCell}
            selectedCells={selectedCells}
            cell={cell}
          />
        );
      })}
    </tr>
  );
};

export default withStyles(styles)(Row);
