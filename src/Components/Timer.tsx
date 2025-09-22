import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  timeLimit?: number; // in seconds
  onTimeUp?: () => void;
  startTime: number;
  isActive: boolean;
}

const Timer = ({ timeLimit, onTimeUp, startTime, isActive }: TimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!timeLimit || !isActive) {
      setTimeRemaining(null);
      return;
    }

    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, timeLimit - elapsed);

      setTimeRemaining(remaining);

      if (remaining === 0 && onTimeUp) {
        onTimeUp();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [timeLimit, startTime, isActive, onTimeUp]);

  if (!timeLimit || !isActive) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (!timeRemaining) return "text-gray-600 dark:text-gray-400";
    if (timeRemaining <= 30) return "text-red-600 dark:text-red-400";
    if (timeRemaining <= 60) return "text-orange-600 dark:text-orange-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4" />
      <span className={`font-mono text-sm font-medium ${getTimerColor()}`}>
        {timeRemaining !== null ? formatTime(timeRemaining) : "--:--"}
      </span>
    </div>
  );
};

export default Timer;
