import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.content}>
      <Button onPress={() => router.push("/timer")} type="clear">
        <Ionicons name="timer" size={28} color={"white"} />
        <ThemedText>タイマー</ThemedText>
      </Button>
      <Button onPress={() => router.push("/counter")} type="clear">
        <MaterialCommunityIcons size={28} name="counter" color={"white"} />
        <ThemedText>ロアカウンター</ThemedText>
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    bottom: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
});
