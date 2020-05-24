import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

export default function RotatingImage(props) {
    //Initial value for rotation animation
    const [rotateAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.loop(Animated.timing(
            rotateAnim,
            {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear
            }
        )).start();
    }, [rotateAnim]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <Animated.Image
            style={{
                transform: [{rotate: spin}],
                height: props.height || 200,
                width: props.width || 200,
            }}
            source={props.imgSource}/>
    )
}


