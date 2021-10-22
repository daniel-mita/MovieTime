import { Dimensions, PixelRatio, StyleProp, StyleSheet } from "react-native";

export const { width, height } = Dimensions.get("window");
export const dpi = PixelRatio.get();

export function px(value: number) {
    return (value * width) / 400;
}
//scalability for different device screen ratio

export function toStyleArray<T>(style: StyleProp<T>) {
    return style && "map" in style ? style : [style];
} //accept local style + styles given when used

export function size(width: number, height?: number) {
    return {
        width: px(width),
        height: px(height ?? width),
    };
}

export const colors = {
    fancyBlue: "#3C5082",
    coolGray: "#605f5f",
    coolRed: "#FF4155",
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
        color: "white",
    },
    flex_row: {
        flexDirection: "row",
    },
});

export const HomescreenOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: colors.fancyBlue },
};

export const screenOptions = {
    cardStyle: { backgroundColor: colors.fancyBlue },
    headerTintColor: "white",
};
