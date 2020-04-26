import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Switch, StyleSheet, TextInput} from 'react-native';
import GreenButton from '../../components/ui/GreenButton';
import {observer} from 'mobx-react';
import RotatingImageComponent from '../../components/ui/RotatingImageComponent';
import AuthorizationService from '../../services/AuthorizationService';

const LandingPage = observer(() => {
    const [password, onChangeText] = useState(null);
    const [authCode, setAuthCode] = useState(null);


    function joinServer() {

    }

    async function getAuthCode() {
        try {
            let code = await AuthorizationService.getAuthorizationCode();
            setAuthCode(code);
            console.log("Code received as..", code);
        } catch (error) {
            console.error("Error getting/setting auth code in LandingPage.js");
            throw error;
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <RotatingImageComponent imgSource={require('../../../assets/opencircle.png')}/>
            {authCode === null ?
                (<GreenButton
                    text={'Connect with Spotify'}
                    faName='spotify'
                    onPress={getAuthCode}/>) : (
                    <View>
                        <TextInput
                            secureTextEntry={true}
                            maxLength={16}
                            textContentType="password"
                            value={password}
                            onChangeText={pass => onChangeText(pass)}
                            style={styles.textInput}
                            keyboardAppearance={'dark'}
                        />
                        <GreenButton
                            text={'Join server'}
                            faName='server'
                            onPress={joinServer}/>
                    </View>
                )}
        </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textInput: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        borderRadius: 50,
        marginTop: 40,
        width: 200
    }
});

export default LandingPage;
