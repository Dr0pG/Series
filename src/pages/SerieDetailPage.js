import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';

import Line from '../components/Line';
import LongText from '../components/LongText';

class SerieDetailPage extends React.Component {
    render() {
        const { serie } = this.props.navigation.state.params;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerImage}>
                    <Image source={{
                        uri: serie.img
                    }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.containerInfo}>
                    <Line label="Gender" content={serie.gender} />
                    <Line label="Rate" content={serie.rate} />
                    <LongText label="Description" content={serie.description} />
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
    }
});

export default SerieDetailPage;

