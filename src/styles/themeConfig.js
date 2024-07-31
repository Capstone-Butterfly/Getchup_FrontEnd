import { createConfig } from "@gluestack-style/react";

export const config = createConfig({
  tokens: {
    colors: {
      primary: "#AFCFCC", // Primary
      primaryDark: "#006655", // Primary - Dark
      background: "#D1D1D1", // Background
      white: "#FFFFFF", // White
      brandingAccent: "#E3281C", // Branding / Accent
      highPriority: "#F1938E", // High Priority
      mediumPriority: "#EFE37D", // Medium Priority
      blue: "#94B6EF", // Blue
      neutralLight: "#D1D1D1", // Neutral - Light
      neutral: "#BFBFBF", // Neutral
      neutralDark: "#808080", // Neutral - Dark
      black: "#222222", // Black
      lightBlack: "#545F71",
      lighterBlack: "#9BA5B7",
      shadowGray: "#E5E5E5",
      neutralLightModal: "#E6E6E6"
    },
    spacing: {
      xs: 5,
      sm: 15,
      md: 25,
      lg: 40,
      xl: 50,
    },
    borderRadius: {
      sm: 10,
      md: 20,
      lg: 50,
      xl: 150,
    },
  },
});