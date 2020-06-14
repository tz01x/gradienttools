import React from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled, { keyframes } from "styled-components";

import Button from "@material-ui/core/Button";

import ColorPreview from "./colorPreview";

import { TextField } from "@material-ui/core";

// import form src
import AddNewColor from "./addNewColor";

const useStyles = makeStyles({
  root: {
    width: 200
  }
});

export default function App() {
  const classes = useStyles();

  //initial value
  const [gradDirection, updateDirection] = React.useState("to right");
  const [backgrountImg, updatebgImg] = React.useState(
    `linear-gradient(${gradDirection}, blue ,pink)`
  );
  const [selectedColor, setSelectedColor] = React.useState(["blue", "pink"]); //initial colors

  const [value, setValue] = React.useState(30);

  const handelSliderValueChange = (event, newValue) => {
    setValue(newValue);
  };

  const hendeldirectionChnage = event => {
    updateDirection(event.target.value);
    // updatebgImg(`linear-gradient(${event.target.value} , ${selectedColor})`);
  };
  const handelGradientColorChange = (i, color) => {
    // gradDirection
    const newcolors = [...selectedColor];

    for (let index = 0; index < selectedColor.length; index++) {
      if (i === index) {
        newcolors[i] = color;
      }
    }
    setSelectedColor([...newcolors]);

    // let text = `linear-gradient(${gradDirection},${selectedColor.join(",")})`;
    // updatebgImg(text);
    // console.log(text);
  };

  const handeladdNewColor = () => {
    setSelectedColor([...selectedColor, "red"]);
  };
  const handelRemoveColor = i => {
    console.log(i);

    const newcolors = [];
    for (let index = 0; index < selectedColor.length; index++) {
      if (i !== index) {
        newcolors.push(selectedColor[index]);
      }
    }
    console.log(newcolors);

    setSelectedColor([...newcolors]);
    console.log(selectedColor);
    
  };

  const handelRemoveAllColor = () => {
    setSelectedColor([]);
  };
 

  React.useEffect(() => {
    updatebgImg(
      `linear-gradient(${gradDirection}, ${selectedColor.join(",")})`
    );

    


  }, [gradDirection, selectedColor]);

  const boxkeyframe = keyframes`
  
    0%{
      background-position: 0%;
    }
    100%{
      background-position: 100%;
    }
  
`;
  const Box = styled.div`
    height: 10vh;
    background-image: ${backgrountImg};
    /* background-size: 400% 100%; */
    margin: auto;
    width: 60%;
    /* animation: ${boxkeyframe} 2s infinite alternate; */
    /* animation-play-state: paused; */
  `;

  return (
    <div className="App">
      <h1>Gradiendt Tool </h1>

      {/* <div className=""  style={pStyle}>this is box</div> */}
      <Box />

      <TextField
        label="Gradient direction"
        onChange={hendeldirectionChnage}
        value={gradDirection}
      />

      <div className="color-viewer">
      
        {selectedColor.map((value,index)=>{
         return <div className="color-viewer-item" key={index}>
          <ColorPreview
            color={value} //initial color
            itemNo={index}
            handelRemoveColor={handelRemoveColor}
            handelGradientColorChange={handelGradientColorChange}
          />

          {/* key dont actualy set a value so you cant find in props.key */}
        </div>;
        })}
        

        <div className="color-viewer-item">
          <AddNewColor handeladdNewColor={handeladdNewColor} />
        </div>
      </div>
      <div className={classes.root}>
        <Typography id="continuous-slider" gutterBottom>
          {/* Volume */}
        </Typography>
        <Grid container spacing={2}>
          <Grid item />
          <Grid item xs>
            <Slider
              value={value}
              onChange={handelSliderValueChange}
              aria-labelledby="continuous-slider"
              max={500}
            />
          </Grid>
          <Grid item />
        </Grid>
        <div>value is {value} px</div>
        <div />
      </div>
      <button onClick={handelRemoveAllColor}>remove all</button>
      {/* <Bar onClick={()=>alert("whats upp")}  className="">I pulse</Bar> */}
    </div>
  );
}
