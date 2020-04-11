import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, AsyncStorage} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import Tokens from "./Tokens";

export default function AuthorizeButton() {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={Tokens}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome size={32} style={{color: 'white'}} name={'spotify'}/>
                    <Text style={styles.text}>Connect with Spotify</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create(
    {
        button: {
            backgroundColor: '#1DB954',
            borderRadius: 50,
            margin: 40,
            padding: 15,
        },
        text: {
            color: 'white',
            paddingTop: 7,
            marginLeft: 7,
            fontFamily: 'Avenir'
        }
    }
);



