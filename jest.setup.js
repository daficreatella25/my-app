import "react-native-gesture-handler/jestSetup";
import "@testing-library/jest-native/extend-expect";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("expo-router", () => ({
  useRootNavigationState: jest.fn(),
  useLocalSearchParams: jest.fn(),
  Link: "Link",
}));

jest.mock("@/constants/Colors", () => ({
  default: {
    light: { tint: "#000000" },
    dark: { tint: "#ffffff" },
  },
}));

// Mock the SafeAreaView component
jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");
  return {
    SafeAreaView: View,
    SafeAreaProvider: ({ children }) => children,
  };
});

// Mock the FlatList component
jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");
  RN.FlatList = jest.fn().mockImplementation(({ data, renderItem }) => {
    return (
      <RN.View>
        {data.map((item, index) => (
          <RN.View key={index}>{renderItem({ item, index })}</RN.View>
        ))}
      </RN.View>
    );
  });
  return RN;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");