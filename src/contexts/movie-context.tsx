import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, Dispatch, FC, useEffect, useState } from "react";
import { useEffectAsync } from "../hooks/async-hooks";

export const MovieContext = createContext<[any[], Dispatch<any[]>]>([null!, () => null!]);

export const MovieContextProvider: FC = (props) => {
    const [movies, setMovies] = useState<any[]>([]); //set the latest provided list of top items available globally

    useEffectAsync(async () => {
        if (movies) {
            await AsyncStorage.setItem("MOVIE_LIST", `${JSON.stringify(movies)}`); //store the latest movies in AsyncStorage
        }
    }, [movies]);

    return <MovieContext.Provider value={[movies, setMovies]}>{props.children}</MovieContext.Provider>;
};
