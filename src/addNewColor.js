import React from "react";

export default function AddNewColor(props) {
  return (
    <div
      className="colorPriview"
      style={{
        background: "white",
        fontSize: "20px",
        cursor: "pointer",
        textAlign: "center"
      }}
      onClick={props.handeladdNewColor}
    >
      +
    </div>
  );
}
