import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Linking} from 'react-native';
import {observer} from 'mobx-react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ListItem} from 'react-native-elements';
import {useStores} from '../../hooks/useStores';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import Toast from 'react-native-root-toast';

const Tab = createBottomTabNavigator();

const UserSpotifyPopupScreen = observer(({user}) => {
    const {SpotifyStore} = useStores();
    const [currentlyViewing, setCurrentlyViewing] = useState('Top Tracks');

    async function openUserSpotify() {
        await Linking.openURL('https://open.spotify.com/album/0sNOF9WDwhWunNAHPD3Baj');
    }

    function recentlyPlayed() {
        console.log('clicked');
    }

    function topTracks() {
        console.log('clicked');
    }

    function topArtists() {
        console.log('clicked');
    }

    function TabNavigation() {
        let tabs = [{
            iconName: 'album',
            name: 'Top Tracks',
            onPress: topTracks
        }, {
            iconName: 'artist',
            name: 'Top Artists',
            onPress: topArtists
        }, {
            iconName: 'disc-player',
            name: 'Recently Played',
            onPress: recentlyPlayed
        }];

        let TabNavigation = [];
        for (let index = 0; index < tabs.length; index++) {
            TabNavigation.push(
                <View style={styles.tabNavigationContent} key={index.toString()}>
                    <MaterialCommunityIcons
                        name={tabs[index].iconName}
                        size={25}
                        onPress={tabs[index].onPress}
                        style={styles.tabNavigationIcons}
                    />
                    <Text style={styles.tabNavigationText}>
                        {tabs[index].name}
                    </Text>
                </View>
            );
        }

        return TabNavigation;
    }

    return (
        <View style={styles.container}>
            <ListItem
                Component={TouchableScale}
                friction={70} //
                tension={50} // These props are passed to the parent component (here TouchableScale)
                activeScale={1.2} //
                containerStyle={{backgroundColor: 'black', marginTop: 7}}
                leftIcon={{
                    name: 'spotify',
                    color: '#1DB954',
                    type: 'font-awesome',
                    size: 50,
                    iconStyle: {marginTop: 7}
                }}
                title={SpotifyStore.selectedMarkerOwner}
                titleStyle={{color: 'white', fontWeight: 'bold'}}
                subtitle={currentlyViewing}
                subtitleStyle={{color: 'white'}}
                onPress={openUserSpotify}
                chevron
                chevronStyle={{color:'white'}}
            />
            <View style={styles.tabNavigation}>
                {TabNavigation()}
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flexDirection: 'column',
        height: '100%',
    },

    tabNavigation: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        padding: 10,
        width: '100%',
        backgroundColor: '#0c0c0c'
    },

    tabNavigationContent: {
        marginLeft: 40
    },

    tabNavigationIcons: {
        alignSelf: 'center',
        color: 'white',
    },

    tabNavigationText: {
        alignSelf: 'center',
        color: 'white',
        marginTop: 3
    }


});

export default UserSpotifyPopupScreen;