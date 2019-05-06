import React from "react";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";

const styles = {
  headerCell: {
    background: "whitesmoke",
    border: "solid lightgray 1px",
    borderCollapse: "collapse",
    width: 60,
    height: 20,
    margin: 0,
    padding: 0,
    userSelect: "none",
    "&:hover": {
      cursor: "pointer"
    },
    "&:active": {
      outline: "solid gray 2px",
      outlineOffset: "-2px"
    }
  }
};

const Header = props => {
  const { classes, colCount, colHeaders } = props;
  const columns = _.range(colCount);
  return (
    <thead>
      <tr>
        <th className={classes.headerCell} />
        {columns.map((col, i) => (
          <th id={`c-${i}`} className={classes.headerCell}>
            {colHeaders[i].label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default withStyles(styles)(Header);
