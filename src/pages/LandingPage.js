import React, {useState} from 'react';
import {View, Switch, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggle} from '../actions/actions';
import {FontAwesome} from '@expo/vector-icons';

//Custom components imports
import RotatingImageComponent from '../components/RotatingImageComponent';

export default function LandingPage() {
    const [isAuthorized, setAuthorized] = useState(false);
    const toggleValue = useSelector(state => state.toggle);
    const dispatch = useDispatch();

    if (isAuthorized) {
        return (
            <View style={styles.container}>
                <RotatingImageComponent/>
                <Switch
                    style={{margin: 30}}
                    onValueChange={() => {
                        dispatch(toggle());
                        console.log(toggleValue)
                    }}
                    value={toggleValue}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <RotatingImageComponent/>
                <TouchableOpacity style={styles.button}>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesome size={32} style={{color: 'white'}} name={'spotify'}/>
                        <Text style={styles.text}>Connect with Spotify</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
});

