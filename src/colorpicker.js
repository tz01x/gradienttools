import React, { useEffect } from "react";
import { SketchPicker } from "react-color";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default function ColorPicker(props) {
  const [state, updatestate] = React.useState({
    background: {
      r: 255,
      g: 0,
      b: 0,
      a: 1
    }
  });
  useEffect(()=>{
  updatestate({background:props.bgColor.background});
  console.log(props.bgColor.background);
  
  },[]);
  const rgbObjTostring = c => {
    return `rgba( ${c.r},${c.g},${c.b},${c.a})`;
    // rgba(255, 0, 0, 0.62);
  };
  const handleChange = color => {
    updatestate({ background: color.rgb });
    props.handelBGColor(rgbObjTostring(color.rgb));
    // console.log(color.hex);
  };
  const handleClickAway = () => {
    props.handelColorPickerPriview();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="colorPicker">
        <SketchPicker
          color={state.background}
          onChange={handleChange}
        />
      </div>
    </ClickAwayListener>
  );
}
