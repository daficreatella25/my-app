import { COLORS } from '@/styles/colors';
import { View, type ViewProps } from 'react-native';


export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = COLORS.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
