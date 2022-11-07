import React from "react";

const Loader = () => {
  return (
    <>
      <div
        style={{ borderTopColor: "transparent" }}
        class="w-8 h-8 border-4 mx-auto border-white rounded-full animate-spin"
      ></div>
    </>
  );
};

export default Loader;
