import React, {useState, useEffect} from "react";
import Button from '../../components/UIElements/Button';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import axios from "axios";
import AsyncStorage from '../../storage/AsyncStorage'

/**/
/*

 CreatePasswordScreen

 NAME

   CreatePasswordScreen - create a password screen

 SYNOPSIS

    const CreatePasswordScreen(props)

        props -> React.props to be passed into it

 DESCRIPTION

    Functional React component that relates to the create a password screen for the application
    in which the user will create their password

 RETURNS

    The CreatePasswordScreen component

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
const CreatePasswordScreen = (props) => {
    const [password, onChangePassword] = useState('');
    const [error, setError] = useState('');
    const [buttonErrorShake, setButtonErrorShake] = useState('');
    const [creationError, setCreationError] = useState('');

    /**/
    /*

     validatePassword

     NAME

       validatePassword - Validates password for length

     SYNOPSIS

        validatePassword()

     DESCRIPTION

        Checks whether or not the password is of the proper length i.e. 8

     RETURNS

        True or false boolean according to the validity of the password

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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

    /**/
    /*

     createUser

     NAME

       createUsers - Creates a new user

     SYNOPSIS

        async createUser()

     DESCRIPTION

        Sends a post request along with a user's email and password to the server to
        have them join the application or sign up

     RETURNS

        Nothing

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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

                //If user has successfully been created,
                //set data in AsyncStorage
                if (user) {
                    await AsyncStorage.saveToAsyncStorage('user', user);

                    //Log new user
                    console.log('New user:', user);

                    props.navigator.push('AuthorizeSpotifyScreen');
                }
            } catch (error) {
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
                    setError={setButtonErrorShake}/>
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