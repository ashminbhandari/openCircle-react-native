import React, {useState, useEffect} from 'react';
import Button from '../../components/UIElements/Button';
import {observer} from 'mobx-react';
import AuthorizationService from '../../services/AuthorizationService';
import CreatePasswordScreen from "../CreatePasswordScreen/CreatePasswordScreen";
import {View, StyleSheet, Text} from "react-native";
import AsyncStorage from '../../storage/AsyncStorage';
import {FontAwesome} from "@expo/vector-icons";

const AuthorizeSpotifyScreen = observer((props) => {
    const [authCode, setAuthCode] = useState(null);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        //Check if there is already a user for this device
        async function getUser() {
            let user = await AsyncStorage.getFromAsyncStorage('user');
            if (user) {
                setUser(user);
            }
        };
        getUser();
    }, [user]);


    //Gets the authorization code
    async function getAuthCode() {
        try {
            let code = await AuthorizationService.getAuthorizationCode();
            setAuthCode(code);
            console.log("Code received as..", code);
        } catch (error) {
            console.log("Error getting/setting auth code in LandingPage.js");
            setError(true);
        }
    }

    return (
        <View>
            {
                user ? (
                    <View style={{
                        marginTop: 40,
                        alignSelf: 'center'
                    }}>
                        <FontAwesome
                            name={'check-circle'}
                            color={'green'}
                            size={40}
                            style={{
                                alignSelf:'center'
                            }}
                        />
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            marginTop: 10
                        }}>
                            Spotify is registered
                        </Text>
                    </View>
                ) : (
                    authCode ? (
                        <CreatePasswordScreen authCode={authCode}/>
                    ) : (
                        <View style={styles.connectButtonAddedStyles}>
                            <Button
                                text={'Connect with Spotify'}
                                faName='spotify'
                                faColor='#1DB954'
                                onPress={getAuthCode}
                                error={error}
                            />
                        </View>
                    )
                )
            }
        </View>
    );
});

const styles = StyleSheet.create({
    plugButton: {
        marginTop: 30,
        borderRadius: 100,
        width: 50,
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        alignSelf: 'center',
    },
    plugButtonIcon: {
        color: 'white',
        alignSelf: 'center',
    },
    connectButtonAddedStyles: {
        marginTop: 40
    }
});

export default AuthorizeSpotifyScreen;
