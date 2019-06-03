import React, { createContext, Fragment, useReducer } from "react";
import _ from "lodash";

export const TableContext = createContext({});

const initialState = {
  data: []
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { data: action.data };
    case "DELETE":
      return { data: handleDelete(state.data, action.selected) };
    case "UPDATE":
      return { data: handleUpdate(state.data, action.cell, action.value) };
    default:
      return state;
  }
};

const handleUpdate = (data, cell, value) => {
  const updated = _.cloneDeep(data);
  const row = cell.split("-")[0];
  const col = cell.split("-")[1];
  updated[row][col] = { value };
  return updated;
};

const handleDelete = (data, { startRow, startCol, finalRow, finalCol }) => {
  const updated = _.cloneDeep(data);
  const rowMin = Math.min(startRow, finalRow);
  const rowMax = Math.max(startRow, finalRow);
  const colMin = Math.min(startCol, finalCol);
  const colMax = Math.max(startCol, finalCol);
  const rows = rowMin === rowMax ? [rowMin] : _.range(rowMin, rowMax + 1);
  const cols = colMin === colMax ? [colMin] : _.range(colMin, colMax + 1);
  rows.forEach(r => {
    cols.forEach(c => {
      updated[r][c] = { value: "" };
    });
  });
  return updated;
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
