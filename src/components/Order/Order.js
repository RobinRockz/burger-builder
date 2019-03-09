import React from 'react';
import './Order.css';

const order = (props) => {

   const ingredients = [];

   for(let key in props.ingredients) {
        ingredients.push(
            <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'

                }} 
                key={key}>{key} : {props.ingredients[key]}</span>
        );
   }


    return (
        <div className='Order'>
            <p>Ingredients: {ingredients}</p>
            <p>Price: INR {props.price.toFixed(2)}</p>
        </div>
    );
}

export default order;