import React from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled, { keyframes } from "styled-components";

const useStyles = makeStyles({
  root: {
    width: 200
  }
});

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const pStyle = {
    fontSize: "100px",
    textAlign: "center",
    Animation: "rbg 2s infinite alternate",
    backgroundImage:
      "linear-gradient(to right, red 10px , white  200px , red 100px )",
    backgroundSize: "400%"
  };
  const pulse = keyframes`
  from {
    background-color: #001F3F;
  }

  to {
    background-color: #FF4136;
  }
`;
  const Bar = styled.div`
    color: #000;
    padding: 1em 0;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    position: fixed;
    bottom: "0";
    width: 100%;
    z-index: 10;
    animation: ${pulse} 1.2s ease-in-out;
    animation-iteration-count: infinite;
  `;

  const boxkeyframe = keyframes`
  
    0%{
      background-position-x: 0%;
    }
    100%{
      background-position-x: 100%;
    }
  
`;
  const Box = styled.div`
    height: 10vh;
    background-image: linear-gradient(to right, black, white, black);
    background-size: 1200% 100%;
    margin: auto;
    width: 60%;
    animation: ${boxkeyframe} 2s 30s infinite alternate;
    animation-play-state: running;
  `;

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <div className=""  style={pStyle}>this is box</div> */}
      <Box />
      <Box />
      <Box />

      <div className={classes.root}>
        <Typography id="continuous-slider" gutterBottom>
          {/* Volume */}
        </Typography>
        <Grid container spacing={2}>
          <Grid item />
          <Grid item xs>
            <Slider
              value={value}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
            />
          </Grid>
          <Grid item />
        </Grid>
        <div>value is {value} px</div>
        <div />
      </div>
      {/* <Bar onClick={()=>alert("whats upp")}  className="">I pulse</Bar> */}
    </div>
  );
}
