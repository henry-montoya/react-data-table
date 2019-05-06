import React from "react";
import TableStore from "./TableStore";
import Table from "./Table";

const data = [
  [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
  [{ value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }],
  [{ value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }]
];

const colHeaders = [
  {
    label: "taco bell"
  },
  {
    label: "KFC"
  },
  {
    label: "Jesus"
  },
  {
    label: "PornHub"
  },
  {
    label: "Indica"
  }
];

function App(props) {
  return (
    <TableStore>
      <Table data={data} colHeaders={colHeaders} />
    </TableStore>
  );
}

export default App;
