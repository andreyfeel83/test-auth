import {useState, useEffect, useCallback} from 'react';

export const useCountdown = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    if (!isCountdownActive || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setIsCountdownActive(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isCountdownActive]);

  const startCountdown = useCallback(() => {
    setTimeLeft(initialTime);
    setIsCountdownActive(true);
  }, [initialTime]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return {
    remainingTime: formatTime(timeLeft),
    startCountdown,
    isCountdownActive,
  };
};
