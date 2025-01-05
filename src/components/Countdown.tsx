import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoadingText from "./loading";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Countdown: React.FC = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { time, title } = router.query;
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!router.isReady) return;

    const endTime = time;

    if (endTime && typeof endTime === "string") {
      // Parse the endTime as UTC
      const countdownDate = Date.parse(endTime + "Z"); // Add "Z" to treat it as UTC
      setTimeout(() => setIsLoading(false), 1000); // Data is loaded

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance <= 0) {
          clearInterval(interval);
          setTimeLeft("Уже делаеться");
          setShowConfetti(true); // Show confetti animation
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsLoading(false); // Data is loaded
      setTimeLeft("Please set a valid 'time' query parameter.");
    }
  }, [time, router.isReady]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      {isLoading ? ( // Show a loading state while processing
        <LoadingText />
      ) : (
        <>
          {title ? (
            <h1 className="mb-4 text-4xl font-bold">{title}</h1>
          ) : (
            <h1 className="mb-4 text-4xl font-bold">Countdown Timer</h1>
          )}
          <p className="text-2xl">{timeLeft}</p>
        </>
      )}
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
};

export default Countdown;
