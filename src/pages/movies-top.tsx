import { View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import { colors, px, styles } from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import { useEffectAsync } from "../hooks/async-hooks";
import { getTopMovies } from "../services/movies";
import { ScreenNavigationProps } from "../routing";
import { StyledButton } from "../components/custom-button";
import { MovieContext } from "../contexts/movie-context";

export const MovieItem = (p: { movie: any }) => {
    //reusable component,used in both search and top screens
    const navigation = useNavigation<ScreenNavigationProps>();
    if (!p.movie) return <></>;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("SingleMovie", { id: p.movie.id })}
            key={p.movie.id}
            style={{ margin: px(10), borderColor: "gray", borderWidth: px(1), borderRadius: px(5) }}
        >
            <View style={{ flexDirection: "row", height: px(60), padding: px(10), justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "white", maxWidth: px(250) }}>{p.movie.title}</Text>
                <View style={styles.flex_grow_1}></View>
                <Text style={{ color: colors.coolRed }}>{p.movie.vote_average}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const TopMovies = () => {
    const [movies, setMovies] = useState<any[]>();
    const [page, setPage] = useState<number>(1);
    const [, setContextMovies] = useContext(MovieContext);

    useEffectAsync(async () => {
        //using this hook to retrieve data asynchronously
        try {
            const response = await getTopMovies(page);
            setMovies(response.results);
            setContextMovies(response.results); //set global last accessed top page movies for storing
        } catch (e: any) {
            console.log(e);
        }
    }, [page]);
    if (!movies) return <View></View>;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ color: "white", fontSize: px(30), textAlign: "center" }}>Welcome to the movie top!</Text>
            <ScrollView style={{ padding: px(10) }} horizontal={false} showsVerticalScrollIndicator={false}>
                {movies.map((movie) => {
                    return <MovieItem key={movie.id} movie={movie} />;
                })}
            </ScrollView>
            <View style={{ flexDirection: "row", margin: px(10), justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: px(100) }}>
                    <StyledButton
                        text="back"
                        style={{ borderRadius: px(20), marginLeft: px(30) }}
                        disabled={page < 2}
                        variant={page < 2 ? "disabled" : "primary"}
                        onPress={() => setPage(page - 1)}
                    ></StyledButton>
                </View>
                <View style={styles.flex_grow_1}></View>
                <Text style={{ color: "white", margin: px(5) }}>Page {page}</Text>
                <View style={styles.flex_grow_1}></View>
                <View style={{ width: px(100) }}>
                    <StyledButton
                        text="next"
                        style={{ borderRadius: px(20), marginRight: px(30) }}
                        onPress={() => setPage(page + 1)}
                    ></StyledButton>
                </View>
            </View>
        </SafeAreaView>
    );
};
