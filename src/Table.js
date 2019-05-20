import React, { useEffect, useState, useRef, useContext } from "react";
import { TableContext } from "./TableStore";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Row from "./Row";
import _ from "lodash";
import Mousetrap from "mousetrap";
import { noInput, navKeys } from "./constants";
import useListeners from "./hooks/useListeners";

const styles = {
  table: {
    borderCollapse: "collapse"
  }
};

const Table = props => {
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
    endCell
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
  const [tableData, setTableData] = useState(data);
  const [selectedCells, setSelectedCells] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const tableDataRef = useRef();
  useEffect(() => {
    tableDataRef.current = tableData;
  });

  const rowCount = props.data.length;
  const colCount = props.data[0].length;
  const maxRowIndex = props.data.length - 1;
  const maxColIndex = props.data[0].length - 1;

  const handleChangeInput = e => setInputValue(e.target.value);

  return (
    <div className="App">
      <div>start: {startCell}</div>
      <div>current: {currentCell}</div>
      <div>end: {endCell}</div>
      <div>selected: {selectedCells.join(",")}</div>

      <table cellSpacing={0} cellPadding={0} className={classes.table}>
        {showColHeaders && (
          <Header
            colCount={colCount}
            colHeaders={colHeaders}
            showRowHeaders={showRowHeaders}
            // disableSelectCol={disableSelectCol}
          />
        )}
        <tbody>
          {tableData.map((row, i) => (
            <Row
              key={i}
              row={row}
              rowIndex={i}
              rowHeaders={rowHeaders}
              selectedCells={selectedCells}
              startCell={startCell}
              // inputMode={inputMode}
              // inputValue={inputValue}
              // handleChangeInput={handleChangeInput}
              showRowHeaders={showRowHeaders}
              // disableSelectRow={disableSelectRow}
              // handlePaste={handlePaste}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StyledTable = withStyles(styles)(Table);

export default withStyles(styles)(StyledTable);
