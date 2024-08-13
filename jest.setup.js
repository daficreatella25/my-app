import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("expo-router");

jest.mock("@/constants/Colors", () => ({
  default: {
    light: { tint: "#000000" },
    dark: { tint: "#ffffff" },
  },
}));
