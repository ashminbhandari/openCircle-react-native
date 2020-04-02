import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

export default function RotatingImage() {

    //Initial value for rotation animation
    const [rotateAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            rotateAnim,
            {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear
            }
        ).start()
    });

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <Animated.Image
            style={{
                transform: [{rotate: spin}],
                height: '25vh',
                width: '25vh'
            }}
            source={require('../../assets/opencircle.png')} />
    );
}


