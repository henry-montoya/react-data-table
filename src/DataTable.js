import React, { useEffect, useState, useRef, useContext } from "react";
import { TableContext } from "./TableStore";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Row from "./Row";
import _ from "lodash";
import Mousetrap from "mousetrap";
import { noInput, navKeys, backspace, enter } from "./constants";
import useListeners from "./hooks/useListeners";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {
  table: {
    borderCollapse: "collapse",
    cursor: "cell"
  }
};

const DataTable = props => {
  const t = useListeners();
  const {
    mouseDown,
    keyDown,
    keyName,
    target,
    inputMode,
    activeInput,
    currentCell,
    startCell,
    endCell,
    selectedCells
  } = t;
  const [state, dispatch] = useContext(TableContext);
  const {
    classes,
    data,
    colHeaders,
    rowHeaders,
    showColHeaders,
    showRowHeaders,
    disableSelectCol,
    disableSelectRow
  } = props;
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    dispatch({ type: "SET_DATA", data });
  }, []);
  useEffect(() => {
    handleKeyStroke(keyName);
  }, [keyName]);

  const handleKeyStroke = keyName => {
    if (keyName === backspace)
      return dispatch({ type: "DELETE", selected: selectedCells });
    if (keyName === enter && inputMode) {
      setInputValue("");
      return dispatch({ type: "UPDATE", cell: activeInput, value: inputValue });
    }
  };

  const rowCount = props.data.length;
  const colCount = props.data[0].length;
  const maxrowindex = props.data.length - 1;
  const maxcolindex = props.data[0].length - 1;

  const handleChangeInput = e => setInputValue(e.target.value);
  return (
    <div className="App">
      <div>
        <div>started: {startCell}</div>
        <div>current: {currentCell}</div>
        <div>end: {endCell}</div>
      </div>
      <Paper>
        <Table cellSpacing={0} cellPadding={0} className={classes.table}>
          {showColHeaders && (
            <Header
              colCount={colCount}
              colHeaders={colHeaders}
              showRowHeaders={showRowHeaders}
              // disableSelectCol={disableSelectCol}
            />
          )}
          <TableBody>
            {state.data.map((row, i) => (
              <Row
                key={i}
                row={row}
                rowindex={i}
                rowHeaders={rowHeaders}
                selectedCells={selectedCells}
                startCell={startCell}
                inputMode={inputMode}
                activeInput={activeInput}
                inputValue={inputValue}
                handleChangeInput={handleChangeInput}
                showRowHeaders={showRowHeaders}
                //disableSelectRow={disableSelectRow}
                // handlePaste={handlePaste}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

const StyledTable = withStyles(styles)(DataTable);

export default withStyles(styles)(StyledTable);
