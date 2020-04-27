import React, {useState} from 'react';
import Button from '../../components/UIElements/Button';
import {observer} from 'mobx-react';
import AuthorizationService from '../../services/AuthorizationService';
import CreatePasswordScreen from "../CreatePasswordScreen/CreatePasswordScreen";

const AuthorizeSpotifyScreen = observer(() => {
    const [authCode, setAuthCode] = useState(null);

    //Gets the authorization code
    async function getAuthCode() {
        try {
            let code = await AuthorizationService.getAuthorizationCode();
            setAuthCode(code);
            console.log("Code received as..", code);
        } catch (error) {
            console.error("Error getting/setting auth code in LandingPage.js");
            throw error;
        }
    }

    return (
        <>
        {
            authCode === null ? (
                <Button
                    text={'Connect with Spotify'}
                    faName='spotify'
                    onPress={getAuthCode}/>
            ) : (
                <CreatePasswordScreen authCode={authCode}/>
            )
        }
        </>
    );
});

export default AuthorizeSpotifyScreen;
