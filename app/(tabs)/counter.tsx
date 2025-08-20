import React, { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card, Button, Text } from "@rneui/themed";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import * as Haptics from "expo-haptics";

export default function TabTwoScreen() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <ThemedView style={styles.content}>
      <Card containerStyle={styles.cardContent1}>
        <Text style={styles.textContents}>
          {count2 >= 20 ? "🐶負け🐶" : count >= 20 ? "🏅勝ち🏅" : count}
        </Text>
        <Button
          title="+"
          color="secondary"
          onPress={() => {
            if (process.env.EXPO_OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            setCount(count + 1);
          }}
          style={{ marginBottom: 10 }}
          disabled={count >= 20}
        />
        <Button
          title="-"
          color="secondary"
          onPress={() => {
            if (process.env.EXPO_OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            setCount(count - 1);
          }}
          disabled={count <= 0}
        />
      </Card>
      <ThemedText
        style={{
          transform: "scaleX(-1) scaleY(-1)",
          fontSize: 20,
        }}
      >{`相手：${count2}`}</ThemedText>
      <ThemedView style={{ marginTop: 120 }} />
      <ThemedText
        style={{ textAlign: "left", fontSize: 20 }}
      >{`相手：${count}`}</ThemedText>
      <Card>
        <Text style={styles.textContents}>
          {count >= 20 ? "🐶負け🐶" : count2 >= 20 ? "🏅勝ち🏅" : count2}
        </Text>
        <Button
          title="+"
          onPress={() => {
            if (process.env.EXPO_OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            setCount2(count2 + 1);
          }}
          style={{ marginBottom: 10 }}
          disabled={count2 >= 20}
        />
        <Button
          title="-"
          onPress={() => {
            if (process.env.EXPO_OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            setCount2(count2 - 1);
          }}
          disabled={count2 <= 0}
        />
      </Card>
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
  textContents: {
    fontSize: 40,
    lineHeight: 50,
    textAlign: "center",
  },
  cardContent1: {
    transform: "scaleX(-1) scaleY(-1)",
  },
});
