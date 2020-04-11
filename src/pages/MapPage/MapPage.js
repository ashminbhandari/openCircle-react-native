import React from "react";
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from './MapStyle';

export default function MapPage() {
    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                     provider={ PROVIDER_GOOGLE }
            customMapStyle={mapStyle}/>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

