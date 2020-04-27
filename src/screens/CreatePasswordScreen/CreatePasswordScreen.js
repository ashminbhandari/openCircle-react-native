import React, {useState, useEffect} from "react";
import Button from '../../components/UIElements/Button';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import axios from "axios";
import AsyncStorage from "../../storage/AsyncStorage";


const CreatePasswordScreen = (props) => {
    const [password, onChangePassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = () => {
        if(password.length < 8) {
            setError('Password must be of at least 8 characters')
            return false;
        }
        else {
            setError('');
            return true;
        }
    };

    useEffect (()=> {
        validatePassword();
    });

    //Send a create user request to the server
    const createUser = async () => {
        if(validatePassword) {
            try {
                let response = await axios.post('http://10.0.0.226:3000/auth/createUser', {
                    code: props.authCode,
                    auth: {
                        password: password
                    }
                });

                //Set AsyncStorage with the user's Spotify ID
                let user = await AsyncStorage.saveToAsyncStorage('user', response.data.user);

                if (user) {
                    console.log('Saved user: ', user);
                } else {
                    console.log('Could not save the user');
                }

            } catch (error) {
                setError('')
            }
        }
    }

    return (
        <View>
            <TextInput
                secureTextEntry={true}
                maxLength={16}
                textContentType="password"
                value={password}
                onChangeText={pass => onChangePassword(pass)}
                style={[styles.textInput, {borderColor: error ? 'red' : '#66ff00'}]}
                keyboardAppearance={'dark'}
            />
            <Text style={{color:'red'}}>{error}</Text>
            <Button
                text={'Create a password'}
                faName='lock'
                onPress={createUser}/>
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
        marginTop: 40,
        marginBottom: 10,
        width: 200,
        alignSelf: 'center'
    }
});

export default CreatePasswordScreen;