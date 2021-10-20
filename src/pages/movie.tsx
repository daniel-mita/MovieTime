import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { px } from "../styles";
import { useEffectAsync } from "../hooks/async-hooks";
import { getSingleMovie } from "../services/movies";
import { SingleMovieScreenRouteProps } from "../routing";
import { useRoute } from "@react-navigation/core";

export const SingleMovie = () => {
    const [movie, setMovie] = useState<any>();
    const route = useRoute<SingleMovieScreenRouteProps>();
    useEffectAsync(async () => {
        try{
        const response = await getSingleMovie(route.params.id);
        console.log(response)
        setMovie(response);
        }catch(e: any){
            console.log(e);
        }
        
    });
    if(!movie) return <></>
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: px(25) }}>
                <Text>{movie.title}</Text>
            </View>
        </SafeAreaView>
    );
};
