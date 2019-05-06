import React, { useEffect, useState, useRef, useContext } from "react";
import { TableContext } from "./TableStore";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Row from "./Row";
import _ from "lodash";

const styles = {
  table: {
    borderCollapse: "collapse"
  }
};

const Table = props => {
  const [state, dispatch] = useContext(TableContext);
  const { classes, data, colHeaders } = props;
  const [tableData, setTableData] = useState(data);
  const [mouseDown, setMousedown] = useState(false);
  const [startSelect, setStartSelect] = useState("");
  const [recentSelect, setRecentSelect] = useState("");
  const [currentSelect, setCurrentSelect] = useState("");
  const [endSelect, setEndSelect] = useState("");
  const [selectedCells, setSelectedCells] = useState(["hi"]);
  const [keyDown, setKeyDown] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputMode, setInputMode] = useState("");
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
    });
    window.addEventListener("keyup", e => {
      setKeyDown(null);
    });
    window.addEventListener("dblclick", e => {
      const id = e.target.id;
      if (/^[0-9]$/.test(id.split("-")[0])) {
        const rowCol = id.split("-");
        setInputMode(id);
        setInputValue(tableData[rowCol[0]][rowCol[1]].value);
      }
    });
    window.addEventListener("click", e => {
      const identifier = e.target.id.split("-");
      if (identifier[0] === "r") selectRow(identifier[1]);
      if (identifier[0] === "c") selectCol(identifier[1]);
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

  const rowCount = props.data.length;
  const colCount = props.data[0].length;
  const maxRowIndex = props.data.length - 1;
  const maxColIndex = props.data[0].length - 1;

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
    const noInput = [
      "Enter",
      "Tab",
      "Shift",
      "Backspace",
      "Meta",
      "CapsLock",
      "Alt",
      "Control",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ];
    const navKeys = [
      "Tab",
      "Enter",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ];
    if (key === "Backspace" && selectedCells.length && !inputMode) {
      selectedCells.forEach(id => {
        document.getElementById(id).innerHTML = "";
      });
    } else if (key && !noInput.includes(key) && startSelect && !inputMode) {
      setInputMode(startSelect);
      setInputValue(key);
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
    let newData = _.cloneDeep(tableData);
    newData[rowIndex][colIndex] = { value };
    setTableData(newData);
    setInputValue("");
  };

  const handleChangeInput = e => setInputValue(e.target.value);

  return (
    <div className="App">
      <div>start: {startSelect}</div>
      <div>current: {currentSelect}</div>
      <div>end: {endSelect}</div>
      <div>selected: {selectedCells.join(",")}</div>

      <table cellSpacing={0} cellPadding={0} className={classes.table}>
        <Header colCount={colCount} colHeaders={colHeaders} />
        <tbody>
          {tableData.map((row, i) => (
            <Row
              row={row}
              rowIndex={i}
              selectedCells={selectedCells}
              startSelect={startSelect}
              inputMode={inputMode}
              inputValue={inputValue}
              handleChangeInput={handleChangeInput}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StyledTable = withStyles(styles)(Table);

export default withStyles(styles)(StyledTable);
