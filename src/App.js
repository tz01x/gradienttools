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
import SimpleSelect from './select';
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
  const [gradientBackgoundSize, setGradientBackgoundSize] = React.useState(
    "400% 100%"
  );
  const [backgrountImg, updatebgImg] = React.useState(
    `linear-gradient(${gradDirection}, blue ,pink)`
  );
  const [selectedColor, setSelectedColor] = React.useState([{color:'blue',width:0,unit:'%'}, {color:'pink',width:0,unit:'%'}]); //initial colors

  const [animationDirection, setanimationDirection] = React.useState("alternate");
  const [animationPlayState, setAnimationPlayState] = React.useState("running");
  const [value, setValue] = React.useState(30);

  const handelSliderValueChange = (event, newValue) => {
    setValue(newValue);
  };

  const handelGradientBackgroundSizeChange = event => {
    setGradientBackgoundSize(event.target.value);
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
        newcolors[i].color = color;
      }
    }
    setSelectedColor([...newcolors]);

    // let text = `linear-gradient(${gradDirection},${selectedColor.join(",")})`;
    // updatebgImg(text);
    // console.log(text);
  };

  const handeladdNewColor = () => {
    setSelectedColor([...selectedColor, {color:'red',width:0,unit:'%'}]);
  };
  
  const handelRemoveColor = i => {
    console.log(i);

    const newcolors = [];
    for (let index = 0; index < selectedColor.length; index++) {
      if (i !== index) {
        newcolors.push(selectedColor[index]);
      }
    }
    // console.log(newcolors);

    setSelectedColor([...newcolors]);
    // console.log(selectedColor);
  };
  
  const handelSelectedColorWidthChnage=(i,w)=>{
    const newC=[...selectedColor];
    for (let index = 0; index < newC.length; index++) {
      if(index==i){
        newC[index].width=w;  //[exp] w=1
      }
    }
    setSelectedColor(newC);
  };
  const handelSelectColorsWidthUnit=(i,unit)=>{
    const newC=[...selectedColor];
    for (let index = 0; index < newC.length; index++) {
      if(index==i){
        newC[index].unit=unit;  //[exp] unit="%"
      }
    }
    setSelectedColor(newC);
  };

  const handelRemoveAllColor = () => {
    setSelectedColor([]);
  };
  const handelAnimationPlayStateChange = () => {
    if (animationPlayState === "running") {
      setAnimationPlayState("paused");
    } else {
      setAnimationPlayState("running");
    }
  };
  const handelAnimationDirectionChange=(direction)=>{
    setanimationDirection(direction);
  }
  const getSelectedColorsWithWidthAsString=()=>{
    //[example] this funciton return this : blue 0, pink 0
    let innerSting='';
    for (let index = 0; index < selectedColor.length; index++) {
      
      innerSting+=`${selectedColor[index].color} ${selectedColor[index].width==0?'':selectedColor[index].width.toString()+selectedColor[index].unit}`
      if (index!=selectedColor.length-1){innerSting+=", ";}


      
    }
    return innerSting;
  }

  React.useEffect(() => {
    updatebgImg(
      `linear-gradient(${gradDirection}, ${getSelectedColorsWithWidthAsString()})`
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

  const GradientBox = styled.div`
    height: 20vh;
    background-image: ${backgrountImg};
    background-size: ${gradientBackgoundSize};
    animation: ${boxkeyframe} 2s infinite ${animationDirection};
    animation-play-state: ${animationPlayState};
  `;

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" , margin:"2em 0" }}>Gradient Tool </h1>

     
      <GradientBox  className={'gradientBox'} />

      <div className="testfields">
        <TextField
          label="Gradient direction"
          onChange={hendeldirectionChnage}
          value={gradDirection}
        />
        <br />

        <TextField
          label="Backgorund-size"
          onChange={handelGradientBackgroundSizeChange}
          value={gradientBackgoundSize}
        />
      </div>
      <div className="container">
        <SimpleSelect 
        label={'animation-direction'} 
        options={['normal','reverse','alternate','alternate-reverse','initial','inherit']}
        defaultValue={animationDirection}
        handelAnimationDirectionChange={handelAnimationDirectionChange}

        ></SimpleSelect>
      </div>
      <br/>
      <div className="container">
        Amimation playstate :
        <span>  </span>
        <button onClick={handelAnimationPlayStateChange} style={{padding:"2px"}}>
          {animationPlayState}
        </button>
      </div>
      <br />
      <h5 className="container" style={{ textAlign: "left" }}>
        Gradient Colors
      </h5>
      <div className="color-viewer">
        {selectedColor.map((value, index) => {
          return (
            <div className="color-viewer-item" key={index}>
              <ColorPreview
                color={value.color} //initial color
                cwidth={value.width}
                cunit={value.unit}
                itemNo={index}
                handelRemoveColor={handelRemoveColor}
                handelGradientColorChange={handelGradientColorChange}
                handelSelectedColorWidthChnage={handelSelectedColorWidthChnage}
                handelSelectColorsWidthUnit={handelSelectColorsWidthUnit}
              />

              {/* key dont actualy set a value so you cant find in props.key */}
            </div>
          );
        })}

        <div className="color-viewer-item">
          <AddNewColor handeladdNewColor={handeladdNewColor} />
        </div>
        <button onClick={handelRemoveAllColor}>remove all</button>
      </div>
      <h4 className="container">Preview:</h4>
      <pre className="gradientCSS" style={{ textAlign: "left" }}>
       

        {'{'}
        <br />
        <div><span style={{ color: "#009FFF" }}> height</span>: <samp>10vh</samp>;</div>

        <div><span style={{ color: "#009FFF" }}> background-image </span>: <span style={{whiteSpace:'pre-line'}}>{backgrountImg}</span> ;</div>
        <div><span style={{ color: "#009FFF" }}> background-size </span>: <span >{gradientBackgoundSize}</span> ;</div>
        <div><span style={{ color: "#009FFF" }}> animation </span>: gradientAnimation 2s infinite {animationDirection}</div>
    
        {'}'}
        {"\n"}
 

      <div><span style={{ color: "pink" }} >@keyframes</span> gradientAnimation {"{"}</div>
      <div style={{position:"relative",left:"10px"}}>
      <div>0%{"{"}</div>
      <div><span style={{ color: "#009FFF" }}> background-position</span> : 0%;</div>
      <div>{'}'}</div>
      <div>100%{"{"}</div>
      <div><span style={{ color: "#009FFF" }}> background-position</span> : 100%;</div>
      <div>{'}'}</div>
      </div>
      <div>{'}'}</div>


      </pre>

    
    </div>
  );
}
