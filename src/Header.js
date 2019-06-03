import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import _ from "lodash";

const styles = {
  headerCell: {
    background: "linear-gradient(rgb(245, 244, 244), whitesmoke)",
    border: "solid lightgray 1px",
    borderCollapse: "collapse",
    width: 60,
    height: 20,
    margin: 0,
    padding: 0,
    fontSize: 12,
    userSelect: "none",
    "&:hover": {
      cursor: "pointer"
    },
    "&:active": {
      outline: "solid gray 2px",
      outlineOffset: "-2px"
    }
  },
  inactiveHeader: {
    background: "linear-gradient(rgb(245, 244, 244), whitesmoke)",
    border: "solid lightgray 1px",
    borderCollapse: "collapse",
    width: 60,
    height: 20,
    margin: 0,
    padding: 0,
    fontSize: 12,
    userSelect: "none"
  }
};

const Header = props => {
  const {
    classes,
    colCount,
    colHeaders,
    showRowHeaders,
    disableSelectCol
  } = props;
  const columns = _.range(colCount);
  return (
    <thead>
      <tr>
        {showRowHeaders && <th className={classes.inactiveHeader} />}
        {columns.map((col, i) => (
          <th
            key={`c-${i}`}
            id={`c-${i}`}
            className={classNames(
              !disableSelectCol ? classes.headerCell : classes.inactiveHeader
            )}
          >
            {colHeaders[i].label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default withStyles(styles)(Header);
