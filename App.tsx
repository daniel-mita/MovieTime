import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MovieContextProvider } from "./src/contexts/movie-context";
import { useEffectAsync } from "./src/hooks/async-hooks";
import { AppNavigator } from "./src/routing";

export default function App() {
    const netInfo = useNetInfo();
    useEffectAsync(async () => {
        if (netInfo.isConnected === false) {
            //check for no internet connection
            alert("No internet connection!");
        }
        if (netInfo.isConnected === true) {
            await AsyncStorage.removeItem("MOVIE_LIST");
        } //remove items stored if connected to internet
    }, [netInfo.isConnected]);
    return (
        <MovieContextProvider>
            <AppNavigator />
        </MovieContextProvider>
    );
}
