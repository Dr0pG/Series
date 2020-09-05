import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import firebase from 'firebase';
import 'firebase/auth';

import { connect } from 'react-redux';

import FormRow from '../components/FormRow';

import { tryLogin } from '../actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isLoading: false,
            message: "",
            secureTextEntry: true,
            iconName: "eye",
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
            .then((user) => {
                if (user)
                    return this.props.navigation.replace("Main");

                this.setState({
                    isLoading: false,
                    message: ""
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: this.getMessageByErrorCode(error.code)
                });
            });
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
                <Text style={styles.errorMessage}>{message}</Text>
            </View>
        );
    }

    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? "eye-off" : "eye";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
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
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </FormRow>
                <FormRow last>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.containerPassword}>
                        <TextInput
                            style={[styles.input, styles.password]}
                            placeholder="******"
                            secureTextEntry={this.state.secureTextEntry}
                            value={this.state.password}
                            onChangeText={value => this.onChangeHandler("password", value)}
                        />
                        <TouchableOpacity onPress={this.onIconPress}>
                            <Icon name={this.state.iconName} size={20} />
                        </TouchableOpacity>
                    </View>
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
    },
    containerPassword: {
        flexDirection: "row",
    },
    password: {
        flex: 1,
    },
    errorMessage: {
        textAlign: "center",
        fontSize: 15,
        color: "red",
        padding: 10,
    }
});

export default connect(null, { tryLogin })(LoginPage);