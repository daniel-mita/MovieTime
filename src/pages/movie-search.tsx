import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, TextInput } from "react-native";
import { useEffectAsync } from "../hooks/async-hooks";
import { ScreenNavigationProps } from "../routing";
import { getMoviesBySearch, getPopularMovies, getTopMovies } from "../services/movies";
import { px, styles, width } from "../styles";

export const SearchMovie = () => {
    const navigation = useNavigation<ScreenNavigationProps>();
    const [searchInput, setSearchInput] = useState<string>("");
    const [movies, setMovies] = useState<any[]>();
    useEffectAsync(async () => {
        try {
            if (searchInput.length > 0) {
                const response = await getMoviesBySearch(searchInput);
                setMovies(response.results);
            } else {
                const response = await getPopularMovies();;
                setMovies(response.results);
            }
        } catch (e: any) {
            console.log(e);
        }
    }, [searchInput]);
    if (!movies) return <View></View>;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: px(10) }}>
                <View style={[styles.flex_row, { alignItems: "center", backgroundColor: "#eeeef5", borderRadius: px(10), height: px(50) }]}>
                    <TextInput
                        placeholder={"Search"}
                        placeholderTextColor="#a4a3b1"
                        onChangeText={(val) => setSearchInput(val)}
                        value={searchInput}
                        style={[
                            {
                                fontSize: px(15),
                                color: "black",
                                width: width,
                                paddingBottom: px(0),
                                paddingTop: px(0),
                                paddingLeft: px(20),
                            },
                        ]}
                    />
                </View>
                <ScrollView horizontal={false} showsVerticalScrollIndicator={true}>
                {movies.map((movie) => {
                    return <TouchableOpacity onPress={() => navigation.navigate("SingleMovie", {id: movie.id})} key={movie.id} style={{ margin: px(20), borderColor: "gray" }}>
                        <Text style={{color: 'white'}}>{movie.title}</Text>
                    </TouchableOpacity>;
                })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
