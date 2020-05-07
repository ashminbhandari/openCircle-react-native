import React from'react';
import { SpotifyStore } from '../stores/SpotifyStore';
import {AuthorizationStore} from "../stores/AuthorizationStore";
import {LocationStore} from '../stores/LocationStore';

export const storesContext = React.createContext({
    SpotifyStore: new SpotifyStore(),
    AuthorizationStore: new AuthorizationStore(),
    LocationStore: new LocationStore()
});