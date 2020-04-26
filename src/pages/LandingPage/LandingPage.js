import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Switch, StyleSheet, TextInput} from 'react-native';
import GreenButton from '../../components/ui/GreenButton';
import {observer} from 'mobx-react';
import {useStores} from '../../hooks/useStores'
import RotatingImageComponent from '../../components/ui/RotatingImageComponent';
import AuthStorage from '../../storage/AuthorizationStorage';

const LandingPage = observer(() => {
    const [password, onChangeText] = useState('');
    const {AuthorizationStore} = useStores();

    function joinServer() {
        AuthorizationStore.isToggled = !AuthorizationStore.isToggled;
        AuthorizationStore.password = value;
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <RotatingImageComponent imgSource={require('../../../assets/opencircle.png')}/>
            {(AuthStorage.getHasAuth() === 'false' || AuthorizationStore.hasAuth === 'false') ?
                (<GreenButton
                    text={'Connect with Spotify'}
                    faName='spotify'/>) : (
                    <View>
                        <TextInput
                            secureTextEntry={true}
                            maxLength={16}
                            textContentType="password"
                            value={password}
                            onChangeText={pass => onChangeText(pass)}
                            style={styles.textInput}
                        />
                        <Switch
                            onValueChange={joinServer}
                            value={AuthorizationStore.isToggled}
                            style={styles.switch}
                        />
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

    switch: {
        marginTop: 20,
        alignSelf: 'center'
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
