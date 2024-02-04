import classes from './Input.module.css'
import React from 'react'
const Input = React.forwardRef((props,ref) => {

  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <span onClick={props.downValue}>-</span>
      <input {...props.input} ref={ref} />
      <span onClick={props.plusValue}>+</span>
    </div>
  );
});

export default Input;
