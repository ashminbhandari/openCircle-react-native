import React, {useState} from 'react';
import Button from '../../components/UIElements/Button';
import {observer} from 'mobx-react';
import AuthorizationService from '../../services/AuthorizationService';
import CreatePasswordScreen from "../CreatePasswordScreen/CreatePasswordScreen";

const AuthorizeSpotifyScreen = observer(() => {
    const [authCode, setAuthCode] = useState(null);
    const [error, setError] = useState(false);

    //Gets the authorization code
    async function getAuthCode() {
        try {
            let code = await AuthorizationService.getAuthorizationCode();
            setAuthCode(code);
            console.log("Code received as..", code);
        } catch (error) {
            console.log("Error getting/setting auth code in LandingPage.js");
            setError(true);
        }
    }

    return (
        <>
        {
            authCode  ? (
                <CreatePasswordScreen authCode={authCode}/>
            ) : (
                <Button
                    text={'Connect with Spotify'}
                    faName='spotify'
                    onPress={getAuthCode}
                    error={error}/>
            )
        }
        </>
    );
});

export default AuthorizeSpotifyScreen;
