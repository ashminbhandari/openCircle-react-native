//Basic react imports
import React from 'react';
import 'mobx-react-lite/batchingForReactNative'

//Import the entry point
import EntryPoint from './src/EntryPoint';

/**/
/*

 App

 NAME

   App - the application entry

 SYNOPSIS

   App()

 DESCRIPTION

    This is the functional component that is called at the very first.
    It is at the top of the component tree.

 RETURNS

    Nothing

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/

export default function App() {
    return (
        <EntryPoint/>
    );
};

