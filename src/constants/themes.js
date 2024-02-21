import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window")

export const STYLES = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const COLORS = {
    DEFAULT_PRIMARY: "#009aca",
    DEFAUT_WHITE: "#fff",
    DEFAUT_WHITE2: "#eeeeee",
    DEFAULT_GREEN: "#0A8791",
    DEFAULT_GRAY: "#B4B4B3",
    DEFAULT_YELLOW: "yellow",
    DEFAULT_HIGHLIGHT: "#fdcb6e",
    DEFAULT_COMMENT: "#00b894",
    LIGHT_PRIMARY: "#7FCCE4",
    LIGHT_GREEN: "#dfdf",
    LIGHT_WHITE: "#ffffff",

    //bootstrap
    primary: "#0d6efd",
    danger: "#dc3545",
    warning: "#ffc107",
    secondary: "#6c757d",
    success: "#198754",
    info: "#0dcaf0",
    default: "#f8f9fa",

    //epub theme
    epubDark: "#121212",
    epubLight: "#fafafa",
    epubTan: "tan",
    colorTan: "#ccc"
}

export const SIZES = {
    // global sizes
    base: 10,
    radius: 6,
    vertical: 10,
    horizontal: 10,
    elevation: 5,
    text: 14,
    title: 18,
    icon: 20,
    lagreIcon: 25,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    //app dimensions
    width,
    height,

    //epub font size
    epubMin: 50,
    epubMax: 300,
    epubSize: 100,
    epubStep: 10
}

export const FONTS = Object.freeze({
    largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "Roboto-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 20 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 18 },
    h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: 18 },
    body1: { fontFamily: "Roboto-Medium", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Medium", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Medium", fontSize: SIZES.body3, lineHeight: 20 },
    body4: { fontFamily: "Roboto-Medium", fontSize: SIZES.body4, lineHeight: 18 },
    body5: { fontFamily: "Roboto-Medium", fontSize: SIZES.body5, lineHeight: 18 },
})