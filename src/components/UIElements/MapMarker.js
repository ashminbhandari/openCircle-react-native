import React, {useState} from "react";
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const MapMarker = ({loadingDataForId, userId, iconName}) => {
    return (
        <View style={styles.container}>
            {
                loadingDataForId == userId ? (
                <ActivityIndicator style={{padding:5}} size="small" color="#1DB954"/>
            ) : (
                <MaterialCommunityIcons
                    name={iconName}
                    color={'#1DB954'}
                    size={25}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderWidth: 1.5,
        padding: 2,
        paddingBottom: 1,
        borderColor: 'white',
        borderRadius: 50,
    }
});

export default MapMarker;