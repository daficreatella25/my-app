import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Link href="/page2">Go to Page 2</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // You can keep other styles if needed
});
