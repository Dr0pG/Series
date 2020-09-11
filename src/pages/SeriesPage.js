import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';

import SerieCard from '../components/SerieCard';
import AddSerieCard from '../components/AddSerieCard';

import { watchSeries } from '../actions';

import { isEven } from '../util/';

class SeriesPage extends React.Component {

    componentDidMount(){
        this.props.watchSeries();
    }

    render() {
        const { series, navigation } = this.props;
        if(series === null){
            return <ActivityIndicator />
        }

        return (
            <View>
                <FlatList
                    data={[...series, { isLast: true }]}
                    renderItem={({ item, index }) => (
                        item.isLast
                            ? <View style={styles.container}>
                                <AddSerieCard
                                    isFirstColumn={isEven(index)}
                                    onNavigate={() => navigation.navigate("SerieForm")}
                                />
                            </View>
                            : <View style={styles.container}>
                                <SerieCard
                                    serie={item}
                                    isFirstColumn={isEven(index)}
                                    onNavigate={() => (
                                        navigation.navigate("SerieDetail", { serie: item }
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
    }
};

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

const mapStateToProps = (state) => {
    const { series } = state;

    if(series === null){
        return { series }
    }


    const keys = Object.keys(series);
    const seriesWithKeys = keys.map((id) => {
        return {...series[id], id }
    })
    return { series: seriesWithKeys };
}

export default connect(mapStateToProps, { watchSeries })(SeriesPage);