import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../components/FormRow';

import { setField } from '../actions';

const SerieFormPage = ({ serieForm, setField })(
    <View style={styles.container}>
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
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
})

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    }
}

const mapDispatchToProps = {
    setField
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);

