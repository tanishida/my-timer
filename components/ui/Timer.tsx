import React, { FC, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { Button, Dialog, Chip } from "@rneui/themed";
import { ThemedView } from "@/components/ThemedView";
import { useTimer } from "react-timer-hook";
import { ThemedText } from "@/components/ThemedText";
import { Collapsible } from "@/components/Collapsible";
import { Audio } from "expo-av";
import CircularProgress from "react-native-circular-progress-indicator";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  setIsStarted: (isStarted: boolean) => void;
  timeLimit: number;
  alert1: number;
  alert2: number;
  audio1: Audio.Sound | null;
  audio2: Audio.Sound | null;
  finishAudio: Audio.Sound | null;
};

export const Timer: FC<Props> = (props) => {
  const {
    setIsStarted,
    timeLimit,
    alert1,
    alert2,
    audio1,
    audio2,
    finishAudio,
  } = props;
  const [isFinishAlert1, setFinishAlert1] = useState(false);
  const [isFinishAlert2, setFinishAlert2] = useState(false);
  const { width } = Dimensions.get("window");

  const playSound1 = async () => {
    await audio1?.playAsync();
  };
  const stopSound1 = async () => {
    await audio1?.stopAsync();
  };
  const playSound2 = async () => {
    await audio2?.playAsync();
  };
  const stopSound2 = async () => {
    await audio2?.stopAsync();
  };
  const playFinishSound = async () => {
    await finishAudio?.playAsync();
  };
  const stopFinishSound = async () => {
    await finishAudio?.stopAsync();
  };

  const [finishedDialogVisible, setFinishedDialogVisible] = useState(false);
  const color = useThemeColor({}, "text");
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeLimit * 60);
  const { resume, pause, seconds, minutes, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    interval: 20,
  });

  const getSize = useCallback(
    (defualt: number) => {
      if (width > 390) {
        return defualt;
      }
      return defualt - (390 - width) / 2;
    },
    [width],
  );

  useEffect(() => {
    if (alert1 > 0 && timeLimit - alert1 > minutes && !isFinishAlert1) {
      playSound1();
      setFinishAlert1(true);
    }
    if (alert2 > 0 && timeLimit - alert2 > minutes && !isFinishAlert2) {
      playSound2();
      setFinishAlert2(true);
    }
    if (minutes === 0 && seconds === 0 && !isRunning) {
      playFinishSound();
      setFinishAlert1(false);
      setFinishAlert2(false);
    }
  }, [timeLimit, minutes, seconds, alert1, alert2]);

  return (
    <ThemedView>
      {alert1 > 0 ? (
        <ThemedView style={{ alignItems: "center" }}>
          <Chip
            icon={{
              name: isFinishAlert1 ? "check-circle" : "circle",
              type: "font-awesome",
              size: 20,
              color: isFinishAlert1 ? "" : "white",
            }}
            disabled={isFinishAlert1}
            color="#ff7f50"
            title={`アラート1 : ${timeLimit - alert1}分`}
          />
        </ThemedView>
      ) : null}
      {alert2 > 0 ? (
        <ThemedView style={{ alignItems: "center" }}>
          <Chip
            icon={{
              name: isFinishAlert2 ? "check-circle" : "circle",
              type: "font-awesome",
              size: 20,
              color: isFinishAlert2 ? "" : "white",
            }}
            disabled={isFinishAlert2}
            color="#ff0000"
            title={`アラート2 : ${timeLimit - alert2}分`}
            containerStyle={{ marginVertical: 15 }}
          />
        </ThemedView>
      ) : null}
      <ThemedView style={{ marginTop: 10 }} />
      <ThemedView>
        <CircularProgress
          value={seconds}
          maxValue={60}
          radius={getSize(160)}
          progressValueColor={"#ecf0f1"}
          title={`${minutes}分`}
          titleColor={color}
          titleStyle={{
            fontSize: getSize(90),
            lineHeight: getSize(100),
            fontWeight: "bold",
          }}
          valueSuffix={"秒"}
          progressValueStyle={{
            fontSize: getSize(50),
            lineHeight: getSize(60),
          }}
        />
      </ThemedView>
      <ThemedView style={{ marginTop: 50 }} />
      <Button
        style={{ marginBottom: 30 }}
        color="success"
        onPress={() => {
          if (isRunning || (!isRunning && seconds + minutes > 0)) {
            setFinishedDialogVisible(true);
          } else {
            setIsStarted(false);
          }
        }}
      >
        終了
      </Button>
      <ThemedView style={{ marginTop: 10 }}>
        <Collapsible title="操作メニュー">
          <Button
            style={{ marginBottom: 5 }}
            disabled={isRunning || seconds + minutes === 0}
            onPress={resume}
          >
            スタート
          </Button>
          <Button
            style={{ marginBottom: 5 }}
            disabled={!isRunning || seconds + minutes === 0}
            onPress={pause}
          >
            ストップ
          </Button>
        </Collapsible>
      </ThemedView>

      <Dialog
        isVisible={finishedDialogVisible}
        onBackdropPress={() => setFinishedDialogVisible(false)}
      >
        <Dialog.Title title="タイマーの終了" />
        <Text>{`残り時間${minutes}分${seconds}秒`}</Text>
        <Text>タイマーを終了しますか？</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="はい"
            onPress={() => {
              stopSound1();
              stopSound2();
              stopFinishSound();
              setFinishedDialogVisible(false);
              setIsStarted(false);
              setFinishAlert1(false);
              setFinishAlert2(false);
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  alertTextContent: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 30,
  },
});
