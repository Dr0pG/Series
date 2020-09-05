import firebase from 'firebase';
import 'firebase/auth';

import { Alert } from 'react-native';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = (user) => ({
    type: USER_LOGIN_SUCCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT
});

/*
const outraFuncao = fakeTryLogin(user);
outraFuncao(store.dispatch) //redux-thunk

function fakeTryLogin({ email, password }){
    return function(dispatch) {
        ...
    }
}
*/
export const tryLogin = ({ email, password }) => (dispatch) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            const action = userLoginSuccess(user);
            dispatch(action);
            return user;
        })
        .catch(error => {
            if (error.code === "auth/user-not-found") {
                return new Promise((resolve, reject) => {
                    Alert.alert(
                        "User not found",
                        "Do you want to create an account with those informations?",
                        [
                            {
                                text: "Cancel",
                                onPress: () => resolve(),
                                style: "cancel", //IOS
                            },
                            {
                                text: "Yes",
                                onPress: () => {
                                    firebase
                                        .auth()
                                        .createUserWithEmailAndPassword(email, password)
                                        .then(resolve)
                                        .catch(reject)
                                }
                            }
                        ],
                        { cancelable: false }
                    )
                })
            }
            return new Promise.reject(error);
        })
}