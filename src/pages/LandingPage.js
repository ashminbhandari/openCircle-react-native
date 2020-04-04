import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../actions/actions';

//Custom components imports
import RotatingImageComponent from '../components/RotatingImageComponent';

export default function LandingPage() {
    const toggleValue = useSelector(state => state.toggle);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <RotatingImageComponent/>
            <Switch
                style={{margin: 30}}
                onValueChange={() => {dispatch(toggle()); console.log(toggleValue)}}
                value={toggleValue}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

