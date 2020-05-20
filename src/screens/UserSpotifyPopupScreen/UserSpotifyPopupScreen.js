import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react';
import {AntDesign} from '@expo/vector-icons';
import TrackDisplay from "../../components/UIElements/TrackDisplay";
import {useStores} from '../../hooks/useStores';
import SpotifyService from "../../services/SpotifyService";
import Toast from "react-native-root-toast";
import { useTransition, useSpring, useChain, config } from 'react-spring/native';

const UserSpotifyPopupScreen = observer(({user}) => {
    const [username, setUsername] = useState(null);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false)

    //Load Spotify data for user passed in
    useEffect(() => {
       async function getUserSpotify() {
           try {
               let response = await SpotifyService.getUserSpotify(user);
               setData(response.spotifyData);
               setUsername(response.userName);
               setOpen(true);
           } catch(error) {
               console.debug(error);
               Toast.show('Please broadcast yourself before downloading online users', {
                   duration: Toast.durations.LONG,
                   position: Toast.positions.TOP,
                   shadow: true,
                   animation: true,
                   hideOnPress: true,
                   containerStyle: {
                       borderWidth: 1,
                       borderColor: 'red',
                       marginTop: 20
                   }
               });
           }
       };

       getUserSpotify();

    }, []);

    const springRef = useRef();
    const { size, opacity, ...rest } = useSpring({
        ref: springRef,
        config: config.stiff,
        from: { size: '20%', background: 'hotpink' },
        to: { size: open ? '100%' : '20%', background: open ? 'white' : 'hotpink' }
    });

    const transRef = useRef();
    const transitions = useTransition(open ? data : [], item => item.name, {
        ref: transRef,
        unique: true,
        trail: 400 / data.length,
        from: { opacity: 0, transform: 'scale(0)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0)' }
    });

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.6])

    return (
        <View style={{ ...rest, width : size, height: size }}>
            {transitions.map(({ item, key, props }) => (
                <View key={key} style={{ ...props }} />
            ))}
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        bottom: 140,
        right: 40,
        left: 40,
        backgroundColor: 'black',
        borderWidth: 1,
    }
});

export default UserSpotifyPopupScreen;