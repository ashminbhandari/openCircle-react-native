import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ListItem} from 'react-native-elements';
import {useStores} from '../../hooks/useStores';
import TouchableScale from 'react-native-touchable-scale';
import {Dimensions} from 'react-native';

const UserSpotifyPopupScreen = observer(({navigation, route}) => {
    const {SpotifyStore} = useStores();
    const [currentTab, setCurrentTab] = useState('Top Tracks');

    function displayTopTracks() {
        if (SpotifyStore.topTracks) {
            return (
                <ScrollView>
                    {
                        SpotifyStore.topTracks.map((track, index) => (
                            <ListItem
                                key={index}
                                containerStyle={{
                                    backgroundColor: index % 2 === 0 ? 'black' : '#0a0a0a',
                                }}
                                leftAvatar={{source: {uri: track.image}, size: 75}}
                                title={track.trackName}
                                titleStyle={{
                                    color: 'white'
                                }}
                                subtitle={track.artist}
                                subtitleStyle={{
                                    marginTop:5,
                                    color: 'white'
                                }}
                            />
                        ))
                    }
                </ScrollView>
            )
        }
    }

    function displayRecentlyPlayed() {
        if (SpotifyStore.recentlyPlayed) {
            return (
                <ScrollView>
                    {
                        SpotifyStore.recentlyPlayed.map((track, index) => (
                            <ListItem
                                key={index}
                                containerStyle={{
                                    backgroundColor: index % 2 === 0 ? 'black' : '#0a0a0a',
                                }}
                                leftAvatar={{source: {uri: track.trackImage}, size:75}}
                                title={track.trackName}
                                titleStyle={{
                                    color: 'white'
                                }}
                                subtitle={track.trackArtist}
                                subtitleStyle={{
                                    color: 'white',
                                    marginTop: 5
                                }}
                            />
                        ))
                    }
                </ScrollView>
            )
        }
    }

    function displayTopArtists() {
        if (SpotifyStore.topArtists) {
            return (
                <ScrollView>
                    {
                        SpotifyStore.topArtists.map((artist, index) => (
                            <ListItem
                                key={index}
                                containerStyle={{
                                    backgroundColor: index % 2 === 0 ? 'black' : '#0a0a0a',
                                }}
                                leftAvatar={{source: {uri: artist.artistImage}, size:75}}
                                title={artist.artistName}
                                titleStyle={{
                                    color: 'white'
                                }}
                                subtitle={artist.artistGenre.join(', ')}
                                subtitleStyle={{
                                    color: 'white',
                                    marginTop: 5,
                                    textTransform: 'capitalize'
                                }}
                            />
                        ))
                    }
                </ScrollView>
            )
        }
    }

    function toDisplay(what) {
        if (what === 'Top Tracks') {
            return displayTopTracks();
        } else if (what === 'Recently Played') {
            return displayRecentlyPlayed();
        } else if (what === 'Top Artists') {
            return displayTopArtists();
        }
    }

    function toRecentlyPlayed() {
        setCurrentTab('Recently Played');
    }

    function toTopArtists() {
        setCurrentTab('Top Artists');
    }

    function toTopTracks() {
        setCurrentTab('Top Tracks');
    }

    function TabNavigation() {
        let tabs = [{
            iconName: 'album',
            name: 'Top Tracks',
            onPress: toTopTracks
        }, {
            iconName: 'artist',
            name: 'Top Artists',
            onPress: toTopArtists
        }, {
            iconName: 'disc-player',
            name: 'Recently Played',
            onPress: toRecentlyPlayed
        }];

        let TabNavigation = [];
        for (let index = 0; index < tabs.length; index++) {
            TabNavigation.push(
                <TouchableOpacity
                    style={styles.tabNavigationContent}
                    key={index.toString()}
                    onPress={tabs[index].onPress}
                >
                    <MaterialCommunityIcons
                        name={tabs[index].iconName}
                        size={25}

                        style={[
                            styles.tabNavigationIcons, {
                                color: currentTab === tabs[index].name ? '#1DB954' : 'white'
                            }
                        ]}
                    />
                    <Text style={styles.tabNavigationText}>
                        {tabs[index].name}
                    </Text>
                </TouchableOpacity>
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
                title={SpotifyStore.spotifyOF}
                titleStyle={{color: 'white', fontWeight: 'bold'}}
                subtitle={currentTab}
                subtitleStyle={{color: 'white'}}
                onPress={() => navigation.goBack()}
                rightIcon={{name: 'arrow-back', color: 'white', type: 'ionicons'}}
            />
            <View style={styles.tabNavigation}>
                {TabNavigation()}
            </View>
            <View style={{height: Dimensions.get('window').height - 150}}>
                {toDisplay(currentTab)}
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
        backgroundColor: '#0c0c0c',
        zIndex: 1
    },

    tabNavigationContent: {
        marginLeft: 40,
        color: 'white'
    },

    tabNavigationIcons: {
        alignSelf: 'center',
        color: 'white',
    },

    tabNavigationText: {
        alignSelf: 'center',
        color: 'white',
        marginTop: 3
    },

    listItem: {
        backgroundColor: 'black',
        color: 'white'
    }


});

export default UserSpotifyPopupScreen;