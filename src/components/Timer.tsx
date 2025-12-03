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
      setTime(v => v - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running, seconds]);

  useEffect(() => {
    if (time === 0 && running) {
      onFinish();
    }
  }, [time, running, onFinish]);

  return <span>{time}s</span>;
}
