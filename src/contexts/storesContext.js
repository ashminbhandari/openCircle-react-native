import React from'react';
import { SpotifyStore } from '../stores/SpotifyStore';
import {AuthorizationStore} from "../stores/AuthorizationStore";

export const storesContext = React.createContext({
    SpotifyStore: new SpotifyStore(),
    AuthorizationStore: new AuthorizationStore()
});