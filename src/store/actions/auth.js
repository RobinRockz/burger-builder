import * as actionTypes from './actionTypes';
import axios from 'axios';

const config = {
    apiKey: "AIzaSyDeiiXMAguR6rugeFJxo2X3uNBfCPVFvQo",
    authDomain: "burger-builder-65f01.firebaseapp.com",
    databaseURL: "https://burger-builder-65f01.firebaseio.com",
    projectId: "burger-builder-65f01",
    storageBucket: "burger-builder-65f01.appspot.com",
    messagingSenderId: "873477298477"
  };

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    console.log(expirationTime);
    
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + config.apiKey;

        if(isSignup)
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + config.apiKey;
        axios.post(url, authData)
            .then(response => {
                // console.log(response);
                const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));                
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
                
            });    
    };
};

export const authCheckSuccess = (authToken, userId) => {
    return {
        type: actionTypes.AUTH_CHECK_SUCCESS,
        token: authToken,
        userId: userId
    }
}

export const authCheck = () => {
    return dispatch => {
        let authToken = localStorage.getItem('token');
        if(!authToken){
            dispatch(logout());
        } else {
            let expiryDate = new Date(localStorage.getItem('expirationDate'));
            let userId = localStorage.getItem('userId');
            if( expiryDate > new Date() ) {
                dispatch(authCheckSuccess(authToken, userId));
                dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime())/1000));
            }
            else {
                dispatch(logout());
            }
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}
