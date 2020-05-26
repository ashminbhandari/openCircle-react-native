import React, {useState, useMemo} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    VirtualizedList
} from 'react-native';
import {observer} from 'mobx-react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ListItem} from 'react-native-elements';
import {useStores} from '../../hooks/useStores';
import TouchableScale from 'react-native-touchable-scale';
import {Dimensions} from 'react-native';
import moment from 'moment';
import RotatingImageComponent from "../../components/UIElements/RotatingImageComponent";
import Toast from "react-native-root-toast";

const UserSpotifyPopupScreen = observer(({navigation, route}) => {
    const {SpotifyStore} = useStores();
    const [currentTab, setCurrentTab] = useState('Recently Played');
    const [playbackState, setPlaybackState] = useState(false);

    async function playSound(uri, id) {

        try {
            SpotifyStore.playingSong = id;
            let status = await SpotifyStore.soundObject.getStatusAsync();
            if(!status.isPlaying) {
                await SpotifyStore.soundObject.loadAsync({uri:uri});
                await SpotifyStore.soundObject.playAsync();
                SpotifyStore.playingSong = id;
                setPlaybackState(true);
            } else if (status.isPlaying && status.isLoaded) {
                await SpotifyStore.soundObject.stopAsync();
                await SpotifyStore.soundObject.unloadAsync();
                await SpotifyStore.soundObject.loadAsync({uri:uri});
                await SpotifyStore.soundObject.playAsync();
                setPlaybackState(true);
            }
            else if (status.isPlaying) {
                await SpotifyStore.soundObject.stopAsync();
                await SpotifyStore.soundObject.unloadAsync();
                setPlaybackState(false);
            }
        } catch (error) {
            console.log(error);
            //Show an error Toast
            Toast.show('Oops...the track can not be played right now...', {
                duration: Toast.durations.CENTER,
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
    }

    const displayCurrentlyPlaying = () => {
        if (SpotifyStore.currentlyPlaying) {
            return (
                <ListItem
                    containerStyle={{
                        backgroundColor: '#0a0a0a'
                    }}
                    leftAvatar={{source: {uri: SpotifyStore.currentlyPlaying.image}, size: 75}}
                    title={SpotifyStore.currentlyPlaying.title}
                    titleStyle={{
                        color: 'white'
                    }}
                    subtitle={
                        <View>
                            <Text style={{
                                color: 'white',
                                marginTop: 5,
                                marginBottom: 10
                            }}>{SpotifyStore.currentlyPlaying.subtitle}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <RotatingImageComponent
                                    imgSource={require('../../../assets/vinyl.png')}
                                    height={25}
                                    width={25}
                                />
                                <Text style={{alignSelf: 'center', color: 'white', marginLeft: 5}}>Now Playing</Text>
                            </View>
                        </View>
                    }
                />
            )
        }
    }

    function toDisplay (what) {
        let dataList = [];
        if (what === 'Top Tracks') {
            dataList = SpotifyStore.topTracks;
        } else if (what === 'Recently Played') {
            dataList = SpotifyStore.recentlyPlayed;
        } else if (what === 'Top Artists') {
            dataList = SpotifyStore.topArtists;
        } else if (what === 'Saved Tracks') {
            dataList = SpotifyStore.savedTracks;
        }

        return (
            <ScrollView>
                {
                    dataList ? dataList.map((item,index) =>
                        <ListItem
                            key={index + item.id}
                            containerStyle={{
                                backgroundColor: index % 2 === 0 ? 'black' : '#0a0a0a',
                            }}
                            leftAvatar={{source: {uri: item.image}, size: 75}}
                            title={item.title}
                            titleStyle={{
                                color: 'white'
                            }}
                            subtitle={
                                <View>
                                    <Text style={{
                                        color: 'white',
                                        marginTop: 5,
                                        textTransform: 'capitalize'
                                    }}>{item.subtitle}</Text>
                                    <Text style={{
                                        color: 'white',
                                        marginTop: 5,
                                        fontSize: 12,
                                    }}>{item.time ? moment(item.time).fromNow() : ''}</Text>
                                </View>
                            }
                            rightSubtitle={
                                item.preview ? (
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons
                                            name={SpotifyStore.playingSong === item.id && playbackState ? 'stop' : 'play'}
                                            color={'white'}
                                            style={{
                                                borderWidth: 1.5,
                                                borderRadius: 10,
                                                borderColor: 'white'
                                            }}
                                            size={30}
                                            onPress={() => playSound(item.preview, item.id)}
                                        />
                                    </TouchableOpacity>) : <></>
                            }
                        />
                    ) : <></>
                }
            </ScrollView>
        )

    }

    //Set to recently played tracks
    function toRecentlyPlayed() {
        setCurrentTab('Recently Played');
    }

    function toTopArtists() {
        setCurrentTab('Top Artists');
    }

    function toTopTracks() {
        setCurrentTab('Top Tracks');
    }

    function toSavedTracks() {
        setCurrentTab('Saved Tracks');
    }

    function TabNavigation() {
        let tabs = [
            {
                iconName: 'play',
                name: 'Recently Played',
                onPress: toRecentlyPlayed
            },
            {
                iconName: 'cards-heart',
                name: 'Saved Tracks',
                onPress: toSavedTracks
            },
            {
                iconName: 'album',
                name: 'Top Tracks',
                onPress: toTopTracks
            }, {
                iconName: 'artist',
                name: 'Top Artists',
                onPress: toTopArtists
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

    function goBack() {
        SpotifyStore.clearCurrentUserData();
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ListItem
                Component={TouchableScale}
                friction={70} //
                tension={50} // These props are passed to the parent component (here TouchableScale)
                activeScale={1.2} //
                containerStyle={{backgroundColor: 'black', marginTop: 15}}
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
                onPress={goBack}
                rightIcon={{name: 'arrow-back', color: 'white', type: 'ionicons'}}
            />
            <View style={styles.tabNavigation}>
                {TabNavigation()}
            </View>
            <View style={{height: Dimensions.get('window').height - 150}}>
                {displayCurrentlyPlaying()}
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
        marginBottom: 5,
        padding: 10,
        width: '100%',
        backgroundColor: '#0c0c0c',
        zIndex: 1,
        justifyContent: 'space-evenly'
    },

    tabNavigationContent: {
        color: 'white'
    },

    tabNavigationIcons: {
        alignSelf: 'center',
        color: 'white',
    },

    tabNavigationText: {
        alignSelf: 'center',
        color: 'white',
        marginTop: 3,
        fontSize: 11
    },

    listItem: {
        backgroundColor: 'black',
        color: 'white'
    },
});

export default UserSpotifyPopupScreen;