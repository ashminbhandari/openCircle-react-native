import React, {useState} from 'react';
import {View, Switch, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggle} from '../actions/actions';
import AuthorizeButton from '../components/logical/AuthorizeButton';

//Custom components imports
import RotatingImageComponent from '../components/ui/RotatingImageComponent';

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
                <AuthorizeButton/>
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
});

