import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function TabThreeScreen() {
  return (
    <ThemedView style={styles.content}>
        <ThemedText style={{textAlign: "center"}}>Comming soon!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    top: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
});
