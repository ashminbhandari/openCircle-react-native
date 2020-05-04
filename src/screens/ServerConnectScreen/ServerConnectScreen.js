import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, KeyboardAvoidingView, View, Text} from "react-native";
import Button from "../../components/UIElements/Button";
import {FontAwesome} from "@expo/vector-icons";
import AuthorizationService from "../../services/AuthorizationService";
import RotatingImageComponent from "../../components/UIElements/RotatingImageComponent";
import {useStores} from '../../hooks/useStores';
import cookieConfig from "../../utils/cookieConfig";

const ServerConnectScreen = ({navigation}) => {
    const [password, onChangePassword] = useState('password');
    const [email, onChangeEmail] = useState('Spotify email');
    const [loginError, onLoginError] = useState(null);
    const [buttonError, setButtonError] = useState(false);
    const {AuthorizationStore} = useStores();

    async function joinServer() {
        try {
            let response = await AuthorizationService.joinServer(email, password);
            if(response) {
                AuthorizationStore.isAuthenticated = true;
            }

            //Set cookie
            await cookieConfig.saveCookie(response.headers['set-cookie']);

            console.log(response.headers['set-cookie']);

        } catch (error) {
            console.log(error);
            onLoginError('Please check your credentials');
            setButtonError(true);
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
            <KeyboardAvoidingView>
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
                            setError={setButtonError}
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
        padding: 50
    },
});

export default ServerConnectScreen;

