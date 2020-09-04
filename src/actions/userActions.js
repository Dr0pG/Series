const USER_LOGIN = 'USER_LOGIN';
const userLogin = (user) => ({
    type: USER_LOGIN,
    user
});

const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT
});

export const tryLogin = ({ email, password }) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(loginUserSucess)
        .catch(error => {
            if (error.code === "auth/user-not-found") {
                Alert.alert(
                    "User not found",
                    "Do you want to create an account with those informations?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Don't want to create an account"),
                            style: "cancel", //IOS
                        },
                        {
                            text: "Yes",
                            onPress: () => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(email, password)
                                    .then(loginUserSucess)
                                    .catch(loginUserFailed)
                            }
                        }
                    ],
                    { cancelable: false }
                )
                return;
            }
            loginUserFailed(error)
        })
        .then(() => this.setState({ isLoading: false }));
}