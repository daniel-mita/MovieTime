import { Dimensions, PixelRatio, StyleProp, StyleSheet } from "react-native";

export const { width, height } = Dimensions.get("window");
export const dpi = PixelRatio.get();

export function toStyleArray<T>(style: StyleProp<T>) {
    return style && "map" in style ? style : [style];
}

export function px(value: number) {
    return (value * width) / 400;
}

export function size(width: number, height?: number) {
    return {
        width: px(width),
        height: px(height ?? width),
    };
}

export const colors = {
    fancyBlue: "#3C5082",
    coolGray: "#605f5f",
    coolRed: "#FF4155"
};

export const styles = StyleSheet.create({
    textCenter: {
        textAlign: "center",
    },
    center: {
        alignSelf: "center",
    },
    flex_grow_1: {
        flexGrow: 1,
    },
    headerText: {
        fontSize: px(30),
        fontWeight: "bold",
        color: "white"
    },
});

export const screenOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: colors.fancyBlue },
};
