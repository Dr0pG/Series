import React, { isValidElement } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';

import SerieCard from '../components/SerieCard';

import series from '../../series.json';

import { isEven } from '../util/';

const SeriesPage = (props) => (
    <View>
        <FlatList
            data={series}
            renderItem={({ item, index }) => (
                    <View style={styles.container}>
                        <SerieCard 
                            serie={item} 
                            isFirstColumn={isEven(index)}
                        />
                    </View>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            ListHeaderComponent={(props) => (
                <View style={styles.paddingTop} />
            )}
            ListFooterComponent={(props) => (
                <View style={styles.paddingBottom} />
            )}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: .5
    },
    paddingTop: {
        paddingTop: 5,
    },
    paddingBottom: {
        paddingBottom: 5,
    }
})

export default SeriesPage;