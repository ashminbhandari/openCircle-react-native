import React from "react";
import {View, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

const MapMarker = () => {
    return (
        <View style={styles.container}>
            <FontAwesome
                name={'spotify'}
                color={'#1DB954'}
                size={30}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderRadius: 50,
    }
});

export default MapMarker;