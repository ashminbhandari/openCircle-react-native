import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Button from "../../components/UIElements/Button";
import {FontAwesome} from "@expo/vector-icons";

const ServerConnectScreen = () => {
    const [password, onChangePassword] = useState('password');
    const [username, onChangeUsername] = useState('Username')
    return (
        <View>
            <View style={styles.textInputContainer}>
                <FontAwesome size={45} name={'spotify'} style={[
                    styles.textInputIcon, {
                        color: '#1DB954'
                    }
                ]}/>
                <TextInput
                    value={username}
                    onChangeText={username => onChangeUsername(username)}
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
            <Button
                text={'Join Server'}
                faName='plug'
            />
            <TouchableOpacity style={styles.button}>
                <FontAwesome size={20} name={'plus-circle'} style={styles.buttonIcon}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    textInputContainer: {
        width: 180,
        flexDirection: 'row',
        margin: 15,
        padding: 5,
        justifyContent:'center'
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
        color:'white',
        padding: 5
    },
    button: {
        marginTop: 30,
        borderRadius: 100,
        width: 50,
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        alignSelf: 'center',
    },
    buttonIcon: {
        color: 'white',
        alignSelf: 'center',
    }
});

export default ServerConnectScreen;

