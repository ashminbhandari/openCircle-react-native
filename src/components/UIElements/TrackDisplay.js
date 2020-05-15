import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

/**/
/*

 TrackDisplay

 NAME

   TrackDisplay - the UI display for user's favorite track

 SYNOPSIS

    const TrackDisplay(props)

        props -> Props including track image, artist name and so on

 DESCRIPTION

    Functional React component that relates to the user's favorite track to be displayed in app

 RETURNS

    The TrackDisplay component

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
const TrackDisplay = (props) => {
    return (
        <View style={styles.container}>
            <Image source={{
                uri: props.imgSource
            }}
                   style={{
                       width: 82,
                       height: 82,
                   }}/>
            <Text style={[styles.textStyle, {width:100}]}>{props.track}</Text>
            <Text style={styles.textStyle}>{props.artist}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#292d2b',
        overflow: 'hidden'
    },
    textStyle: {
        color: 'white',
        alignSelf: 'center',
        overflow: 'hidden',
        width: 60,
        marginRight: 5,
        flexWrap: 'wrap'
    }
})
export default TrackDisplay;