import React from "react";
import TableStore from "./TableStore";
import DataTable from "./DataTable";

const data = [
  [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
  [{ value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }],
  [{ value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }]
];

const colHeaders = [
  {
    label: "Taco Bell"
  },
  {
    label: "KFC"
  },
  {
    label: "ChickFilA"
  },
  {
    label: "Pizza Hut"
  },
  {
    label: "Popeyes"
  }
];

const rowHeaders = [
  {
    label: "Fat"
  },
  {
    label: "Carbs"
  },
  {
    label: "Sodium"
  }
];

function App(props) {
  return (
    <TableStore>
      <DataTable
        data={data}
        colHeaders={colHeaders}
        rowHeaders={rowHeaders}
        showColHeaders={true}
        showRowHeaders={true}
        // disableSelectRow={true}
        // disableSelectCol={true}
      />
    </TableStore>
  );
}

export default App;
