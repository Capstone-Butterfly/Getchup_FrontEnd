import { StyleSheet } from "react-native";
import { config } from "./themeConfig";

const defaultStyles = StyleSheet.create({
    ButtonDefault: {
        backgroundColor: config.tokens.colors.primaryDark,
        borderRadius: 10,
        height: 48,
        width: "100%",
    },
    Card: {
        borderRadius: 20,
        shadowColor: 'rgba(229, 229, 229, 0.35)',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 5,
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: config.tokens.colors.white,
    },
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
    card: {
        backgroundColor: config.tokens.colors.white,
        padding: 20,
        marginVertical: 12,
        borderRadius: 20,
        // elevation: 3,
        // width: '100%',
    },
    
    buttonVariant3: {
        borderRadius: 10,
        backgroundColor: config.tokens.colors.white,
        borderColor: config.tokens.colors.primaryDark,
        borderWidth: 2
    },
});

export {defaultStyles}