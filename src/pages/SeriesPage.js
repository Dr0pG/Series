import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class SeriesPage extends React.Component {
    render() {
        const { user } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <Text style={[styles.title]}>Bem vindo</Text>
                <Text style={[styles.title, styles.titleNick]}>{user.user.email}</Text>
                <View style={styles.body}>
                    <Text>Hi</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 25,
    },
    titleNick: {
        fontWeight: "bold",
        paddingBottom: 10,
    },
    body: {
        backgroundColor: "#ABDAFC",
    }
})