import React, { useState, useEffect } from "react";

function useListeners(props) {
  const [mouseDown, setMouseDown] = useState(false);
  const [keyDown, setKeyDown] = useState(false);
  const [keyName, setKeyName] = useState(null);
  const [target, setTarget] = useState([null, null]);
  const [inputMode, setInputMode] = useState(false);
  const [activeInput, setActiveInput] = useState([null, null]);
  const [currentCell, setCurrentCell] = useState([null, null]);
  const [startCell, setStartCell] = useState([null, null]);
  const [endCell, setEndCell] = useState([null, null]);
  const [selectedCells, setSelectedCells] = useState([]);
  useEffect(() => {
    window.addEventListener("mousedown", e => {
      handleMousedown(e);
    });
    window.addEventListener("mouseup", e => {
      handleMouseup(e);
    });
    window.addEventListener("keydown", e => {
      handleKeydown(e);
    });
    window.addEventListener("keyup", e => {
      handleKeyup(e);
    });
    window.addEventListener("click", e => {
      handleClick(e);
    });
    window.addEventListener("dblclick", e => {
      handleDblClick(e);
    });
    window.addEventListener("mouseover", e => {
      handleMouseover(e);
    });
  }, []);
  useEffect(() => {
    calcSelectedCells(startCell, currentCell, endCell);
  }, [startCell, currentCell, endCell]);

  const calcSelectedCells = (startCell, currentCell, endCell) => {
    const finalCell = endCell && endCell.length ? endCell : currentCell;
    if (!startCell) return setSelectedCells([]);
    if (startCell && finalCell) {
      const startRow = parseInt(startCell[0]);
      const startCol = parseInt(startCell[1]);
      const finalRow = parseInt(finalCell[0]);
      const finalCol = parseInt(finalCell[1]);
      if (startCell === finalCell) {
        return setSelectedCells([startCell]);
      } else if (mouseDown) {
        const colSpan = Math.abs(finalCol - startCol);
        const rowSpan = Math.abs(finalRow - startRow);
        let selected = [];
        for (let j = 0; j <= rowSpan; j++) {
          for (let i = 0; i <= colSpan; i++) {
            if (startRow < finalRow) {
              if (startCol < finalCol) {
                selected.push([startRow + j, startCol + i]);
              } else {
                selected.push([startRow + j, finalCol + i]);
              }
            } else {
              if (startCol < finalCol) {
                selected.push([finalRow + j, startCol + i]);
              } else {
                selected.push([finalRow + j, finalCol + i]);
              }
            }
          }
        }
        return setSelectedCells(selected);
      }
    }
  };

  const handleMousedown = e => {
    setMouseDown(true);
    const rowIndex = e.target.getAttribute("rowIndex");
    const colIndex = e.target.getAttribute("colIndex");
    if (rowIndex) return setStartCell([rowIndex, colIndex]);
    return setStartCell(null);
  };
  const handleMouseup = e => {
    setMouseDown(false);
    const rowIndex = e.target.getAttribute("rowIndex");
    const colIndex = e.target.getAttribute("colIndex");
    if (rowIndex) setEndCell([rowIndex, colIndex]);
  };
  const handleMouseover = e => {
    const rowIndex = e.target.getAttribute("rowIndex");
    const colIndex = e.target.getAttribute("colIndex");
    if (rowIndex) setCurrentCell([rowIndex, colIndex]);
  };
  const handleKeydown = e => {
    setKeyDown(true);
    setKeyName(e.key);
  };
  const handleKeyup = e => {
    setKeyDown(false);
  };
  const handleClick = e => {
    const rowIndex = e.target.getAttribute("rowIndex");
    const colIndex = e.target.getAttribute("colIndex");
    if (rowIndex) return setTarget([rowIndex, colIndex]);
    setInputMode(false);
  };
  const handleDblClick = e => {
    const rowIndex = e.target.getAttribute("rowIndex");
    const colIndex = e.target.getAttribute("colIndex");
    if (rowIndex) {
      setInputMode(true);
      setActiveInput([rowIndex, colIndex]);
    }
  };

  return {
    mouseDown,
    keyDown,
    keyName,
    target,
    inputMode,
    activeInput,
    currentCell,
    startCell,
    endCell
  };
}

export default useListeners;
