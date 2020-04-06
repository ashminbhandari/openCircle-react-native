import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, AsyncStorage} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

//Authorization related
import * as AppAuth from 'expo-app-auth';
import config from './authConfig';

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

