import { useState, useEffect } from 'react';
import { formatCountdown } from '../utils/formatters';

const DEADLINE = 1770940740; // Feb 12, 2026, 23:59:00 UTC

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = DEADLINE - now;
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === 0) {
    return (
      <div className="text-center">
        <p className="text-bc-accent font-bold text-2xl">Voting Ended</p>
      </div>
    );
  }

  const { days, hours, minutes, seconds } = formatCountdown(timeLeft);

  return (
    <div className="flex gap-4 justify-center">
      <TimeBlock value={days} label="Days" />
      <TimeBlock value={hours} label="Hours" />
      <TimeBlock value={minutes} label="Min" />
      <TimeBlock value={seconds} label="Sec" />
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-bc-card border border-bc-primary/50 rounded-lg px-4 py-3 min-w-[70px]">
        <span className="text-bc-text font-bold text-2xl">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-bc-text-muted text-sm mt-1">{label}</span>
    </div>
  );
}
