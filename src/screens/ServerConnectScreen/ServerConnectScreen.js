import React, {useState} from 'react';
import {StyleSheet, TextInput, KeyboardAvoidingView, View} from "react-native";
import Button from "../../components/UIElements/Button";
import {FontAwesome} from "@expo/vector-icons";
import AuthorizationService from "../../services/AuthorizationService";
import RotatingImageComponent from "../../components/UIElements/RotatingImageComponent";

const ServerConnectScreen = ({navigation}) => {
    const [password, onChangePassword] = useState('password');
    const [email, onChangeEmail] = useState('Spotify email');

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
                            onPress={AuthorizationService.joinServer}
                        />
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
        padding: 35
    },
});

export default ServerConnectScreen;

