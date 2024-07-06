import { createConfig } from "@gluestack-style/react";

export const config = createConfig({
  tokens: {
    colors: {
      primary: "#AFCFCC", // Primary
      primaryDark: "#006655", // Primary - Dark
      background: "#FAF9F9", // Background
      white: "#FFFFFF", // White
      brandingAccent: "#E3281C", // Branding / Accent
      highPriority: "#F1938E", // High Priority
      mediumPriority: "#EFE37D", // Medium Priority
      blue: "#94B6EF", // Blue
      neutralLight: "#E6E6E6", // Neutral - Light
      neutral: "#BFBFBF", // Neutral
      neutralDark: "#808080", // Neutral - Dark
      black: "#222222", // Black
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