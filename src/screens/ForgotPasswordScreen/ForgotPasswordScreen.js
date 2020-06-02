import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, KeyboardAvoidingView, View, Text, ActivityIndicator} from "react-native";
import Button from "../../components/UIElements/Button";
import {FontAwesome} from "@expo/vector-icons";
import AuthorizationService from "../../services/AuthorizationService";
import RotatingImageComponent from "../../components/UIElements/RotatingImageComponent";
import {useStores} from '../../hooks/useStores';
import TouchableOpacity from "react-native-web/src/exports/TouchableOpacity";

const ServerConnectScreen = ({navigation}) => {
    const [email, onChangeEmail] = useState('Spotify email');
    const [code, setCode] = useState('5 digit code')
    const [error, onError] = useState(null);
    const [password, setPassword] = useState('Password');
    const [buttonError, setButtonError] = useState(null);
    const [buttonIsLoading, setButtonIsLoading] = useState(null);
    const {AuthorizationStore} = useStores();

    async function sendPasswordResetCode() {
        try {
            setButtonIsLoading(true);
            await AuthorizationStore.sendPasswordResetCode(email);
            setButtonError(null);
            onError(null);
            setButtonIsLoading(false);
        } catch (error) {
            setButtonIsLoading(false);
            setButtonError(true);
            onError('Hoopla, account not found');
        }
    }

    async function checkCode() {
        try {
            setButtonIsLoading(true);
            await AuthorizationStore.checkCode(email, code);
            setButtonError(null);
            onError(null);
            setButtonIsLoading(false);
        } catch (error) {
            setButtonIsLoading(false);
            setButtonError(true);
            onError('The code does not match')
        }
    }

    async function createNewPassword() {
        try {
            setButtonIsLoading(true);
            await AuthorizationStore.createNewPassword(email, password);
            setButtonError(null);
            onError(null);
            setButtonIsLoading(false);
            if (AuthorizationStore.passwordResetFlag) {
                AuthorizationStore.codeSent = false;
                AuthorizationStore.codeVerified = false;
                navigation.push('ServerConnectScreen');
            }
        } catch (error) {
            setButtonIsLoading(false);
            setButtonError(true);
            onError('Sorry, your password could not be reset. Did the code expire?')
        }
    }

    function tryAgain() {
        console.log('here');
        AuthorizationStore.codeVerified = false;
        AuthorizationStore.codeSent = false;
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
                            secureTextEntry={AuthorizationStore.codeVerified ? true : false}
                            textContentType="password"
                            value={AuthorizationStore.codeVerified ? password : AuthorizationStore.codeSent ? code : email}
                            onChangeText={AuthorizationStore.codeVerified ? password => setPassword(password) : AuthorizationStore.codeSent ? code => setCode(code) : email => onChangeEmail(email)}
                            style={styles.textInput}
                            keyboardAppearance={'dark'}
                        />
                    </View>

                    <View style={styles.resetCodeBtn}>
                        <Button
                            text={AuthorizationStore.codeVerified ? 'Create new password' : AuthorizationStore.codeSent ? 'Verify code' : 'Request reset code'}
                            faName={AuthorizationStore.codeVerified ? 'lock' : AuthorizationStore.codeSent ? 'certificate' : 'send'}
                            size={27}
                            onPress={AuthorizationStore.codeVerified ? createNewPassword : AuthorizationStore.codeSent ? checkCode : sendPasswordResetCode}
                            error={buttonError}
                            isLoading={buttonIsLoading}
                        />
                        {
                            error ? (
                                <Text style={{
                                    color: 'red',
                                    marginTop: 20,
                                    alignSelf: 'center'
                                }}>
                                    {error}
                                </Text>
                            ) : (
                                <></>
                            )
                        }
                        <Text style={{
                            color: 'green',
                            marginTop: 20,
                            alignSelf: 'center'
                        }}>
                            {
                                AuthorizationStore.codeVerified ? 'Code verified' : AuthorizationStore.codeSent ? 'A code was sent to your email' : ''
                            }
                        </Text>

                    </View>

                </View>
            </KeyboardAvoidingView>
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
    resetCodeBtn: {
        marginTop: 35,
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

