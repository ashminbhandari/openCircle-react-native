import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Image style={{width: '30vh', height: '30vh'}} source={require('../../assets/opencircle.png')}/>
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

