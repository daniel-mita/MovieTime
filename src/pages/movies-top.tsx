import { View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { px, styles } from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import { useEffectAsync } from "../hooks/async-hooks";
import { getTopMovies } from "../services/movies";
import { Movie } from "../models/movieModel";
import { ScreenNavigationProps } from "../routing";
import { StyledButton } from "../components/custom-button";

export const TopMovies = () => {
    const navigation = useNavigation<ScreenNavigationProps>();
    const [movies, setMovies] = useState<any[]>();
    const [page, setPage] = useState<number>(1);
    useEffectAsync(async () => {
        try {
            const response = await getTopMovies(page);
            setMovies(response.results);
        } catch (e: any) {
            console.log(e);
        }
    }, [page]);
    if (!movies) return <View></View>;
    return (
        <SafeAreaView style={{ flex: 1, marginTop: px(15) }}>
            <Text style={{ color: "white", fontSize: px(30), textAlign: "center" }}>Welcome to the movie top!</Text>
            <ScrollView style={{ padding: px(10) }} horizontal={false} showsVerticalScrollIndicator={false}>
                {console.log(movies[1])}
                {movies.map((movie) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SingleMovie", { id: movie.id })}
                            key={movie.id}
                            style={{ margin: px(20), borderColor: "gray"}}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "white" }}>{movie.title}</Text>
                                <View style={styles.flex_grow_1}></View>
                                <Text style={{ color: "white" }}>{movie.vote_average}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: px(100) }}>
                    <StyledButton
                        text="back"
                        disabled={page < 2}
                        variant={page < 2 ? "disabled" : "primary"}
                        onPress={() => setPage(page - 1)}
                    ></StyledButton>
                </View>
                <Text>Page: {page}</Text>
                <View style={{ width: px(100) }}>
                    <StyledButton text="next" onPress={() => setPage(page + 1)}></StyledButton>
                </View>
            </View>
        </SafeAreaView>
    );
};
