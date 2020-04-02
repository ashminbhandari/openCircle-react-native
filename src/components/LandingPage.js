import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';

//Custom components imports
import RotatingImage from './RotatingImage';

export default function LandingPage() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (

        <View style={styles.container}>
            <RotatingImage/>
            <Switch
                style={{height: '2em', margin: '2em'}}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

