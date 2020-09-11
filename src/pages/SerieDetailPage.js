import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Button,
} from 'react-native';

import Line from '../components/Line';
import LongText from '../components/LongText';

class SerieDetailPage extends React.Component {
    render() {
        const { navigation } = this.props;
        const { serie } = navigation.state.params;

        return (
            <ScrollView style={styles.container}>
                <View style={serie.img ? styles.containerImage : null}>
                    {
                        serie.img
                            ? <Image source={{
                                uri: serie.img
                            }}
                                style={styles.image}
                            />
                            : null
                    }
                </View>
                <View style={styles.containerInfo}>
                    <Line label="Gender" content={serie.gender} />
                    <Line label="Rate" content={serie.rate} />
                    <LongText label="Description" content={serie.description} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Edit" style={styles.editButton} onPress={() => {
                        navigation.replace("SerieForm", { serieToEdit: serie });
                    }} />
                    <Button title="Delete" style={styles.deleteButton} onPress={() => {

                    }} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    containerImage: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 25,
    },
    image: {
        aspectRatio: 1,
        resizeMode: "cover",
        width: "80%",
    },
    containerInfo: {

        padding: 5,

        /*borderWidth: 1,
        borderColor: "black",
        flexDirection: "column",
        alignItems: "center",*/
    },
    buttonContainer: {
        paddingTop: 5,
        paddingBottom: 5
    }
});

export default SerieDetailPage;

