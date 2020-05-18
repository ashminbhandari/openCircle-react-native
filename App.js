//Basic react imports
import React from 'react';
import 'mobx-react-lite/batchingForReactNative'

//Import the entry point
import EntryPoint from './src/EntryPoint';

export default function App() {
    return (
        <EntryPoint/>
    );
};

