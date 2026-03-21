"use client";

import { MeetingInfo } from "@/lib/types";

interface Props {
  meeting: MeetingInfo;
}

export default function MeetingCard({ meeting }: Props) {
  let formattedDate = "Fecha por confirmar";

  if (meeting.date) {
    // Parse as local date to avoid UTC timezone shift
    const [year, month, day] = meeting.date.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    formattedDate = d.toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const timeRange =
    meeting.timeStart && meeting.timeEnd
      ? `${meeting.timeStart} – ${meeting.timeEnd}`
      : meeting.timeStart || "";

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Cuándo</p>
        <p className="text-gray-800 font-medium capitalize">{formattedDate}</p>
        {timeRange && (
          <p className="text-sm text-gray-500 mt-0.5">{timeRange}</p>
        )}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Libro</p>
        {meeting.bookTitle ? (
          meeting.bookUrl ? (
            <a
              href={meeting.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 font-medium underline underline-offset-2 decoration-gray-300 hover:decoration-gray-600 transition-colors"
            >
              {meeting.bookTitle}
            </a>
          ) : (
            <p className="text-gray-800 font-medium">{meeting.bookTitle}</p>
          )
        ) : (
          <p className="text-gray-400 italic">Próximamente...</p>
        )}
      </div>
    </div>
  );
}
