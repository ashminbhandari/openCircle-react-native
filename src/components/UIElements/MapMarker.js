import React from "react";
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

const MapMarker = ({loadingDataForId, userId}) => {
    return (
        <View style={styles.container}>
            {
                loadingDataForId == userId ? (
                <ActivityIndicator style={{padding:5}} size="small" color="#1DB954"/>
            ) : (
                <FontAwesome
                    name={'spotify'}
                    color={'#1DB954'}
                    size={30}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderWidth: 1,
        padding: 5,
        borderColor: 'white',
        borderRadius: 50,
    }
});

export default MapMarker;