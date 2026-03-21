"use client";

import { useState, FormEvent } from "react";

interface Props {
  onAdd: (name: string) => void | Promise<void>;
  label?: string;
  placeholder?: string;
}

export default function AddNameForm({
  onAdd,
  label = "Agregar mi nombre",
  placeholder = "Tu nombre...",
}: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    try {
      await onAdd(trimmed);
      setName("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        maxLength={60}
        disabled={loading}
        className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading}
        className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shrink-0 disabled:opacity-50 flex items-center gap-2"
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {label}
      </button>
    </form>
  );
}
