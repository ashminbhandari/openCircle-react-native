import React from'react';
import { AuthorizationStore } from "../stores/AuthorizationStore";
import { SpotifyStore } from '../stores/SpotifyStore';

export const storesContext = React.createContext({
    AuthorizationStore: new AuthorizationStore(),
    SpotifyStore: new SpotifyStore(),
});