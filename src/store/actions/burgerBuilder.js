import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (value) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        value: value
    };
};

export const removeIngredient = (value) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        value: value
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        value: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            // console.log(response.data);
            dispatch(setIngredients(response.data));
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed());
        });
    }
};