import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Button from "../../components/UIElements/Button";
import {FontAwesome} from "@expo/vector-icons";
import AuthorizationService from "../../services/AuthorizationService";

const ServerConnectScreen = () => {
    const [password, onChangePassword] = useState('password');
    const [email, onChangeEmail] = useState('');

    return (
        <View style={styles.container}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    textInputContainer: {
        width: 180,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 1
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
        marginTop: 35
    }
});

export default ServerConnectScreen;

