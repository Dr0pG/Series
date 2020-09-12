import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    Button,
} from 'react-native';

import { connect } from 'react-redux';
import { deleteSerie } from '../actions';

import Line from '../components/Line';
import LongText from '../components/LongText';

class SerieDetailPage extends React.Component {
    render() {
        const { navigation, deleteSerie } = this.props;
        const { serie } = navigation.state.params;

        return (
            <ScrollView style={styles.container}>
                <View style={serie.img64 ? styles.containerImage : null}>
                    {
                        serie.img64
                            ? <Image source={{
                                uri: `data:image/jpeg;base64,${serie.img64}`
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
                    <Button title="Edit" color="green" onPress={() => {
                        navigation.replace("SerieForm", { serieToEdit: serie });
                    }} />
                </View>
                <View style={[styles.buttonContainer, styles.buttonLast]}>
                    <Button title="Delete" color="red" onPress={async () => {
                        const hasDeleted = await deleteSerie(serie);
                        if(hasDeleted)
                            return navigation.goBack();
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
    },
    buttonLast: {
        paddingBottom: 20,
    }
});

export default connect(null, { deleteSerie })(SerieDetailPage);

