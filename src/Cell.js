import React, { Fragment, useRef, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import InputCell from "./InputCell";
import TableCell from "@material-ui/core/TableCell";

const styles = {
  cell: {
    // border: "solid lightgray 1px",
    // borderTop: "solid rgb(247, 246, 246) 1px",
    // borderBottom: "solid rgb(247, 246, 246) 1px",
    // borderCollapse: "collapse",
    // width: 60,
    // height: 20,
    // margin: 0,
    //paddingLeft: 8,
    //paddingRight: 8,
    //paddingTop: 3,
    //paddingBottom: 3,
    // fontSize: 12,
    //padding: 5,
    //margin: 0,
    textAlign: "center",
    userSelect: "none",
    "&:hover": {
      cursor: "cell"
    }
  },
  innerCell: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3
  },
  cellSelected: {
    //outline: "solid rgba(5, 107, 223, .8) 2px",
    //outlineOffset: "-2px",
    background: "rgba(143, 224, 249, .3)"
  },
  cellFocus: {
    //boxShadow: "inset 1px 1px 1px 1px rgba(5,107,223,.8)",
    outline: "solid rgba(5, 107, 223, .8) 1px",
    outlineOffset: "-1px",
    background: "rgba(143, 224, 249, .1)"
  }
};

const Cell = props => {
  const {
    classes,
    rowindex,
    colindex,
    id,
    selectedCells,
    startCell,
    cell,
    inputMode,
    activeInput,
    inputValue,
    handleChangeInput,
    handlePaste
  } = props;
  console.log("start", startCell);
  const { startRow, startCol, finalRow, finalCol } = selectedCells;

  const cellRef = useRef();
  // useEffect(() => {
  //   if (startCell === id) {
  //     cellRef.current.focus();
  //   }
  // }, [startCell, id]);

  const isSelected = () => {
    if (startRow === null) return false;
    const row = id.split("-")[0];
    const col = id.split("-")[1];
    const rowMin = Math.min(startRow, finalRow);
    const rowMax = Math.max(startRow, finalRow);
    const colMin = Math.min(startCol, finalCol);
    const colMax = Math.max(startCol, finalCol);
    return row >= rowMin && row <= rowMax && col >= colMin && col <= colMax;
  };
  return (
    <Fragment>
      <TableCell
        ref={cellRef}
        //contentEditable={true}
        //onPaste={handlePaste}
        id={id}
        rowindex={rowindex}
        colindex={colindex}
        tabIndex={0}
        className={classNames(
          classes.cell,
          startCell === id
            ? classes.cellFocus
            : isSelected()
            ? classes.cellSelected
            : null
        )}
      >
        {inputMode && activeInput === id && startCell === id ? (
          <InputCell
            inputValue={inputValue}
            handleChangeInput={handleChangeInput}
          />
        ) : (
          cell.value
        )}
      </TableCell>
    </Fragment>
  );
};

export default withStyles(styles)(Cell);
