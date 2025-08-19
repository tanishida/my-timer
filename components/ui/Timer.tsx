import React, { FC, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog, Chip } from "@rneui/themed";
import { ThemedView } from "@/components/ThemedView";
import { useTimer } from "react-timer-hook";
import { ThemedText } from "@/components/ThemedText";
import { Collapsible } from "@/components/Collapsible";
import { Audio } from "expo-av";

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
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeLimit * 60);
  const { resume, pause, seconds, minutes, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    interval: 20,
  });

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
      <ThemedText style={styles.munitesTextContent}>{minutes}分</ThemedText>
      <ThemedText style={styles.secondTextContent}>{seconds}秒</ThemedText>
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
  munitesTextContent: {
    textAlign: "center",
    fontSize: 100,
    lineHeight: 110,
  },
  secondTextContent: {
    textAlign: "center",
    fontSize: 50,
    lineHeight: 60,
  },
});
