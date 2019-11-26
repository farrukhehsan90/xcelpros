import React from "react";
import spinner from "../../assets/spinner.gif";

const Spinner = () => {
  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <img alt="Loading..." src={spinner} style={{ width: "50%", height: "auto" }} />
    </div>
  );
};

export default Spinner;
