import { useTimer } from "react-timer-hook";

export function Timer({ seconds, onFinish }: { seconds: number; onFinish: () => void }) {
  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + seconds);

  const { seconds: s } = useTimer({
    expiryTimestamp: expiry,
    autoStart: true,
    onExpire: onFinish
  });

  return <span>{s}s</span>;
}