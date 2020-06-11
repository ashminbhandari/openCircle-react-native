import React, {useState, useEffect} from 'react';
import Button from '../../components/UIElements/Button';
import {observer} from 'mobx-react';
import AuthorizationService from '../../services/AuthorizationService';
import CreatePasswordScreen from "../CreatePasswordScreen/CreatePasswordScreen";
import {View, StyleSheet, Text, KeyboardAvoidingView} from "react-native";
import {useStores} from '../../hooks/useStores';
import {FontAwesome} from "@expo/vector-icons";
import RotatingImageComponent from "../../components/UIElements/RotatingImageComponent";

const AuthorizeSpotifyScreen = observer(({navigation}) => {
    const {AuthorizationStore} = useStores();
    const [authCode, setAuthCode] = useState(null);
    const [error, setError] = useState(null);
    const [buttonIsLoading, setButtonIsLoading] = useState(null);

    //Gets the authorization code
    async function getAuthCode() {
        try {
            setButtonIsLoading(true);
            let code = await AuthorizationService.getAuthorizationCode();
            setButtonIsLoading(false);
            setAuthCode(code);
            console.log("Code received as..", code);
        } catch (error) {
            setButtonIsLoading(false);
            console.log("Error getting/setting auth code in LandingPage.js");
            setError(true);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={'padding'}
        >
            <FontAwesome
                size={30}
                name={'plug'}
                style={styles.authNavigationButtonIcon}
                color={'white'}
                onPress={() => {
                    navigation.push('ServerConnectScreen')
                }}
            />
            <RotatingImageComponent imgSource={require('../../../assets/opencircle.png')}/>
            {
                authCode ? (
                    <CreatePasswordScreen authCode={authCode} navigator={navigation}/>
                ) : (
                    <View style={styles.connectButtonAddedStyles}>
                        <Button
                            text={'Connect with Spotify'}
                            faName='plus-circle'
                            faColor='white'
                            onPress={getAuthCode}
                            error={error}
                            isLoading={buttonIsLoading}
                        />
                    </View>
                )
            }

            {
                AuthorizationStore.authorizedUser ? (
                    <View style={{
                        marginTop: 40,
                        alignSelf: 'center'
                    }}>
                        <FontAwesome
                            name={'check-circle'}
                            color={'green'}
                            size={40}
                            style={{
                                alignSelf: 'center'
                            }}
                        />
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            marginTop: 10
                        }}>
                            Spotify was successfully registered for {AuthorizationStore.authorizedUser}
                        </Text>
                    </View>
                ) : (
                    <></>
                )
            }
        </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
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
    },
    authNavigationButtonIcon: {
        position: 'absolute',
        color: 'white',
        top: 0,
        right: 0,
        padding: 40
    }
});

export default AuthorizeSpotifyScreen;
