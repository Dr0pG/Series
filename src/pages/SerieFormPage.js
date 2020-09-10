import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
    Slider,
    ScrollView,
    Button,
    ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../components/FormRow';

import { setField, saveSerie } from '../actions';

class SerieFormPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    render() {
        const { serieForm, setField, saveSerie, navigation } = this.props;

        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <FormRow first>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Insert title"
                        value={serieForm.title}
                        onChangeText={value => setField('title', value)}
                        keyboardType="default"
                    />
                </FormRow>
                <FormRow>
                    <Text style={styles.label}>Image</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Image url"
                        value={serieForm.img}
                        onChangeText={value => setField('img', value)}
                        keyboardType="url"
                    />
                </FormRow>
                <FormRow>
                    <Text style={styles.label}>Gender</Text>
                    <Picker
                        selectedValue={serieForm.gender}
                        style={styles.picker}
                        onValueChange={(itemValue) => setField('gender', itemValue)}>

                        <Picker.Item label="Ficção Científica" value="science_fiction" />
                        <Picker.Item label="Comédia" value="comedy" />
                        <Picker.Item label="Drama" value="drama" />
                        <Picker.Item label="Ação" value="action" />
                        <Picker.Item label="Terror" value="horror" />
                    </Picker>
                </FormRow>
                <FormRow>
                    <Text style={styles.label}>Rate</Text>
                    <Slider
                        onValueChange={value => setField('rate', value)}
                        value={serieForm.rate}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                    />
                    <Text style={[styles.label, styles.textSlider]}>{serieForm.rate}</Text>
                </FormRow>
                <FormRow last>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={serieForm.description}
                        onChangeText={value => setField('description', value)}
                        keyboardType="default"
                        numberOfLines={4}
                        multiline={true}
                    />
                </FormRow>
                <View style={styles.buttonContainer}>
                    {this.state.isLoading
                        ? <ActivityIndicator />
                        : <Button
                            title="Save"
                            onPress={async () => {
                                this.setState({ isLoading: true });
                                await saveSerie(serieForm); //async
                                this.setState({ isLoading: false });
                                navigation.goBack();
                            }} />
                    }
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    label: {
        paddingLeft: 5,
        paddingRight: 5,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    picker: {

    },
    textSlider: {
        paddingTop: 5,
        textAlign: "center",
        fontSize: 15,
    },
    buttonContainer: {
        paddingTop: 10,
    }
})

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    }
}

const mapDispatchToProps = {
    setField,
    saveSerie
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);

