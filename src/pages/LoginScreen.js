import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';

import firebase from 'firebase';
import 'firebase/auth';

import { connect } from 'react-redux';

import FormRow from '../components/FormRow';

import { tryLogin } from '../actions';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isLoading: false,
            message: "",
        }
    }

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyCSwBnWESAc0HI3aryEqtkxeyGHNdkYfHg",
            authDomain: "series-77499.firebaseapp.com",
            databaseURL: "https://series-77499.firebaseio.com",
            projectId: "series-77499",
            storageBucket: "series-77499.appspot.com",
            messagingSenderId: "424897210477",
            appId: "1:424897210477:web:6bc52cefc16a4811cef764",
            measurementId: "G-XCXHR4QQWC"
        };

        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
    }

    onChangeHandler(field, value) {
        /*const newState = {};
        newState[field] = value;
        this.setState(newState);*/

        this.setState({
            [field]: value
        });
    }

    tryLogin() {
        this.setState({ isLoading: true, message: "" });
        const { email, password } = this.state

        this.props.tryLogin({ email, password })
            .then(() => {
                this.setState({ message: "Sucesso!" });
                this.props.navigation.replace("Main");
            })
        
    }

    getMessageByErrorCode(errorCode) {
        /*  
        Login
            auth/invalid-email
            auth/user-not-found
            auth/wrong-password

        Register
            auth/email-already-in-use
            auth/invalid-email
            auth/operation-not-allowed
            auth/weak-password
        */
        switch (errorCode) {
            case "auth/invalid-email":
                return "Invalid Email";
            case "auth/user-not-found":
                return "User not found";
            case "auth/wrong-password":
                return "Wrong Password";
            case "auth/email-already-in-use":
                return "Email already in use";
            case "auth/operation-not-allowed":
                return "Operation not allowed";
            case "auth/weak-password":
                return "Password should be at least 6 characters";
            default:
                return "Not found";
        }
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />;

        return (
            <Button
                title="Login"
                onPress={() => this.tryLogin()}
            />
        );
    }

    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;
        return (
            <View>
                <Text>{message}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FormRow first>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="user@mail.com"
                        value={this.state.email}
                        onChangeText={value => this.onChangeHandler("email", value)}
                    />
                </FormRow>
                <FormRow last>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler("password", value)}
                    />
                </FormRow>
                {this.renderButton()}
                {this.renderMessage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    label: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});

export default connect(null, { tryLogin })(LoginPage);