import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, AsyncStorage} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

//Authorization related
import * as AppAuth from 'expo-app-auth';

export default function AuthorizeButton() {
    let [authState, setAuthState] = useState(null);

    useEffect(() => {
        (async () => {
            let cachedAuth = await getCachedAuthAsync();
            if (cachedAuth && !authState) {
                setAuthState(cachedAuth);
            }
        })();
    }, []);

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={async () => {
                const _authState = await signInAsync();
                setAuthState(_authState);
            }}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome size={32} style={{color: 'white'}} name={'spotify'}/>
                    <Text style={styles.text}>Connect with Spotify</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        button: {
            backgroundColor: '#1DB954',
            borderRadius: 50,
            margin: 40,
            padding: 15,
        },
        text: {
            color: 'white',
            paddingTop: 7,
            marginLeft: 7,
            fontFamily: 'Avenir'
        }
    }
);

let config = {
    clientId: '<client_id>', // available on the app page
    clientSecret: '<client_secret>', // click "show client secret" to see this
    redirectUrl: 'com.myapp:/oauth', // the redirect you defined after creating the app
    scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
    serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
};

let StorageKey = '@openCircle:CustomSpotifyOAuthKey';

export async function signInAsync() {
    let authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
    console.log('signInAsync', authState);
    return authState;
}

async function cacheAuthAsync(authState) {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);
    console.log('getCachedAuthAsync', authState);
    if (authState) {
        if (checkIfTokenExpired(authState)) {
            return refreshAuthAsync(authState);
        } else {
            return authState;
        }
    }
    return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log('refreshAuth', authState);
    await cacheAuthAsync(authState);
    return authState;
}