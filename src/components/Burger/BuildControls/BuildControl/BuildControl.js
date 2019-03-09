import React from 'react';
import './BuildControl.css';

const buildControl = (props) => (
    <div className='BuildControl'>
        <div className='Label'>{props.label}</div>
        <button className='Less' disabled={props.disabled} onClick={props.removed}>less</button>
        <button className='More' onClick={props.added}>more</button>
    </div>
);

export default buildControl;