import React, {useState} from 'react';
import RotatingImageComponent from '../../components/UIElements/RotatingImageComponent';
import {KeyboardAvoidingView, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import AuthorizeSpotifyScreen from "../AuthorizeSpotifyScreen/AuthorizeSpotifyScreen";
import ServerConnectScreen from "../ServerConnectScreen/ServerConnectScreen";
import {FontAwesome} from "@expo/vector-icons";

const AuthenticationScreen = () => {
    const [isConnectingToServer, setIsConnectingToServer] = useState(false);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
                <RotatingImageComponent imgSource={require('../../../assets/opencircle.png')}/>
                {
                    isConnectingToServer ? (
                        <ServerConnectScreen/>
                    ) : (
                        <AuthorizeSpotifyScreen/>
                    )
                }
            </KeyboardAvoidingView>
                <TouchableOpacity style={styles.authNavigationButton}>
                    {
                        isConnectingToServer ? (
                            <FontAwesome
                                size={30}
                                name={'plus-circle'}
                                style={styles.authNavigationButtonIcon}
                                onPress={() => {
                                    setIsConnectingToServer(!isConnectingToServer);
                                }}
                            />
                        ) : (
                            <FontAwesome
                                size={30}
                                name={'plug'}
                                style={styles.authNavigationButtonIcon}
                                onPress={() => {
                                    setIsConnectingToServer(!isConnectingToServer);
                                }}
                            />
                        )
                    }
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    authNavigationButton: {
        padding: 20,
        position: 'absolute',
        right: 0,
        top: 20
    },
    authNavigationButtonIcon: {
        color: 'white'
    }
});

export default AuthenticationScreen;
