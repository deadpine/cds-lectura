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
    <div className="py-4 text-center space-y-1">
    
      <p className="text-xs text-gray-500">Próximo encuentro</p>
      
      <div className="space-y-1 py-2">
        <p className="text-2xl font-semibold text-gray-900">{meeting.bookTitle}</p>
        <p className="text-gray-600">
          {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}{timeRange ? `, ${timeRange}` : ""}
        </p>
      </div>
      
      {relativeLabel && (
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
          relativeLabel === "Pasada" ? "bg-gray-100 text-gray-500" :
          relativeLabel === "Hoy" ? "bg-green-100 text-green-700" :
          "bg-amber-100 text-amber-700"
        }`}>
          {relativeLabel}
        </span>
      )}
    
    </div>
  );
}
