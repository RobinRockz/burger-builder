import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className='BuildControls'>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((control) => (
            <BuildControl 
                key={control.label} 
                label={control.label}
                added={()=>props.ingredientAdded({ingredientName: control.type})}
                removed={()=>props.ingredientRemoved({ingredientName: control.type})}
                disabled={props.disabled[control.type]} />
        ))}
        <button 
            disabled={!props.purchasable} 
            className='OrderButton'
            onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>
    </div>
);

export default buildControls;