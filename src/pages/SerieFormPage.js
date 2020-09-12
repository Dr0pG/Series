import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Button,
    ActivityIndicator,
    Alert,
    Image,
    Slider,
    Picker,
} from 'react-native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { connect } from 'react-redux';

import FormRow from '../components/FormRow';

import { setField, saveSerie, setWholeSerie, resetForm } from '../actions';

class SerieFormPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        const { navigation, setWholeSerie, resetForm } = this.props;
        const { params } = navigation.state;

        if (params && params.serieToEdit) {
            setWholeSerie(params.serieToEdit);
        } else {
            resetForm();
        }
    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator />
        }
        return (<Button
            title="Save"
            onPress={async () => {
                this.setState({ isLoading: true });

                try {
                    const { saveSerie, serieForm, navigation } = this.props;
                    await saveSerie(serieForm); //async
                    navigation.goBack();
                } catch (error) {
                    Alert.alert("Error", error.message);
                } finally {
                    this.setState({ isLoading: false });
                }
            }}
        />
        )
    }

    async pickImage(name) {
        if (name === "library") {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status !== "granted") {
                Alert.alert("You need to give us access to use your camera!");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                quality: .5,
                base64: true,
                allowsEditing: true,
                aspect: [1, 1]
            });

            if (!result.cancelled) {
                this.props.setField('img64', result.base64);
            }
        } else {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);

            if (status !== "granted") {
                Alert.alert("You need to give us access to use your camera!");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                quality: .5,
                base64: true,
                allowsEditing: true,
                aspect: [1, 1]
            });

            if (!result.cancelled) {
                this.props.setField('img64', result.base64);
            }
        }
    }

    /*<TextInput
                        style={styles.input}
                        placeholder="Image url"
                        value={serieForm.img}
                        onChangeText={value => setField('img', value)}
                        keyboardType="url"
                    />*/

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
                    {serieForm.img64
                        ? <Image
                            source={{
                                uri: `data:image/jpeg;base64,${serieForm.img64}`
                            }}
                            style={styles.img}
                        />
                        : null
                    }
                    <View style={styles.buttonsContainer}>
                        <View style={styles.libraryButton}>
                            <Button title="Library" onPress={() => this.pickImage("library")} />
                        </View>
                        <View style={styles.cameraButton}>
                            <Button title="Camera" onPress={() => this.pickImage("camera")} />
                        </View>
                    </View>
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
                    {this.renderButton()}
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
        paddingBottom: 20,
    },
    img: {
        aspectRatio: 1,
        width: "100%",
    },
    buttonsContainer: {
        paddingTop: 10,
        flex: 1,
        flexDirection: "row",
    },
    libraryButton: {
        flex: 2,
        paddingRight: 10,
    },
    cameraButton: {
        flex: 2,
        paddingLeft: 10,
    }
})

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    }
}

const mapDispatchToProps = {
    setField,
    saveSerie,
    setWholeSerie,
    resetForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);

