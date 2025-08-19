import React, { useState, useEffect, FC } from "react";
import { StyleSheet } from "react-native";
import { Slider, Icon, Button } from "@rneui/themed";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type Props = {
  time: number;
  title: string;
  onChange: (time: number) => void;
  maximumValue: number;
  headerStyle?: object;
  iconColor: string;
  type: "alert" | "limit";
  limit: number;
};

export const CustomSlider: FC<Props> = ({
  time,
  title,
  onChange,
  headerStyle,
  maximumValue,
  iconColor,
  type,
  limit,
}) => {
  return (
    <>
      <ThemedText style={headerStyle}>{title}</ThemedText>
      <ThemedView style={[styles.contentView]}>
        {type === "alert" ? (
          <ThemedText style={styles.textContent}>
            {time === 0
              ? "アラートなし"
              : `${time}分経過後にアラート（残り時間${limit - time}分）`}
          </ThemedText>
        ) : (
          <ThemedText style={styles.textContent}>{time}分</ThemedText>
        )}
        <Slider
          value={time}
          onValueChange={onChange}
          maximumValue={maximumValue}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5 }}
          thumbStyle={{ height: 20, width: 20 }}
          thumbProps={{
            children: (
              <Icon
                name="clock-o"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={iconColor}
              />
            ),
          }}
        />
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  textContent: {
    textAlign: "center",
    marginBottom: 2,
  },
  contentView: {
    padding: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
    marginBottom: 10,
  },
});
