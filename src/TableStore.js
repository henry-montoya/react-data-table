import React, { createContext, Fragment, useReducer } from "react";

export const TableContext = createContext({});

const initialState = {
  data: [],
  mouseDown: false,
  keyDown: null,
  startCell: "",
  currentCell: "",
  endCell: "",
  selectedCells: [],
  inputValue: "",
  inputMode: false
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOUSEDOWN":
      return { mouseDown: action.value };
    case "SET_INPUT_MODE":
      return { inputMode: action.value };
    case "SET_INPUT_VALUE":
      return { inputValue: action.value };
    case "SET_KEYDOWN":
      return { keyDown: action.value };
    default:
      return state;
  }
};

const TableStore = ({ children }) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);
  return (
    <TableContext.Provider value={[state, dispatch]}>
      {children}
    </TableContext.Provider>
  );
};

export default TableStore;
