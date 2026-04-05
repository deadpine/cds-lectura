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

  if (diffDays < 0) return "pasada";
  if (diffDays === 0) return "hoy";
  if (diffDays === 1) return "mañana";
  if (diffDays <= 7) return `[ en ${diffDays} días ]`;
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
    <div className="space-y-1 p-5 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">→ Próximo encuentro</p>
        {relativeLabel && (
          <span className={`text-sm ${
            relativeLabel === "pasada" ? "text-gray-500" :
            relativeLabel === "hoy" ? "text-green-700" :
            "text-gray-600"
          }`}>
            {relativeLabel}
          </span>
        )}
      </div>
      
      <p className="text-3xl pt-9 pb-8 text-gray-900 text-center">
        {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
        {/* {timeRange ? `, ${timeRange}` : ""} */}
      </p>

      <div className="space-y-1 bg-blue-50 p-4 rounded-lg">
        <p className="text-gray-600 flex items-start gap-4">
          <span className="text-2xl">📖</span>
          <span className="flex flex-col">
            <span className="text-gray-800">"{meeting.bookTitle}"</span>
            {meeting.bookUrl && (
              <a href={meeting.bookUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline hover:text-blue-800 break-all">
                {meeting.bookUrl}
              </a>
            )}
          </span>
        </p>
      </div>
      
      
    
    </div>
  );
}
