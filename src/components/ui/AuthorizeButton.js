import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, AsyncStorage} from "react-native";
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/useStores'
import {FontAwesome} from "@expo/vector-icons";

const AuthorizeButton = (observer(() => {
    const { AuthorizationStore } = useStores();
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => AuthorizationStore.getAccessToken()}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome size={32} style={{color: 'white'}} name={'spotify'}/>
                    <Text style={styles.text}>Connect with Spotify</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}));


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

export default AuthorizeButton;

