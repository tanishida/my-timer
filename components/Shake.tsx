import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";

export function Shake() {
  const rotationAnimation = useSharedValue(0);
  const OFFSET = 400;
  const TIME = 100;
  const DELAY = 100;
  useEffect(() => {
    rotationAnimation.value = withDelay(
      DELAY,
      withSequence(
        // start from -OFFSET
        withTiming(-OFFSET, { duration: TIME / 2 }),
        // shake between -OFFSET and OFFSET 5 times
        withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
        // go back to 0 at the end
        withTiming(0, { duration: TIME / 2 })
      )
    );
  }, [rotationAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rotationAnimation.value }],
    flexDirection: "row",
    justifyContent: "center",
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>メニュー</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    lineHeight: 60,
    marginTop: -6,
  },
});
