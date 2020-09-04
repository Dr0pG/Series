import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SeriesPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title]}>Bem vindo</Text>
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