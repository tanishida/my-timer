import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomSlider } from "@/components/ui/CustomSlider";
import { TimerSetting } from "@/components/ui/TimerSetting";

export default function HomeScreen() {
  const [timeLimit, setTimeLimit] = useState(0);
  const [alert1, setAlert1] = useState(0);
  const [alert2, setAlert2] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const onStart = async () => {
    try {
      await AsyncStorage.setItem("timeLimit", timeLimit.toString());
      await AsyncStorage.setItem("alert1", alert1.toString());
      await AsyncStorage.setItem("alert2", alert2.toString());
      setIsStarted(true);
    } catch (error) {
      console.error("Error starting timer:", error);
    }
  };
  const getData = async () => {
    try {
      const timeLimit = await AsyncStorage.getItem("timeLimit");
      const alert1 = await AsyncStorage.getItem("alert1");
      const alert2 = await AsyncStorage.getItem("alert2");
      setTimeLimit(timeLimit ? parseInt(timeLimit, 10) : 30);
      setAlert1(alert1 ? parseInt(alert1, 10) : 20);
      setAlert2(alert2 ? parseInt(alert2, 10) : 25);
    } catch (e) {
      console.error("Error reading data:", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ThemedView style={styles.content}>
      <ThemedView style={{ marginTop: 10 }} />
      {isStarted ? (
        <TimerSetting
          setIsStarted={setIsStarted}
          timeLimit={timeLimit}
          alert1={alert1}
          alert2={alert2}
        />
      ) : (
        <ThemedView>
          <CustomSlider
            time={timeLimit}
            title="制限時間の設定"
            onChange={(v) => {
              setTimeLimit(v);
              if (alert1 >= v) setAlert1(v - 2 === -1 || v === 0 ? 0 : v - 2);
              if (alert2 >= v) setAlert2(v - 1 === -1 || v === 0 ? 0 : v - 1);
            }}
            headerStyle={styles.subHeader}
            maximumValue={30}
            iconColor="#2089dc"
            type="limit"
            limit={timeLimit}
          />
          <CustomSlider
            time={alert1}
            title="アラート1の設定"
            onChange={setAlert1}
            headerStyle={styles.subHeader2}
            maximumValue={30}
            iconColor="#ff7f50"
            type="alert"
            limit={timeLimit}
          />
          <CustomSlider
            time={alert2}
            title="アラート2の設定"
            onChange={setAlert2}
            headerStyle={styles.subHeader3}
            maximumValue={30}
            iconColor="#ff0000"
            type="alert"
            limit={timeLimit}
          />
          <Button
            style={{ marginTop: 50 }}
            color="secondary"
            onPress={onStart}
            disabled={
              timeLimit === 0 ||
              (alert1 >= timeLimit && alert1 > 0) ||
              (alert2 >= timeLimit && alert2 > 0) ||
              (alert1 >= alert2 && alert1 > 0 && alert2 > 0)
            }
          >
            {`${timeLimit}分タイマー開始`}
          </Button>
        </ThemedView>
      )}
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
    overflow: "visible",
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
  },
  subHeader2: {
    backgroundColor: "#ff7f50",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
  },
  subHeader3: {
    backgroundColor: "#ff0000",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
  },
});
