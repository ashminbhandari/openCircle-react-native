import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react';

const UserSpotifyPopupScreen = observer(({user}) => {
    return (
        <View style={styles.container}>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flexDirection: 'column',
        height: '100%'
    }
});

export default UserSpotifyPopupScreen;