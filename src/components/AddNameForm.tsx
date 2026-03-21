"use client";

import { useState, FormEvent } from "react";

interface Props {
  onAdd: (name: string) => void;
  label?: string;
  placeholder?: string;
}

export default function AddNameForm({
  onAdd,
  label = "Agregar mi nombre",
  placeholder = "Tu nombre...",
}: Props) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        maxLength={60}
        className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors shrink-0"
      >
        {label}
      </button>
    </form>
  );
}
