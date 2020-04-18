import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import AuthorizeButton from '../../components/ui/AuthorizeButton';
import { observer } from 'mobx-react';

import RotatingImageComponent from '../../components/ui/RotatingImageComponent';

const LandingPage = observer( ()=> {
        return (
            <View style={styles.container}>
                <RotatingImageComponent/>
                <AuthorizeButton/>
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
});

export default LandingPage;
