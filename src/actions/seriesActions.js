import firebase from '@firebase/app';
import 'firebase/auth';
import "@firebase/database";

import { Alert } from 'react-native';

export const SET_SERIES = 'SET_SERIES';
const setSeries = (series) => ({
    type: SET_SERIES,
    series,
});

export const watchSeries = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/series`)
            .on('value', snapshot => {
                const series = snapshot.val();
                const action = setSeries(series);
                dispatch(action);
            });
    }
}

export const deleteSerie = (serie) => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert("Delete Serie", `Do you want to delete ${serie.title}`,
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                            resolve(false);
                        },
                        style: "cancel", //IOS
                    },
                    {
                        text: "Yes",
                        onPress: async () => {
                            const { currentUser } = firebase.auth();
                            try {
                                await firebase
                                    .database()
                                    .ref(`/users/${currentUser.uid}/series/${serie.id}`)
                                    .remove();
                                resolve(true);
                            } catch (error) {
                                reject(error);
                            }
                        }
                    }
                ],
                { cancelable: false })
        })
    }
}