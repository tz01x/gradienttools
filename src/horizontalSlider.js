import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
    root: {
        width: 200,

    },
});

export default function ContinuousSlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(30);
    const [sliderBtn, setSliderBtn] = React.useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.handelSelectedColorWidthChnage(props.itemNo, newValue);

    };
    const handelChnageOnSliderBtn = () => {
        setSliderBtn(!sliderBtn);
        props.handelSelectColorsWidthUnit(props.itemNo,!sliderBtn?"%":"px");

        
    };
    useEffect(()=>{
        setSliderBtn(props.cunit=="%"?true:false);
    },[])
    const stylebtn = {
        // border:"1px solid #232323",
        width: "18px",
        height: "21px",
        padding: "0 4px",
        transform: sliderBtn ? "translateX(-1px)" : "translateX(11px)",
        background: "white",
        position: "relative",
        top: "-1px",
    };

    useEffect(() => {
        setValue(props.cwidth)
    }, []);

    return (
        <div className={`${classes.root} horizontalSliderContainer`} >
            <Typography id="continuous-slider" gutterBottom >
                <div style={{ display: 'flex', marginTop: "4px" }}>
                    width : {value}
                    <div style={{ border: "0", width: "37px", height: "22px", background: "black", margin: "0 4px",cursor:"pointer" }} onClick={handelChnageOnSliderBtn}>
                        <div style={stylebtn} >{sliderBtn ? "%" : "px"}</div>

                    </div>
                </div>
            </Typography>
            <Slider 
            value={value} 
            onChange={handleChange} 
            aria-labelledby="continuous-slider" 
            max={sliderBtn?100:1000}
            />


        </div>
    );
}