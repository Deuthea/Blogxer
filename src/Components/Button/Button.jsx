import React from "react";

const Button = (props) => {
  return (
    <button type="button" className={`${props.class} px-3 py-2 rounded-md`}>
      {props.children}
    </button>
  );
};

export default Button;
