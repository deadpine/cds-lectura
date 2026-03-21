"use client";

import { useState, useEffect, FormEvent } from "react";
import { MeetingInfo } from "@/lib/types";

interface Props {
  meeting: MeetingInfo;
  onSave: (meeting: MeetingInfo) => void;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function withDefaults(meeting: MeetingInfo): MeetingInfo {
  return {
    ...meeting,
    date: meeting.date || todayISO(),
    timeStart: meeting.timeStart || "18:00",
    timeEnd: meeting.timeEnd || "20:00",
  };
}

export default function AdminMeetingForm({ meeting, onSave }: Props) {
  const [form, setForm] = useState<MeetingInfo>(() => withDefaults(meeting));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(withDefaults(meeting));
  }, [meeting]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Fecha
        </label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Horario
        </label>
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={form.timeStart}
            onChange={(e) => setForm((f) => ({ ...f, timeStart: e.target.value }))}
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
          />
          <span className="text-gray-400 text-sm shrink-0">a</span>
          <input
            type="time"
            value={form.timeEnd}
            onChange={(e) => setForm((f) => ({ ...f, timeEnd: e.target.value }))}
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Lectura
        </label>
        <input
          type="text"
          value={form.bookTitle}
          onChange={(e) => setForm((f) => ({ ...f, bookTitle: e.target.value }))}
          placeholder="Nombre del libro"
          maxLength={200}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          URL
        </label>
        <input
          type="url"
          value={form.bookUrl}
          onChange={(e) => setForm((f) => ({ ...f, bookUrl: e.target.value }))}
          placeholder="https://..."
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
        />
      </div>

      <button
        type="submit"
        className="w-full text-sm font-medium bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {saved ? "¡Guardado!" : "Guardar"}
      </button>
    </form>
  );
}
