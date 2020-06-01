import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import {observer} from 'mobx-react';
import {FontAwesome} from "@expo/vector-icons";

const Button = (observer((props) => {
    return (
        <>
            {
                props.isLoading ? (<ActivityIndicator size="small" color="#1DB954"/>) :
                    (<View>
                            <TouchableOpacity style={[styles.button, {borderColor: props.error ? 'red' : 'white'}]}
                                              onPress={props.onPress}>
                                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                    <FontAwesome size={props.size || 32} name={props.faName} style={{
                                        color: props.error ? 'red' : props.faColor ? props.faColor : 'white',
                                    }}/>
                                    <Text
                                        style={[styles.text, {color: props.error ? 'red' : 'white'}]}>{props.text}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
            }
        </>
    );
}));

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
    },
    text: {
        paddingTop: 7,
        marginLeft: 7,
        fontFamily: 'Avenir',
    }
});

export default Button;

