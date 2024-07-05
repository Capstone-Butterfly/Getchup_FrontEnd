import { StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({
    ButtonDefault: {
        backgroundColor: "#006655",
        borderRadius: 10,
        height: 48,
        width: "100%",
    },
    TypographyH1: {
        color: "#222222",
        fontFamily: "WorkSans_700Bold",
        fontSize: 24,
        letterSpacing: -0.02,
        lineHeight: 30,
    },
    TypographyH2: {
        color: "#222222",
        fontFamily: "WorkSans_600SemiBold",
        fontSize: 20,
        letterSpacing: -0.02,
        lineHeight: 24,
    },
    TypographyH3: {
        color: "#222222",
        fontFamily: "WorkSans_600SemiBold",
        fontSize: 16,
        letterSpacing: -0.02, 
        lineHeight: 22,
    },
    TypographyBody: {
        color: "#222222",
        fontFamily: "Archivo_400Regular",
        fontSize: 16,
        lineHeight: 22,
    },
    TypographyBodyHeavy: {
        color: "#222222",
        fontFamily: "Archivo_600SemiBold",
        fontSize: 16,
        lineHeight: 22,
    },
    TypographyBodyHeavyStrikethrough: {
        color: "#222222",
        fontFamily: "Archivo_600SemiBold",
        fontSize: 16,
        lineHeight: 22,
        textDecorationLine: "line-through",
    },
    TypographyBodySmall: {
        color: "#222222",
        fontFamily: "Archivo_400Regular",
        fontSize: 14,
        lineHeight: 19,
    },
    TypographyBodySmallHeavy: {
        color: "#222222",
        fontFamily: "Archivo_600SemiBold",
        fontSize: 14,
        lineHeight: 19,
    },
    TypographyLabelSmall: {
        color: "#222222",
        fontFamily: "Archivo_400Regular",
        fontSize: 11,
        lineHeight: 14,
    },
    TypographyLabelSmallHeavy: {
        color: "#222222",
        fontFamily: "Archivo_600SemiBold",
        fontSize: 11,
        lineHeight: 14,
    },
    TypographyLink: {
        color: "#222222",
        fontFamily: "Archivo_600SemiBold",
        fontSize: 16,
        lineHeight: 22,
        textDecorationLine: "underline",
    },
});

export {defaultStyles}