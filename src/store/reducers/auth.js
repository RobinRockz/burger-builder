import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};


const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.AUTH_START:
            return onAuthStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return onAuthSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return onAuthFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return onLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT:
            return setAuthRedirectPath(state, action);
        case actionTypes.AUTH_CHECK_SUCCESS: 
            return onCheckAuthSuccess(state, action);
        default:
            return state;
    }

}

function onAuthStart(state, action) {
    return {
        ...state,
        error: null,
        loading: true
    }
}

function onAuthSuccess(state, action) {
    return {
        ...state,
        token: action.idToken,
        userId: action.localId,
        error: null,
        loading: false
    }
}

function onAuthFail(state, action) {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}

function onLogout(state, action) {
    return {
        ...state,
        token: null,
        userId: null
    }
}

function onCheckAuthSuccess(state, action) {
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    }
}

function setAuthRedirectPath(state, action) {
    return {
        ...state,
        authRedirectPath: action.path
    };
}

export default reducer;