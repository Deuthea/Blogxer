import React from "react";

const Button = (props) => {
  return (
    <button className={`${props.class} px-2 py-2 rounded-md`}>
      {props.children}
    </button>
  );
};

export default Button;
