import React from'react';
import { AuthorizationStore } from "../stores/AuthorizationStore";

export const storesContext = React.createContext({
    AuthorizationStore: new AuthorizationStore()
})