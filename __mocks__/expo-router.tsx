import React from "react";
import { View, Text } from "react-native";

const Tabs: React.FC<{ children: React.ReactNode }> & {
  Screen: React.FC<any>;
} = ({ children }) => <View>{children}</View>;
Tabs.Screen = ({ options }: { options: { title: string } }) => (
  <Text>{options.title}</Text>
);

export { Tabs };
