"use client";

import { MeetingInfo } from "@/lib/types";

interface Props {
  meeting: MeetingInfo;
}

function getRelativeLabel(dateStr: string): string | null {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-").map(Number);
  const meeting = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = meeting.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Pasada";
  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Mañana";
  if (diffDays <= 7) return `En ${diffDays} días`;
  return null;
}

export default function MeetingCard({ meeting }: Props) {
  let formattedDate = "Fecha por confirmar";

  if (meeting.date) {
    const [year, month, day] = meeting.date.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    const weekday = d.toLocaleDateString("es-CL", { weekday: "long" });
    const dayMonth = d.toLocaleDateString("es-CL", { day: "numeric", month: "long" });
    formattedDate = `${weekday} ${dayMonth}`;
  }

  const relativeLabel = getRelativeLabel(meeting.date);

  function formatTime(t: string): string {
    const [h, m] = t.split(":").map(Number);
    const suffix = h >= 12 ? "pm" : "am";
    const hour = h % 12 || 12;
    return m ? `${hour}:${String(m).padStart(2, "0")}${suffix}` : `${hour}${suffix}`;
  }

  const timeRange =
    meeting.timeStart && meeting.timeEnd
      ? `${meeting.timeStart} - ${meeting.timeEnd}hs`
      : meeting.timeStart ? `${meeting.timeStart}hs` : "";

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3 text-center">
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Próximo encuentro</p>
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
      <div>
        <p className="text-gray-800 font-medium">
          {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}{timeRange ? `, ${timeRange}` : ""}
        </p>
        {relativeLabel && (
          <span className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
            relativeLabel === "Pasada" ? "bg-gray-100 text-gray-500" :
            relativeLabel === "Hoy" ? "bg-green-100 text-green-700" :
            "bg-amber-100 text-amber-700"
          }`}>
            {relativeLabel}
          </span>
        )}
      </div>
    </div>
  );
}
