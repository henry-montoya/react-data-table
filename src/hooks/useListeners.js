import { useState, useEffect } from "react";
import { navKeys } from "../constants";

function useListeners(props) {
  const [mouseDown, setMouseDown] = useState(false);
  const [keyDown, setKeyDown] = useState(false);
  const [keyName, setKeyName] = useState(null);
  const [target, setTarget] = useState(null);
  const [inputMode, setInputMode] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [currentCell, setCurrentCell] = useState(null);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);
  const [selectedCells, setSelectedCells] = useState({
    startRow: null,
    startCol: null,
    finalRow: null,
    finalCol: null
  });
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
    calcSelectedCells(startCell, currentCell, endCell, mouseDown);
  }, [startCell, currentCell, endCell, mouseDown]);
  useEffect(() => {
    handleNav(keyName, startCell);
  }, [keyName]);

  const calcSelectedCells = (startCell, currentCell, endCell, mouseDown) => {
    const finalCell = mouseDown && currentCell ? currentCell : endCell;
    if (!startCell)
      return setSelectedCells({
        startRow: null,
        startCol: null,
        finalRow: null,
        finalCol: null
      });
    const startRow = startCell ? parseInt(startCell.split("-")[0]) : null;
    const startCol = startCell ? parseInt(startCell.split("-")[1]) : null;
    const finalRow = finalCell ? parseInt(finalCell.split("-")[0]) : null;
    const finalCol = finalCell ? parseInt(finalCell.split("-")[1]) : null;
    return setSelectedCells({
      startRow,
      startCol,
      finalRow,
      finalCol
    });
  };

  const handleMousedown = e => {
    setMouseDown(true);
    // const rowindex = e.target.getAttribute("rowindex");
    // const colindex = e.target.getAttribute("colindex");
    if (e.target.id) {
      setStartCell(e.target.id);
      return setEndCell(e.target.id);
    } else {
      setEndCell(null);
      return setStartCell(null);
    }
  };
  const handleMouseup = e => {
    setMouseDown(false);
    // const rowindex = e.target.getAttribute("rowindex");
    // const colindex = e.target.getAttribute("colindex");
    if (e.target.id) setEndCell(e.target.id);
  };
  const handleMouseover = e => {
    // const rowindex = e.target.getAttribute("rowindex");
    // const colindex = e.target.getAttribute("colindex");
    if (e.target.id) setCurrentCell(e.target.id);
  };
  const handleKeydown = e => {
    setKeyDown(true);
    setKeyName(e.key);
  };
  const handleKeyup = e => {
    setKeyDown(false);
    setKeyName(null);
  };
  const handleClick = e => {
    // const rowindex = e.target.getAttribute("rowindex");
    // const colindex = e.target.getAttribute("colindex");
    if (e.target.id) return setTarget(e.target.id);
    setInputMode(false);
  };
  const handleDblClick = e => {
    // const rowindex = e.target.getAttribute("rowindex");
    // const colindex = e.target.getAttribute("colindex");
    if (e.target.id) {
      setInputMode(true);
      setActiveInput(e.target.id);
    }
  };

  const handleNav = (key, start) => {
    if (!navKeys.includes(key)) return;
    const startRow = start ? parseInt(startCell.split("-")[0]) : null;
    const startCol = start ? parseInt(startCell.split("-")[1]) : null;
    if (key === "Enter") {
      setStartCell(`${startRow + 1}-${startCol}`);
      setEndCell(`${startRow + 1}-${startCol}`);
    }
    if (key === "Tab") {
      setStartCell(`${startRow}-${startCol + 1}`);
      setEndCell(`${startRow}-${startCol + 1}`);
    }
    setInputMode(false);
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
    endCell,
    selectedCells
  };
}

export default useListeners;
