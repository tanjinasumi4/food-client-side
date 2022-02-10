import React from 'react';
import { CircularProgress } from '@mui/material';

const CircularLoader = ({position = 'absolute', height = null}) => {

    const circularDivStyle = {
        width: '100%',
        height: height,
        position: position,
        top: '0',
        left: '0',                
    }

    const CircularProgressStyle={       
        position: 'relative',       
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
         
    }      
    return (
        <div id="circular" style={circularDivStyle}>
            <CircularProgress style={CircularProgressStyle} />
        </div>
    )
};

export default CircularLoader;