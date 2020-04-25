import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import AuthorizeButton from '../../components/ui/AuthorizeButton';
import {observer} from 'mobx-react';
import {useStores} from '../../hooks/useStores'
import RotatingImageComponent from '../../components/ui/RotatingImageComponent';

const LandingPage = observer(() => {
    const {AuthorizationStore} = useStores();

    function toggleSwitch() {
        AuthorizationStore.isToggled = !AuthorizationStore.isToggled;
    }

    return (
        <View style={styles.container}>
            <RotatingImageComponent/>
            {AuthorizationStore.token === null ? (
                <AuthorizeButton/>
            ) : (
                <Switch
                    onValueChange={toggleSwitch}
                    value={AuthorizationStore.isToggled}
                    style={styles.switch}
                />
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
