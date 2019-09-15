import React, { useRef, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  input: {
    // boxSizing: "content-box",
    // width: "90%",
    // height: "100%"
    border: "none",
    outline: "none",
    backgroundImage: "none",
    backgroundColor: "transparent",
    webkitBoxShadow: "none",
    mozBoxShadow: "none",
    boxShadow: "none",
    padding: 0,
    margin: 0
    //width: 20
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
      style={{ width: inputValue.length * 7 }}
      type="text"
      ref={inputRef}
      className={classes.input}
      value={inputValue}
      onChange={handleChangeInput}
    />
  );
};

export default withStyles(styles)(InputCell);
