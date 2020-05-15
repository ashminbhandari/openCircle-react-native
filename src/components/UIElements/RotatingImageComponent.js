import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

/**/
/*

 RotatingImage

 NAME

   RotatingImage - cluster marker for the map

 SYNOPSIS

    const RotatingImage(props)

        props.imgSource -> The source of the image that will be passed into it

 DESCRIPTION

    Functional React component that relates to the animated rotating image

 RETURNS

    The RotatingImage component

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
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
                height: 200,
                width: 200,
            }}
            source={props.imgSource}/>
    )
}


