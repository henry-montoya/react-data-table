import React, { useEffect, useState, useRef, useContext } from "react";
import { TableContext } from "./TableStore";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Row from "./Row";
import _ from "lodash";
import Mousetrap from "mousetrap";
import { noInput, navKeys } from "./constants";

const styles = {
  table: {
    borderCollapse: "collapse"
  }
};

const Table = props => {
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
  const [mouseDown, setMousedown] = useState(false);
  const [startSelect, setStartSelect] = useState("");
  const [recentSelect, setRecentSelect] = useState("");
  const [currentSelect, setCurrentSelect] = useState("");
  const [endSelect, setEndSelect] = useState("");
  const [selectedCells, setSelectedCells] = useState([]);
  const [keyDown, setKeyDown] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputMode, setInputMode] = useState("");
  const [metaDown, setMetaDown] = useState(false);
  const tableDataRef = useRef();
  useEffect(() => {
    tableDataRef.current = tableData;
  });
  useEffect(() => {
    window.addEventListener("mousedown", e => {
      setMousedown(true);
      setStartSelect(e.target.id);
      if (e.target.id) {
        setRecentSelect(e.target.id);
      }
      setEndSelect([]);
      setInputMode("");
    });
    window.addEventListener("mouseup", e => {
      setMousedown(false);
      setEndSelect(e.target.id);
    });
    window.addEventListener("mouseover", e => {
      setCurrentSelect(e.target.id);
    });
    window.addEventListener("keydown", e => {
      setKeyDown(e.key);
      if (e.key === "Meta" || e.key === "Control") {
        setMetaDown(true);
      }
    });
    window.addEventListener("keyup", e => {
      setKeyDown(null);
      if (e.key === "Meta" || e.key === "Control") {
        setMetaDown(false);
      }
    });
    window.addEventListener("dblclick", e => {
      const id = e.target.id;
      if (/^[0-9]$/.test(id.split("-")[0])) {
        initializeInput(id);
      }
    });
    window.addEventListener("click", e => {
      const identifier = e.target.id.split("-");
      if (identifier[0] === "r" && !disableSelectRow) selectRow(identifier[1]);
      if (identifier[0] === "c" && !disableSelectCol) selectCol(identifier[1]);
    });
  }, []);
  useEffect(() => {
    if (!/^[A-Za-z]$/.test(startSelect.split("-")[0])) {
      calcSelectedCells(startSelect, currentSelect, endSelect);
    }
  }, [startSelect, currentSelect, endSelect]);
  useEffect(() => {
    handleKeyDown(keyDown);
  }, [keyDown]);
  useEffect(() => {
    clickOffCell();
  }, [startSelect]);
  // useEffect(() => {
  //   Mousetrap.bind(["command+v", "ctrl+k"], e => {
  //     e.preventDefault();
  //     console.log(e.clipboardData.getData("text"));
  //     console.log("hello");
  //     //handlePaste(e.clipboardData.getData("text"));
  //     return false;
  //   });
  // }, []);

  //console.log("table Data", tableData);

  const rowCount = props.data.length;
  const colCount = props.data[0].length;
  const maxRowIndex = props.data.length - 1;
  const maxColIndex = props.data[0].length - 1;

  const initializeInput = id => {
    const rowCol = id.split("-");
    setInputMode(id);
    setInputValue(tableDataRef.current[rowCol[0]][rowCol[1]].value);
  };

  const clickOffCell = () => {
    if (inputValue) {
      handleSaveChange(recentSelect, inputValue);
    }
  };

  const selectRow = index => {
    const selected = tableData[0].map((cell, i) => `${index}-${i}`);
    setStartSelect(`${index}-0`);
    setSelectedCells(selected);
  };

  const selectCol = index => {
    const selected = tableData.map((cell, i) => `${i}-${index}`);
    setStartSelect(`0-${index}`);
    setSelectedCells(selected);
  };

  const calcSelectedCells = (startSelect, currentSelect, endSelect) => {
    const finalSelect =
      endSelect && endSelect.length ? endSelect : currentSelect;
    if (!startSelect) return setSelectedCells([]);
    if (startSelect && finalSelect) {
      const startRow = parseInt(startSelect.split("-")[0]);
      const startCol = parseInt(startSelect.split("-")[1]);
      const finalRow = parseInt(finalSelect.split("-")[0]);
      const finalCol = parseInt(finalSelect.split("-")[1]);
      if (startSelect === finalSelect) {
        return setSelectedCells([startSelect]);
      } else if (mouseDown) {
        const colSpan = Math.abs(finalCol - startCol);
        const rowSpan = Math.abs(finalRow - startRow);
        let selected = [];
        for (let j = 0; j <= rowSpan; j++) {
          for (let i = 0; i <= colSpan; i++) {
            if (startRow < finalRow) {
              if (startCol < finalCol) {
                selected.push(`${startRow + j}-${startCol + i}`);
              } else {
                selected.push(`${startRow + j}-${finalCol + i}`);
              }
            } else {
              if (startCol < finalCol) {
                selected.push(`${finalRow + j}-${startCol + i}`);
              } else {
                selected.push(`${finalRow + j}-${finalCol + i}`);
              }
            }
          }
        }
        return setSelectedCells(selected);
      }
    }
  };

  const handleNavigation = key => {
    const startRow = parseInt(startSelect.split("-")[0]);
    const startCol = parseInt(startSelect.split("-")[1]);
    if ((key === "Tab" || key === "ArrowRight") && startCol < maxColIndex) {
      setStartSelect(`${startRow}-${startCol + 1}`);
      setRecentSelect(`${startRow}-${startCol + 1}`);
      setSelectedCells([`${startRow}-${startCol + 1}`]);
    } else if (key === "Tab" && startCol === maxColIndex) {
      setStartSelect(`${startRow + 1}-0`);
      setRecentSelect(`${startRow + 1}-0`);
      setSelectedCells([`${startRow + 1}-0`]);
    } else if (
      (key === "Enter" || key === "ArrowDown") &&
      startRow < maxRowIndex
    ) {
      setStartSelect(`${startRow + 1}-${startCol}`);
      setRecentSelect(`${startRow + 1}-${startCol}`);
      setSelectedCells([`${startRow + 1}-${startCol}`]);
    } else if (key === "ArrowLeft" && startCol > 0) {
      setStartSelect(`${startRow}-${startCol - 1}`);
      setRecentSelect(`${startRow}-${startCol - 1}`);
      setSelectedCells([`${startRow}-${startCol - 1}`]);
    } else if (key === "ArrowUp" && startRow > 0) {
      setStartSelect(`${startRow - 1}-${startCol}`);
      setRecentSelect(`${startRow - 1}-${startCol}`);
      setSelectedCells([`${startRow - 1}-${startCol}`]);
    }
  };

  const handleKeyDown = key => {
    if (key === "Backspace" && selectedCells.length && !inputMode) {
      let updatedData = _.cloneDeep(tableData);
      selectedCells.forEach(id => {
        const rowIndex = parseInt(id.split("-")[0]);
        const colIndex = parseInt(id.split("-")[1]);
        updatedData[rowIndex][colIndex] = { value: "" };
      });
      setTableData(updatedData);
    } else if (key && !noInput.includes(key) && startSelect && !inputMode) {
      console.log(key);
      setInputMode(startSelect);
      if (!metaDown) setInputValue(key);
    } else if (key && navKeys.includes(key)) {
      setInputMode(false);
      if (inputValue) {
        handleSaveChange(startSelect, inputValue);
      }
      handleNavigation(key);
    }
  };

  const handleSaveChange = (cellId, value) => {
    const rowIndex = parseInt(cellId.split("-")[0]);
    const colIndex = parseInt(cellId.split("-")[1]);
    let updatedData = _.cloneDeep(tableDataRef.current);
    updatedData[rowIndex][colIndex] = { value };
    setTableData(updatedData);
    setInputValue("");
  };

  const handlePaste = e => {
    e.preventDefault();
    console.log("e", e);
    const clipboard = e.clipboardData.getData("text");
    const rows = clipboard.split("\n");
    let row = parseInt(startSelect.split("-")[0]);
    let col = parseInt(startSelect.split("-")[1]);
    let cells = [];
    rows.forEach(cell => {
      cells.push(cell.split("\t"));
    });
    let updatedData = _.cloneDeep(tableDataRef.current);
    cells.forEach((r, i) => {
      r.forEach((c, j) => {
        updatedData[i + row][j + col] = { value: c };
      });
    });
    console.log("upd", updatedData);
    setTableData(updatedData);
  };

  const handleChangeInput = e => setInputValue(e.target.value);

  return (
    <div className="App">
      <div>start: {startSelect}</div>
      <div>current: {currentSelect}</div>
      <div>end: {endSelect}</div>
      <div>selected: {selectedCells.join(",")}</div>

      <table cellSpacing={0} cellPadding={0} className={classes.table}>
        {showColHeaders && (
          <Header
            colCount={colCount}
            colHeaders={colHeaders}
            showRowHeaders={showRowHeaders}
            disableSelectCol={disableSelectCol}
          />
        )}
        <tbody>
          {tableData.map((row, i) => (
            <Row
              row={row}
              rowIndex={i}
              rowHeaders={rowHeaders}
              selectedCells={selectedCells}
              startSelect={startSelect}
              inputMode={inputMode}
              inputValue={inputValue}
              handleChangeInput={handleChangeInput}
              showRowHeaders={showRowHeaders}
              disableSelectRow={disableSelectRow}
              handlePaste={handlePaste}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StyledTable = withStyles(styles)(Table);

export default withStyles(styles)(StyledTable);
