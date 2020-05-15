import React from "react";
import {View, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

/**/
/*

 MapMarker

 NAME

   MapMarker - map marker

 SYNOPSIS

    const MapMarker()

 DESCRIPTION

    Functional React component that relates to the map marker to be displayed

 RETURNS

    The MapMarker component

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
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
        borderWidth: 1,
        padding: 5,
        borderColor: 'white',
        borderRadius: 50,
    }
});

export default MapMarker;