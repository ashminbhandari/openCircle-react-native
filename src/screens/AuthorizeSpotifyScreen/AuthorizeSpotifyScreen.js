import React, {useState} from 'react';
import Button from '../../components/UIElements/Button';
import {observer} from 'mobx-react';
import AuthorizationService from '../../services/AuthorizationService';
import CreatePasswordScreen from "../CreatePasswordScreen/CreatePasswordScreen";
import {TouchableOpacity, View, StyleSheet, Text} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

const AuthorizeSpotifyScreen = observer(() => {
    const [authCode, setAuthCode] = useState(null);
    const [error, setError] = useState(false);

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
            }
            <TouchableOpacity style={styles.plugButton}>
                <FontAwesome size={20} name={'plug'} style={styles.plugButtonIcon}/>
            </TouchableOpacity>
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
        marginTop: 20
    }
});

export default AuthorizeSpotifyScreen;
