import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Shake } from "@/components/Shake";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Home() {
  const router = useRouter();
  const color = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.content}>
      <ThemedView >
        <Shake />
      </ThemedView>
      <Button onPress={() => router.push("/timer")} type="clear">
        <Ionicons name="timer" size={28} color={color} />
        <ThemedText>タイマー</ThemedText>
      </Button>
      <Button onPress={() => router.push("/counter")} type="clear">
        <MaterialCommunityIcons size={28} name="counter" color={color} />
        <ThemedText>ロアカウンター</ThemedText>
      </Button>
      <Button onPress={() => router.push("/editer")} type="clear">
        <FontAwesome size={28} name="edit" color={color} />
        <ThemedText>対戦の記録</ThemedText>
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
