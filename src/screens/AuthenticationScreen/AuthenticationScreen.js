import React, {useState, useEffect} from 'react';
import RotatingImageComponent from '../../components/UIElements/RotatingImageComponent';
import {KeyboardAvoidingView, StyleSheet, View, Text} from 'react-native';
import AuthorizeSpotifyScreen from "../AuthorizeSpotifyScreen/AuthorizeSpotifyScreen";
import AsyncStorage from '../../storage/AsyncStorage';
import ServerConnectScreen from "../ServerConnectScreen/ServerConnectScreen";

const AuthenticationScreen = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function user() {
            let user = await AsyncStorage.getFromAsyncStorage('user');
            if (user) {
                setUser(null);
                console.log('A user has been found', user);
            }
        }
        user();
    }, [user]);


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <RotatingImageComponent imgSource={require('../../../assets/opencircle.png')}/>
            {
                user ? (
                    <ServerConnectScreen/>
                ) : (
                    <AuthorizeSpotifyScreen/>
                )
            }
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AuthenticationScreen;
