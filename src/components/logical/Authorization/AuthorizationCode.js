import * as AuthSession from 'expo-auth-session';
import Credentials from './Credentials';

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read']; //This is the scope of accessing that we will be asking for from the user
const scopes = scopesArr.join(' ');

const AuthorizationCode = async () => {

    try {
        const credentials = await Credentials();
        const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
        const result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                credentials.clientId +
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                '&redirect_uri=' +
                encodeURIComponent(redirectUrl),
        })
        return result.params.code;
    } catch (err) {
        console.error(err)
    }
};

export default AuthorizationCode;