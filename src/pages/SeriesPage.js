import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

import SerieCard from '../components/SerieCard';
import AddSerieCard from '../components/AddSerieCard';

import series from '../../series.json';

import { isEven } from '../util/';

const SeriesPage = (props) => (
    <View>
        <FlatList
            data={[...series, { isLast: true }]}
            renderItem={({ item, index }) => (
                item.isLast
                    ? <View style={styles.container}>
                        <AddSerieCard 
                            isFirstColumn={isEven(index)}
                            onNavigate={() => props.navigation.navigate("SerieForm")}
                        />
                        </View>
                    : <View style={styles.container}>
                        <SerieCard
                            serie={item}
                            isFirstColumn={isEven(index)}
                            onNavigate={() => (
                                props.navigation.navigate("SerieDetail", { serie: item }
                                ))}
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