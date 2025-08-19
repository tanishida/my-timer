import React, { FC, useState, useEffect } from 'react';
import { Audio } from "expo-av";
import { Timer } from '@/components/ui/Timer';

type Props = {
    setIsStarted: (isStarted: boolean) => void;
    timeLimit: number;
    alert1: number;
    alert2: number;
}

export const TimerSetting: FC<Props> = (props) => {
  const { setIsStarted, timeLimit, alert1, alert2 } = props;
  const [audio1, setAudio1] = useState<Audio.Sound | null>(null);
  const [audio2, setAudio2] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const initAudio1 = async () => {
      let url = require("@/assets/sounds/alert-not-found.mp3");
      try {
        switch (timeLimit - alert1) {
          case 30:
            url = require("@/assets/sounds/limit-30-min.mp3");
            break;
          case 29:
            url = require("@/assets/sounds/limit-29-min.mp3");
            break;
          case 28:
            url = require("@/assets/sounds/limit-28-min.mp3");
            break;
          case 27:
            url = require("@/assets/sounds/limit-27-min.mp3");
            break;
          case 26:
            url = require("@/assets/sounds/limit-26-min.mp3");
            break;
          case 25:
            url = require("@/assets/sounds/limit-25-min.mp3");
            break;
          case 24:
            url = require("@/assets/sounds/limit-24-min.mp3");
            break;
          case 23:
            url = require("@/assets/sounds/limit-23-min.mp3");
            break;
          case 22:
            url = require("@/assets/sounds/limit-22-min.mp3");
            break;
          case 21:
            url = require("@/assets/sounds/limit-21-min.mp3");
            break;
          case 20:
            url = require("@/assets/sounds/limit-20-min.mp3");
            break;
          case 19:
            url = require("@/assets/sounds/limit-19-min.mp3");
            break;
          case 18:
            url = require("@/assets/sounds/limit-18-min.mp3");
            break;
          case 17:
            url = require("@/assets/sounds/limit-17-min.mp3");
            break;
          case 16:
            url = require("@/assets/sounds/limit-16-min.mp3");
            break;
          case 15:
            url = require("@/assets/sounds/limit-15-min.mp3");
            break;
          case 14:
            url = require("@/assets/sounds/limit-14-min.mp3");
            break;
          case 13:
            url = require("@/assets/sounds/limit-13-min.mp3");
            break;
          case 12:
            url = require("@/assets/sounds/limit-12-min.mp3");
            break;
          case 11:
            url = require("@/assets/sounds/limit-11-min.mp3");
            break;
          case 10:
            url = require("@/assets/sounds/limit-10-min.mp3");
            break;
          case 9:
            url = require("@/assets/sounds/limit-9-min.mp3");
            break;
          case 8:
            url = require("@/assets/sounds/limit-8-min.mp3");
            break;
          case 7:
            url = require("@/assets/sounds/limit-7-min.mp3");
            break;
          case 6:
            url = require("@/assets/sounds/limit-6-min.mp3");
            break;
          case 5:
            url = require("@/assets/sounds/limit-5-min.mp3");
            break;
          case 4:
            url = require("@/assets/sounds/limit-4-min.mp3");
            break;
          case 3:
            url = require("@/assets/sounds/limit-3-min.mp3");
            break;
          case 2:
            url = require("@/assets/sounds/limit-2-min.mp3");
            break;
          case 1:
            url = require("@/assets/sounds/limit-1-min.mp3");
            break;
          default:
            break;
        }
        const { sound } = await Audio.Sound.createAsync(url);
        setAudio1(sound);
      } catch (error) {
        console.error("アラート1の初期化中にエラーが発生しました:", error);
      }
    };
    const initAudio2 = async () => {
      let url = require("@/assets/sounds/alert-not-found.mp3");
        try {
          switch (timeLimit - alert2) {
            case 30:
              url = require("@/assets/sounds/limit-30-min.mp3");
              break;
            case 29:
              url = require("@/assets/sounds/limit-29-min.mp3");
              break;
            case 28:
              url = require("@/assets/sounds/limit-28-min.mp3");
              break;
            case 27:
              url = require("@/assets/sounds/limit-27-min.mp3");
              break;
            case 26:
              url = require("@/assets/sounds/limit-26-min.mp3");
              break;
            case 25:
              url = require("@/assets/sounds/limit-25-min.mp3");
              break;
            case 24:
              url = require("@/assets/sounds/limit-24-min.mp3");
              break;
            case 23:
              url = require("@/assets/sounds/limit-23-min.mp3");
              break;
            case 22:
              url = require("@/assets/sounds/limit-22-min.mp3");
              break;
            case 21:
              url = require("@/assets/sounds/limit-21-min.mp3");
              break;
            case 20:
              url = require("@/assets/sounds/limit-20-min.mp3");
              break;
            case 19:
              url = require("@/assets/sounds/limit-19-min.mp3");
              break;
            case 18:
              url = require("@/assets/sounds/limit-18-min.mp3");
              break;
            case 17:
              url = require("@/assets/sounds/limit-17-min.mp3");
              break;
            case 16:
              url = require("@/assets/sounds/limit-16-min.mp3");
              break;
            case 15:
              url = require("@/assets/sounds/limit-15-min.mp3");
              break;
            case 14:
              url = require("@/assets/sounds/limit-14-min.mp3");
              break;
            case 13:
              url = require("@/assets/sounds/limit-13-min.mp3");
              break;
            case 12:
              url = require("@/assets/sounds/limit-12-min.mp3");
              break;
            case 11:
              url = require("@/assets/sounds/limit-11-min.mp3");
              break;
            case 10:
              url = require("@/assets/sounds/limit-10-min.mp3");
              break;
            case 9:
              url = require("@/assets/sounds/limit-9-min.mp3");
              break;
            case 8:
              url = require("@/assets/sounds/limit-8-min.mp3");
              break;
            case 7:
              url = require("@/assets/sounds/limit-7-min.mp3");
              break;
            case 6:
              url = require("@/assets/sounds/limit-6-min.mp3");
              break;
            case 5:
              url = require("@/assets/sounds/limit-5-min.mp3");
              break;
            case 4:
              url = require("@/assets/sounds/limit-4-min.mp3");
              break;
            case 3:
              url = require("@/assets/sounds/limit-3-min.mp3");
              break;
            case 2:
              url = require("@/assets/sounds/limit-2-min.mp3");
              break;
            case 1:
              url = require("@/assets/sounds/limit-1-min.mp3");
              break;
            default:
              break;
          }
          const { sound } = await Audio.Sound.createAsync(url);
          setAudio2(sound);
        } catch (error) {
          console.error("アラート2の初期化中にエラーが発生しました:", error);
        }
      };
      initAudio1();
      initAudio2();
    return () => {
      audio1?.unloadAsync();
      audio2?.unloadAsync();
    };
  }, []);
  
  return (
    <>
      <Timer 
        setIsStarted={setIsStarted}
        timeLimit={timeLimit}
        alert1={alert1}
        alert2={alert2}
        audio1={audio1}
        audio2={audio2}
      />
    </>
  );
}

