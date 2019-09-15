import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import _ from "lodash";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const styles = {
  headerCell: {
    // background: "linear-gradient(rgb(245, 244, 244), whitesmoke)",
    // border: "solid lightgray 1px",
    // borderCollapse: "collapse",
    //width: "100%",
    // height: 20,
    //margin: 0,
    //paddingRight: 0,
    // fontSize: 12,
    textAlign: "center",
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
    // background: "linear-gradient(rgb(245, 244, 244), whitesmoke)",
    // border: "solid lightgray 1px",
    // borderCollapse: "collapse",
    //width: "100%",
    // height: 20,
    //margin: 0,
    //padding: 0,
    // fontSize: 12,
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
    <TableHead>
      <TableRow>
        {showRowHeaders && (
          <th
          //className={classes.inactiveHeader}
          />
        )}
        {columns.map((col, i) => (
          <TableCell
            key={`c-${i}`}
            id={`c-${i}`}
            className={classNames(
              !disableSelectCol ? classes.headerCell : classes.inactiveHeader
            )}
          >
            {colHeaders[i].label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(Header);
