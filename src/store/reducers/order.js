import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return initPurchase(state, action);
        case actionTypes.PURCHASE_BURGER_START:
        case actionTypes.FETCH_ORDERS_START:
            return startTask(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return onPurchaseSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
        case actionTypes.FETCH_ORDERS_FAIL:
            return failedTask(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return successfulFetchedOrder(state, action);
        default: 
            return state;
    }
}

function initPurchase(state, action) {
    return {
        ...state,
        purchased: false
    };
}

function startTask(state, action) {
    return {
        ...state,
        loading: true
    }
}

function onPurchaseSuccess(state, action) {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    };
}

function failedTask(state, action) {
    return {
        ...state,
        loading: false
    };
}

function successfulFetchedOrder(state, action) {
    return {
        ...state,
        orders: action.orders,
        loading: false
    };
}

export default reducer;