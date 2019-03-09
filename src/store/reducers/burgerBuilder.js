import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 20,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 20.78,
    cheese: 23.54,
    meat: 57.15,
    bacon: 45.30
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: 
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: 
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return fetchIngredient(state, action);
        default:
            return state;
    }
};

function addIngredient(state, action) {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.value.ingredientName]: state.ingredients[action.value.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.value.ingredientName],
        building: true
    };
}

function removeIngredient(state, action) {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.value.ingredientName]: state.ingredients[action.value.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.value.ingredientName],
        building: true

    };
}

function setIngredient(state, action) {
    return {
        ...state,
        ingredients: {
            salad: action.value.salad,
            bacon: action.value.bacon,
            cheese: action.value.cheese,
            meat: action.value.meat
        },
        totalPrice: 20,
        error: false,
        building:false

    };
}

function fetchIngredient(state, action) {
    return {
        ...state,
        error: true
    };
}

export default reducer;