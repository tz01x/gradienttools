// Select components are used for collecting user provided information from a list of options.

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 200,
//   },
  selectEmpty: {
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),

  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    inputFieldValue: '',
  });

  const handleChange = (event) => {
    
    setState({
        inputFieldValue: event.target.value,
    });
    props.handelAnimationDirectionChange(event.target.value)
  };
  useEffect(()=>{
     if(props.defaultValue)
        setState({inputFieldValue:props.defaultValue})

  },[])
  return (
    <div>
  {/* <FormControl className={classes.formControl}> */}
        <InputLabel id={`${props.label}-simple-select-label`}>{props.label}</InputLabel>
        <Select
          labelId={`${props.label}-simple-select-label`}
          id={`${props.label}-simple-select`}
          value={state.inputFieldValue}
          onChange={handleChange}
        >
            {props.options?
                props.options.map((stringValue,idx)=>{
                return <MenuItem value={stringValue}>{stringValue}</MenuItem>
            }):null}
        </Select>
      {/* </FormControl> */}
 
    </div>
  );
}
