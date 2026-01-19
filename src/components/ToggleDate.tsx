import { useState } from "react";

type Props = {
  date: Date | undefined;
};

export function ToggleDate({ date }: Props) {
  const [showTime, setShowTime] = useState(false);

  if (!date) return null;

  return (
    <button
      onClick={() => setShowTime((v) => !v)}
      className="whitespace-nowrap text-left text-sm text-gray-500 hover:underline"
    >
      {date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        ...(showTime && {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      })}
    </button>
  );
}
