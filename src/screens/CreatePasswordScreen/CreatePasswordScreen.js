import React, {useState, useEffect} from "react";
import Button from '../../components/UIElements/Button';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import axios from "axios";
import AsyncStorage from '../../storage/AsyncStorage'
import env from '../../../env';
import {useStores} from '../../hooks/useStores'

const CreatePasswordScreen = (props) => {
    const {AuthorizationStore} = useStores();
    const [password, onChangePassword] = useState('');
    const [error, setError] = useState('');
    const [buttonErrorShake, setButtonErrorShake] = useState('');
    const [creationError, setCreationError] = useState('');
    const [buttonIsLoading, setButtonIsLoading] = useState(null);

    const validatePassword = () => {
        if (password.length == 0) {
            return false;
        } else if (password.length == 7) {
            setError(1 + ' more character');
            return false;
        } else if (password.length < 8) {
            let remChars = 8 - password.length;
            setError(remChars + ' more characters');
            return false;
        } else {
            setError('');
            return true;
        }
    };

    //useEffect React hook
    useEffect(() => {
        validatePassword();
    });


    const createUser = async () => {
        if (validatePassword()) {
            try {
                setButtonIsLoading(true);
                let response = await axios.post(env.API_URL + '/auth/createUser', {
                    code: props.authCode,
                    auth: {
                        password: password
                    }
                });
                setButtonIsLoading(false);

                //Our user
                let user = response.data.user;

                //If user has successfully been created,
                //set data in AsyncStorage
                if (user) {
                    await AsyncStorage.saveToAsyncStorage('user', user);

                    AuthorizationStore.authorizedUser = user.name;

                    props.navigator.push('AuthorizeSpotifyScreen');
                }
            } catch (error) {
                setButtonIsLoading(false);
                setCreationError('Do you already have an account?');
                setButtonErrorShake(true);
            }
        } else {
            setButtonErrorShake(true);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                secureTextEntry={true}
                maxLength={16}
                textContentType="password"
                value={password}
                onChangeText={pass => onChangePassword(pass)}
                style={[styles.textInput, {borderColor: error ? 'red' : 'white'}]}
                keyboardAppearance={'dark'}
            />
            <Text style={{
                color: 'red',
                alignSelf: 'center',
                marginTop: 10
            }}>{error ? error : creationError}</Text>
            <View style={styles.button}>
                <Button
                    text={'Create a password'}
                    faName='lock'
                    onPress={createUser}
                    error={buttonErrorShake}
                    isLoading={buttonIsLoading}/>
            </View>
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
        width: 200,
        alignSelf: 'center'
    },
    button: {
        marginTop: 20
    }
});

export default CreatePasswordScreen;