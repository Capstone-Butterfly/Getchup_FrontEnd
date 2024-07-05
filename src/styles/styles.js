import { StyleSheet } from "react-native";
import { config } from "./themeConfig";
const defaultStyles = StyleSheet.create({
    TypographyH1: {
        fontFamily: "WorkSans_700Bold",
        fontSize: 24,
        letterSpacing: -0.02,
        lineHeight: 30,
    },
    TypographyH2: {
        fontFamily: "WorkSans_600SemiBold",
        fontSize: 20,
        letterSpacing: -0.02,
        lineHeight: 24,
    },
    TypographyH3: {
        fontFamily: "WorkSans_600SemiBold",
        fontSize: 16,
        letterSpacing: -0.02, 
        lineHeight: 22,
    },
    TypographyBody: {
        fontFamily: "Archivo_400Regular",
        fontSize: 16,
        lineHeight: 22,
    },
    TypographyBodyHeavy: {
        fontFamily: "Archivo_600SemiBold",
        fontSize: 16,
        lineHeight: 22,
    },
    TypographyBodyHeavyStrikethrough: {
        fontFamily: "Archivo_600SemiBold",
        fontSize: 16,
        lineHeight: 22,
        textDecorationLine: "line-through",
    },
    TypographyBodySmall: {
        fontFamily: "Archivo_400Regular",
        fontSize: 14,
        lineHeight: 19,
    },
    TypographyBodySmallHeavy: {
        fontFamily: "Archivo_600SemiBold",
        fontSize: 14,
        lineHeight: 19,
    },
    TypographyLabelSmall: {
        fontFamily: "Archivo_400Regular",
        fontSize: 11,
        lineHeight: 14,
    },
    TypographyLabelSmallHeavy: {
        fontFamily: "Archivo_600SemiBold",
        fontSize: 11,
        lineHeight: 14,
    },
    TypographyLink: {
        fontFamily: "Archivo_600SemiBold",
        fontSize: 16,
        lineHeight: 22,
        textDecorationLine: "underline",
    },
});

export {defaultStyles}