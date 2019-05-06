import React, { Fragment, useRef, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import InputCell from "./InputCell";

const styles = {
  cell: {
    border: "solid lightgray 1px",
    borderTop: "solid rgb(247, 246, 246) 1px",
    borderBottom: "solid rgb(247, 246, 246) 1px",
    borderCollapse: "collapse",
    width: 60,
    height: 20,
    margin: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 12,
    userSelect: "none",
    "&:hover": {
      cursor: "crosshair"
    }
  },
  cellSelected: {
    outline: "solid rgba(5, 107, 223, .8) 2px",
    outlineOffset: "-2px",
    background: "rgba(143, 224, 249, .3)"
  },
  cellFocus: {
    outline: "solid rgba(5, 107, 223, .8) 2px",
    outlineOffset: "-2px",
    background: "rgba(143, 224, 249, .1)"
  }
};

const Cell = props => {
  const {
    classes,
    id,
    selectedCells,
    startSelect,
    cell,
    inputMode,
    inputValue,
    handleChangeInput
  } = props;

  const cellRef = useRef();
  useEffect(() => {
    if (id === startSelect) {
      cellRef.current.focus();
    }
  }, [startSelect]);

  return (
    <Fragment>
      <td
        ref={cellRef}
        id={id}
        tabIndex={0}
        className={classNames(
          classes.cell,
          startSelect === id
            ? classes.cellFocus
            : selectedCells &&
                selectedCells.includes(id) &&
                classes.cellSelected
        )}
      >
        {inputMode !== id ? (
          cell.value
        ) : (
          <InputCell
            inputValue={inputValue}
            handleChangeInput={handleChangeInput}
          />
        )}
      </td>
    </Fragment>
  );
};

export default withStyles(styles)(Cell);
