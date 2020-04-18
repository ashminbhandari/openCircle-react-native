//Basic react imports
import React from 'react';

//Import the entry point
import Main from './src/Main';
import {Provider} from "mobx-react";

//Store
import AuthorizationStore from "./src/stores/AuthorizationStore";

export default function App() {
    return (
        <Provider store={AuthorizationStore}>
            <Main/>
        </Provider>
    );
};

