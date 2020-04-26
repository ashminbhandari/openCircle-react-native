import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/useStores'
import {FontAwesome} from "@expo/vector-icons";

const GreenButton = (observer((props) => {
    const { AuthorizationStore } = useStores();
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => AuthorizationStore.getAuthCode()}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome size={32} style={{color: 'white'}} name={props.faName}/>
                    <Text style={styles.text}>{props.text}</Text>
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

export default GreenButton;

