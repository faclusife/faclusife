import type { Darts } from "@prisma/client";
import LoadingText from "./loading";
import { ToggleDate } from "./ToggleDate";
import { useEffect, useState } from "react";

type Props = {
  darts: Partial<Darts>[] | undefined;
  isLoading: boolean;
};

export default function TableDarts({ darts, isLoading }: Props) {
  const [showTime, setShowTime] = useState(
    localStorage.getItem("darts-show-time") === "true",
  );

  // Load preference
  useEffect(() => {
    const saved = localStorage.getItem("darts-show-time");
    if (saved !== null) {
      setShowTime(saved === "true");
    }
  }, []);

  // Persist preference
  useEffect(() => {
    localStorage.setItem("darts-show-time", String(showTime));
  }, [showTime]);

  if (isLoading) {
    return (
      <LoadingText textStyle="text-xl font-bold tracking-tight text-black pt-6" />
    );
  }
  if (darts?.length === 0) {
    return <div>No records yet</div>;
  }
  return (
    <div className="mx-auto mt-6 w-full max-w-2xl overflow-x-hidden px-0 sm:px-4 lg:px-8">
      <div className="flow-root">
        <div className="overflow-x-auto sm:-mx-4 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-4 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Place
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    onClick={() => setShowTime((v) => !v)}
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {darts?.map((record, i) => (
                  <tr key={record.name + "" + record.score}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {i + 1}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {record.score}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {record.name}
                    </td>
                    <td
                      className="cursor-pointer px-3 py-2"
                      title="Tap to show time"
                    >
                      <DateCell
                        date={record.updatedAt}
                        showTime={showTime}
                        onToggle={() => setShowTime((v) => !v)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

type DateCellProps = {
  date: Date | undefined;
  showTime: boolean;
  onToggle: () => void;
};

function DateCell({ date, showTime, onToggle }: DateCellProps) {
  if (!date) return null;

  return (
    <button
      onClick={onToggle}
      className="whitespace-nowrap text-left text-sm text-gray-500 hover:underline"
      title="Click to toggle time for all rows"
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
