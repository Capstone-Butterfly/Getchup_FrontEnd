import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
    TypographyH1: {
        color: '#222222',
        fontFamily: 'WorkSans_700Bold',
        fontSize: '24px',
        letterSpacing: '-2%',
        // lineHeight: '30px',
    },
    TypographyH2: {
        color: '#222222',
        fontFamily: 'WorkSans_600SemiBold',
        fontSize: '20px',
        letterSpacing: '-2%',
        // lineHeight: '24px',
    },
    TypographyH3: {
        color: '#222222',
        fontFamily: 'WorkSans_600SemiBold',
        fontSize: '16px',
        letterSpacing: '-2%', 
        // lineHeight: '22px',
    },
    TypographyBody: {
        color: '#222222',
        fontFamily: 'Archivo_400Regular',
        fontSize: '16px',
        // lineHeight: '22px',
    },
    TypographyBodyHeavy: {
        color: '#222222',
        fontFamily: 'Archivo_600SemiBold',
        fontSize: '16px',
        // lineHeight: '22px',
    },
    TypographyBodyHeavyStrikethrough: {
        color: '#222222',
        fontFamily: 'Archivo_600SemiBold',
        fontSize: '16px',
        // lineHeight: '22px',
        textDecorationLine: 'line-through'
    },
    TypographyBodySmall: {
        color: '#222222',
        fontFamily: 'Archivo_400Regular',
        fontSize: '14px',
        // lineHeight: '19px',
    },
    TypographyBodySmallHeavy: {
        color: '#222222',
        fontFamily: 'Archivo_600SemiBold',
        fontSize: '14px',
        // lineHeight: '19px',
    },
    TypographyLabelSmall: {
        color: '#222222',
        fontFamily: 'Archivo_400Regular',
        fontSize: '11px',
        // lineHeight: '14px',
    },
    TypographyLabelSmallHeavy: {
        color: '#222222',
        fontFamily: 'Archivo_600SemiBold',
        fontSize: '11px',
        // lineHeight: '14px',
    },
    TypographyLink: {
        color: '#222222',
        fontFamily: 'Archivo_600SemiBold',
        fontSize: '16px',
        // lineHeight: '22px',
        textDecorationLine: 'underline'
    },
});

export {defaultStyles}