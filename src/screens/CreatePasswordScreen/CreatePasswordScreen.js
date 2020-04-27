import React, {useState, useEffect} from "react";
import Button from '../../components/UIElements/Button';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import axios from "axios";
import AsyncStorage from "../../storage/AsyncStorage";
import {FontAwesome} from "@expo/vector-icons";

const CreatePasswordScreen = (props) => {
    const [password, onChangePassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [buttonErrorShake, setButtonErrorShake] = useState('');
    const [serverError, setServerError] = useState('');

    const validatePassword = () => {
        if (password.length == 0) {
            return false;
        } else if (password.length == 7) {
            setValidationError(1 + ' more character');
            return false;
        } else if (password.length < 8) {
            let remChars = 8 - password.length;
            setValidationError(remChars + ' more characters');
            return false;
        } else {
            setValidationError('');
            return true;
        }
    };

    useEffect(() => {
        setButtonErrorShake(false); //Make sure that button doesn't shake each re-render
        validatePassword();
    });

    //Send a create user request to the server
    const createUser = async () => {
        if (validatePassword()) {
            try {
                let response = await axios.post('http://10.0.0.226:3000/auth/createUser', {
                    code: props.authCode,
                    auth: {
                        password: password
                    }
                });

                //Our user
                let user = response.data.user;

                //Set AsyncStorage with the user's Spotify ID
                let asyncSave = await AsyncStorage.saveToAsyncStorage('user', user);

                if (asyncSave) {
                    console.log('Saved user: ', user);
                } else {
                    console.log('Could not save the user');
                }
            } catch (error) {
                setServerError('    OOF, you made a bad request    ');
            }
        } else {
            setButtonErrorShake(true);
        }
    };

    return (
        <View>
            <TextInput
                secureTextEntry={true}
                maxLength={16}
                textContentType="password"
                value={password}
                onChangeText={pass => onChangePassword(pass)}
                style={[styles.textInput, {borderColor: validationError ? 'red' : 'white'}]}
                keyboardAppearance={'dark'}
            />

            {serverError ? (
                <Text style={{color: 'yellow'}}>
                    <FontAwesome size={30} name={'warning'}/>
                    {serverError}
                </Text>
            ) : (<></>)}

            {validationError ? (
                <Text style={{color: 'red', alignSelf: 'center'}}>{validationError}</Text>
            ) : (<></>)}

            <Button
                text={'Create a password'}
                faName='lock'
                onPress={createUser}
                error={buttonErrorShake}/>
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20,
        borderWidth: 1,
        padding: 15,
        borderRadius: 50,
        marginTop: 30,
        marginBottom: 10,
        width: 200,
        alignSelf: 'center'
    }
});

export default CreatePasswordScreen;