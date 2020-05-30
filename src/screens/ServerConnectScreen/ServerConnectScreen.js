import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, KeyboardAvoidingView, View, Text, ActivityIndicator} from "react-native";
import Button from "../../components/UIElements/Button";
import {FontAwesome} from "@expo/vector-icons";
import AuthorizationService from "../../services/AuthorizationService";
import RotatingImageComponent from "../../components/UIElements/RotatingImageComponent";
import {useStores} from '../../hooks/useStores';

const ServerConnectScreen = ({navigation}) => {
    const [password, onChangePassword] = useState('password');
    const [email, onChangeEmail] = useState('Spotify email');
    const [loginError, onLoginError] = useState(null);
    const [buttonError, setButtonError] = useState(null);
    const [buttonIsLoading, setButtonIsLoading] = useState(null);
    const {AuthorizationStore} = useStores();
    const [checkingCookie, setCheckingCookie] = useState(null);

    //Utilizing the useEffect hook to check if the cookie saved is valid
    useEffect(() => {
        async function checkCookie() {
            setCheckingCookie(true);
            //Checks cookie and if cookie exists, set isAuthenticated to true
            await AuthorizationStore.checkCookie();
            setCheckingCookie(false);
        }
        checkCookie();
    },[]);

    async function joinServer() {
        try {
            setButtonIsLoading(true);
            let response = await AuthorizationService.joinServer(email, password);

            if (response) {
                AuthorizationStore.isAuthenticated = true;
                AuthorizationStore.user = response.data;
            }

            //Set cookie
            await AuthorizationService.saveCookie(response.headers['set-cookie']);

        } catch (error) {
            console.log(error);
            setButtonIsLoading(false);
            setButtonError(true);
            onLoginError('Please check your credentials');
        }
    }

    return (
        <View style={styles.container}>
            <FontAwesome
                size={30}
                name={'plus-circle'}
                style={styles.authNavigationButtonIcon}
                onPress={() => {
                    navigation.push('AuthorizeSpotifyScreen')
                }}
            />
            <KeyboardAvoidingView behavior={'position'}>
                <RotatingImageComponent imgSource={require('../../../assets/opencircle.png')}/>
                <View style={styles.formContainer}>
                    <View style={styles.textInputContainer}>
                        <FontAwesome size={45} name={'spotify'} style={[
                            styles.textInputIcon, {
                                color: '#1DB954'
                            }
                        ]}/>
                        <TextInput
                            value={email}
                            onChangeText={email => onChangeEmail(email)}
                            style={styles.textInput}
                            keyboardAppearance={'dark'}
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <FontAwesome size={45} name={'bug'} style={styles.textInputIcon}/>
                        <TextInput
                            secureTextEntry={true}
                            maxLength={16}
                            textContentType="password"
                            value={password}
                            onChangeText={pass => onChangePassword(pass)}
                            style={styles.textInput}
                            keyboardAppearance={'dark'}
                        />
                    </View>
                    <View style={styles.joinServerBtn}>
                        <Button
                            text={'Join Server'}
                            faName='plug'
                            onPress={joinServer}
                            error={buttonError}
                            isLoading={buttonIsLoading}
                        />
                        {
                            loginError ? (
                                <Text style={{
                                    color: 'red',
                                    marginTop: 20,
                                    alignSelf: 'center'
                                }}>
                                    {loginError}
                                </Text>
                            ) : (
                                <></>
                            )
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
            {
                checkingCookie ? (
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 35,
                    }}>
                        <ActivityIndicator size="small" color="#1DB954"/>
                        <Text style={{
                            color: 'white',
                            marginLeft: 10
                        }}>Checking for an existing session</Text>
                    </View>
                ) : <></>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        marginTop: 20,
    },
    textInputContainer: {
        width: 180,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 4
    },
    textInput: {
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        width: 150,
        borderRadius: 50,
        marginLeft: 10,
        paddingLeft: 20
    },
    textInputIcon: {
        color: 'white',
        padding: 5
    },
    joinServerBtn: {
        marginTop: 35,
        alignSelf: 'center',
        width: 200
    },
    authNavigationButtonIcon: {
        color: 'white',
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 40
    },
});

export default ServerConnectScreen;

