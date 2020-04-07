import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, AsyncStorage} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {AsyncStorage} from 'react-native';

//Authorization related
import * as AuthSession from 'expo-auth-session';
import * as AppAuth from 'expo-app-auth';

//Server calls
import axios from 'axios'

//Authorization scope
const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
    'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
    'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
const scopes = scopesArr.join(' ');

const getSpotifyCredentials = async () => {
    const res = await axios.get('/spotifyCredentials');
    const spotifyCredentials = res.data;
    return spotifyCredentials;
}

const getAuthorizationCode = async () => {
    try {
        const credentials = await getSpotifyCredentials() //we wrote this function above
        const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
        const result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                credentials.clientId +
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                '&redirect_uri=' +
                encodeURIComponent(redirectUrl),
        })
    } catch (err) {
        console.error(err)
    }
    return result.params.code
}

const setUserData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(error.message);
    }
};

const getTokens = async () => {
    try {
        const authorizationCode = await getAuthorizationCode() //we wrote this function above
        const credentials = await getSpotifyCredentials() //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
                credentials.redirectUri
            }`,
        });
        const responseJson = await response.json();
        // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
        const {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
        } = responseJson;

        const expirationTime = new Date().getTime() + expiresIn * 1000;
        await setUserData('accessToken', accessToken);
        await setUserData('refreshToken', refreshToken);
        await setUserData('expirationTime', expirationTime);
    } catch (err) {
        console.error(err);
    }
}

export const refreshTokens = async () => {
    try {
        const credentials = await getSpotifyCredentials() //we wrote this function above
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const refreshToken = await getUserData('refreshToken');
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const responseJson = await response.json();
        if (responseJson.error) {
            await getTokens();
        } else {
            const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = responseJson;

            const expirationTime = new Date().getTime() + expiresIn * 1000;
            await setUserData('accessToken', newAccessToken);
            if (newRefreshToken) {
                await setUserData('refreshToken', newRefreshToken);
            }
            await setUserData('expirationTime', expirationTime);
        }
    } catch (err) {
        console.error(err)
    }
}

export default function AuthorizeButton() {
    const [result, setResult] = React.useState(null);

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={handlePressAsync}>
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



