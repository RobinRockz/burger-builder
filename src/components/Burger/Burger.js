import React from 'react';
import './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    /*
        const burgerIngredients = [];

        for(let ingredient in props.ingredients) {

            let burgerIngredient = <BurgerIngredient type={ingredient} />;

            for(let i=0; i< props.ingredients[ingredient]; i++) {
                burgerIngredients.push(burgerIngredient);
            }
        }
    */

    let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, index) => {
            return <BurgerIngredient key={igKey + index} type={igKey} />;
        });
    })
    .reduce((prev, current) => {
        return prev.concat(current);
    }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>please start adding ingredients...</p>;
    }

    return(
        <div className='Burger'>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;