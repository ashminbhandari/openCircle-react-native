import React from 'react';
import { View, StyleSheet } from 'react-native';

//Custom components imports
import RotatingImage from './RotatingImage';

export default function Index() {
    return (
        <View style={styles.container}>
            <RotatingImage/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

