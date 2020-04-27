import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import Button from "../../components/UIElements/Button";

const ServerConnectScreen = () => {
    const [password, onChangePassword] = useState(null);

    return (
        <View>
            <TextInput
                secureTextEntry={true}
                maxLength={16}
                textContentType="password"
                value={password}
                onChangeText={pass => onChangePassword(pass)}
                style={styles.textInput}
                keyboardAppearance={'dark'}
            />
            <Button
                text={'Connect to World Server'}
                faName='spotify'/>
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        borderRadius: 50,
        marginTop: 40,
        width: 200,
        alignSelf: 'center'
    }
});

export default ServerConnectScreen;

