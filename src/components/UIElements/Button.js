import React, {useState, useEffect} from 'react';
import {Text, Animated, TouchableOpacity, View, StyleSheet} from "react-native";
import {observer} from 'mobx-react';
import {FontAwesome} from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';

const Button = (observer((props) => {
    //Shake animation during error
    const [shakeAnimation] = useState(new Animated.Value(0));

    //Shake upon error
    useEffect(() => {
        if (props.error) {
            startShake();
            Haptics.impactAsync('heavy');
        }

        //After some time out disable the button shake
        if(props.setError) {
            setTimeout(() => {
                props.setError(false);
            }, 500);
        }
    });

    const startShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {toValue: 10, duration: 100, useNativeDriver: true}),
            Animated.timing(shakeAnimation, {toValue: -10, duration: 100, useNativeDriver: true}),
            Animated.timing(shakeAnimation, {toValue: 10, duration: 100, useNativeDriver: true}),
            Animated.timing(shakeAnimation, {toValue: 0, duration: 100, useNativeDriver: true})
        ]).start();
    };

    return (
        <Animated.View style={{
            transform: [{translateX: shakeAnimation}],
        }}>
            <TouchableOpacity style={[styles.button, {borderColor: props.error ? 'red' : 'white'}]}
                              onPress={props.onPress}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <FontAwesome size={32} name={props.faName} style={{
                        color: props.error ? 'red' : props.faColor ? props.faColor : 'white',
                    }}/>
                    <Text style={[styles.text, {color: props.error ? 'red' : 'white'}]}>{props.text}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
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

