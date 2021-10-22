import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { colors, px, size, styles } from "../styles";
import { useEffectAsync } from "../hooks/async-hooks";
import { getSingleMovie } from "../services/movies";
import { SingleMovieScreenRouteProps } from "../routing";
import { useRoute } from "@react-navigation/core";
import { useContext } from "react";
import { MovieContext } from "../contexts/movie-context";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SingleMovie = () => {
    const [movie, setMovie] = useState<any>();
    const route = useRoute<SingleMovieScreenRouteProps>();
    const [contextMovies] = useContext(MovieContext);
    const netInfo = useNetInfo();
    useEffectAsync(async () => {
        try {
            const response = await getSingleMovie(route.params.id);
            setMovie(response);
        } catch (e: any) {
            console.log(e);
        }
    });
    useEffectAsync(async () => {
        if (netInfo.isConnected === false) {
            const items = await AsyncStorage.getItem("MOVIE_LIST");
            const offlineMovies = JSON.parse(items!);
            const retrievedMovie = offlineMovies.filter((movie) => movie.id == route.params.id);
            setMovie(retrievedMovie);
        } //this does not work properly yet
    }, [netInfo.isConnected]);
    if (!movie) return <></>;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={{ flex: 1, padding: px(25) }}>
                    <View style={{ width: px(250), height: px(375), backgroundColor: "gray", alignSelf: "center" }}>
                        {movie.poster_path ? (
                            <></>
                        ) : (
                            <Text style={{ color: "white", alignSelf: "center", marginTop: px(40) }}>Problem fetching image</Text>
                        )}
                        <Image
                            style={size(250, 375)}
                            source={{ uri: ("https://image.tmdb.org/t/p/w500" + movie.poster_path) as string }} //build image URL
                        ></Image>
                    </View>
                    <Text style={{ color: "white", margin: px(20), fontSize: px(20) }}>{movie.title}</Text>
                    <View style={{ flexDirection: "row", margin: px(10) }}>
                        <Text style={{ color: colors.coolRed }}>Release date: </Text>
                        <Text style={{ color: "white" }}>{movie.release_date}</Text>
                    </View>
                    <Text style={{ color: "white" }}> {movie.overview}</Text>
                    <View style={styles.flex_grow_1}></View>
                    <View style={{ flexDirection: "row", margin: px(10) }}>
                        <Text style={{ color: colors.coolRed }}>Score </Text>
                        <Text style={{ color: "white" }}>{movie.vote_average}</Text>
                    </View>
                    <View style={{ flexDirection: "row", margin: px(10) }}>
                        <Text style={{ color: colors.coolRed }}>Vote count: </Text>
                        <Text style={{ color: "white" }}>{movie.vote_count}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
