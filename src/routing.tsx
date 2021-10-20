import { NavigationContainer, RouteProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { HomeScreen } from "./pages/home-screen";
import { SingleMovie } from "./pages/movie";
import { SearchMovie } from "./pages/movie-search";
import { TopMovies } from "./pages/movies-top";
import { screenOptions } from "./styles";
export type RootStackParamList = {
    Home: undefined;
    SearchMovie: undefined,
    SingleMovie: undefined,
    TopMovies: undefined
};

export type ScreenNavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Group screenOptions={screenOptions as {}}>
                    <Stack.Screen name="Home"  component={HomeScreen} />
                    <Stack.Screen name="SearchMovie" component={SearchMovie} />
                    <Stack.Screen name="SingleMovie" component={SingleMovie} />
                    <Stack.Screen name="TopMovies" component={TopMovies} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
