import { NavigationContainer, RouteProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { HomeScreen } from "./pages/home-screen";
import { ModalScreen } from "./pages/modal-screen";
import { SingleMovie } from "./pages/movie";
import { SearchMovie } from "./pages/movie-search";
import { TopMovies } from "./pages/movies-top";
import { colors, HomescreenOptions, px, screenOptions } from "./styles";
export type RootStackParamList = {
    //navigator screen types
    Home: undefined;
    SearchMovie: undefined;
    SingleMovie: { id: string };
    TopMovies: undefined;
    Modal: undefined;
};

export type ScreenNavigationProps = StackNavigationProp<RootStackParamList>;
export type SingleMovieScreenRouteProps = RouteProp<RootStackParamList, "SingleMovie">; //build route prop types for screen

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
    //separate component for navigator
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Group screenOptions={HomescreenOptions as {}}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={screenOptions as {}}>
                    <Stack.Screen
                        options={{
                            title: "Search your favorite title",
                            headerStyle: { backgroundColor: colors.fancyBlue, height: px(80), elevation: 0 },
                        }}
                        name="SearchMovie"
                        component={SearchMovie}
                    />
                    <Stack.Screen
                        options={{ title: "", headerStyle: { backgroundColor: colors.fancyBlue, height: px(80), elevation: 0 } }} //custom inline styling for every screen
                        name="SingleMovie"
                        component={SingleMovie}
                    />
                    <Stack.Screen
                        options={{ title: "", headerStyle: { backgroundColor: colors.fancyBlue, height: px(80), elevation: 0 } }}
                        name="TopMovies"
                        component={TopMovies}
                    />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                    <Stack.Screen name="Modal" component={ModalScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
