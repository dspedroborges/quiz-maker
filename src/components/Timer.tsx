import { useEffect, useState } from "react";

type TimerProps = {
  seconds: number;
  running: boolean;
  onFinish: () => void;
};

export function Timer({ seconds, running, onFinish }: TimerProps) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setTime(v => {
        if (v <= 1) {
          clearInterval(id);
          onFinish();
          return 0;
        }
        return v - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running, seconds, onFinish]);

  return <span>{time}s</span>;
}