import React, { useState, useEffect } from 'react';
import {View, Switch, StyleSheet, TextInput} from 'react-native';
import AuthorizeButton from '../../components/ui/AuthorizeButton';
import {observer} from 'mobx-react';
import {useStores} from '../../hooks/useStores'
import RotatingImageComponent from '../../components/ui/RotatingImageComponent';
import AuthStorage from '../../storage/AuthorizationStorage';

const LandingPage = observer(() => {
    const [password, onChangeText] = useState('Enter your password')
    const {AuthorizationStore} = useStores();

    function toggleSwitch() {
        AuthorizationStore.isToggled = !AuthorizationStore.isToggled;
        AuthorizationStore.password = value;
    }

    return (
        <View style={styles.container}>
            <RotatingImageComponent/>
            {(AuthStorage.getHasAuth() === 'false' || AuthorizationStore.hasAuth !== 'false') ?
                (<AuthorizeButton/>) : (
                <View>
                    <TextInput
                        textContentType="password"
                        value={password}
                        onChangeText={pass=>onChangeText(pass)}
                    />
                    <Switch
                        onValueChange={toggleSwitch}
                        value={AuthorizationStore.isToggled}
                        style={styles.switch}
                    />
                </View>
            )}
        </View>
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
        marginTop: 40
    }
});

export default LandingPage;
