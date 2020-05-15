import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import MapMarker from "./MapMarker";
import {FontAwesome} from "@expo/vector-icons";

/**/
/*

 ClusterMarker

 NAME

   ClusterMarker - cluster marker for the map

 SYNOPSIS

    const ClusterMarker({count})

        {count} -> The cluster count to be displayed

 DESCRIPTION

    Functional React component that relates to the cluster marker to be displayed in map

 RETURNS

    The ClusterMarker component

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
const ClusterMarker = ({count}) => {
    return (
        <View style={styles.container}>
            <FontAwesome
                name={'spotify'}
                color={'#1DB954'}
                size={30}
            />
            <Text style={{
                color:'white',
                marginLeft: 5,
                fontWeight:'bold',
                alignSelf: 'center'
            }}>
                {count}
            </Text>
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
        flexDirection: 'row'
    }
});

export default ClusterMarker;