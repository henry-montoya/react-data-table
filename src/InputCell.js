import React, { useRef, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  input: {
    boxSizing: "content-box",
    width: "90%",
    height: "100%"
  }
};

const InputCell = props => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const { classes, inputValue, handleChangeInput } = props;
  return (
    <input
      type="text"
      ref={inputRef}
      className={classes.input}
      value={inputValue}
      onChange={handleChangeInput}
    />
  );
};

export default withStyles(styles)(InputCell);
