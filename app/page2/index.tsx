import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function Page2Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Page 2</Text>
      <Link href="/">Go back to Home</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
