import React from "react";

import ColorPicker from "./colorpicker";

export default function ColorPreview(props) {
  const [showbtn, setShowbtn] = React.useState(false);
  const [showRemoveBtn, setShowRemoveBtn] = React.useState(false);
  let [bgColor, setbgColor] = React.useState({
    background: props.color ? props.color : "red"
  });
  // React.useEffect(()=>{
  //   return ()=>{
  //     setbgColor({background:'red'});
  //   }
  // })
  const handelBGColor = clolorASstirng => {
    setbgColor({ background: clolorASstirng });
    props.handelGradientColorChange(props.itemNo, clolorASstirng);
    // console.log(clolorASstirng);
  };
  const handelColorPickerPriview = () => {
    setShowbtn(false);
  };
  return (
    <div
      onMouseEnter={() => {
        setShowRemoveBtn(true);
      }}
      onMouseLeave={() => {
        setShowRemoveBtn(false);
      }}
    >
      <div
        className="colorPriview"
        style={bgColor}
        onClick={() => setShowbtn(true)}
      >
        {showbtn ? (
          <ColorPicker
            handelBGColor={handelBGColor}
            handelColorPickerPriview={handelColorPickerPriview}
          />
        ) : null}
      </div>
      {showRemoveBtn ? (
        <div className="color-remove">
          <button
            style={{
              color: "red",
              // background:"red",
              border: "0",
              borderRadius: "10px",
              outlineWidth: "0px",
              height: "25px"
            }}
            onClick={() => {
              props.handelRemoveColor(props.itemNo);
            }}
          >
            r
          </button>
          <div />{" "}
          <button
            style={{
              // background:"red",
              border: "0",
              borderRadius: "10px",
              outlineWidth: "0px",
              height: "25px"
            }}
            onClick={() => {
              setShowRemoveBtn(false);
            }}
          >
            c
          </button>
        </div>
      ) : null}
    </div>
  );
}
