import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { StyledButton } from "../components/custom-button";
import { ScreenNavigationProps } from "../routing";
import { px, styles, size, colors } from "../styles";

export function HomeScreen() {
    const navigation = useNavigation<ScreenNavigationProps>();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: px(25) }}>
                <View style={styles.flex_grow_1}></View>
                <View style={[styles.center]}>
                    <Image style={size(250, 250)} source={require("../../assets/clapperboard.png")}></Image>
                    {/* using size for images so that they scale for different screen sizes */}
                </View>
                <View style={styles.flex_grow_1}></View>
                <Text style={[styles.headerText, styles.textCenter, { marginTop: px(50), marginBottom: px(10) }]}>
                    Welcome to MovieTime!
                </Text>
                <View style={{ margin: px(15) }}>
                    <StyledButton text="Top movies" onPress={() => navigation.navigate("TopMovies")} />
                </View>
                <View style={{ margin: px(15) }}>
                    <StyledButton text="Search movie" onPress={() => navigation.navigate("SearchMovie")} />
                </View>
            </View>
        </SafeAreaView>
    );
}
