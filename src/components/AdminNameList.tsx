"use client";

import { useState } from "react";

interface Props {
  names: string[];
  onEdit: (index: number, newName: string) => void;
  onDelete: (index: number) => void;
}

interface RowState {
  editing: boolean;
  draft: string;
}

export default function AdminNameList({ names, onEdit, onDelete }: Props) {
  const [rows, setRows] = useState<RowState[]>(() =>
    names.map(() => ({ editing: false, draft: "" }))
  );

  // Sync row count when names list changes length
  const syncedRows: RowState[] = names.map((_, i) => rows[i] ?? { editing: false, draft: "" });

  function startEdit(i: number) {
    setRows((prev) => {
      const next = [...prev];
      next[i] = { editing: true, draft: names[i] };
      return next;
    });
  }

  function cancelEdit(i: number) {
    setRows((prev) => {
      const next = [...prev];
      next[i] = { editing: false, draft: "" };
      return next;
    });
  }

  function saveEdit(i: number) {
    const trimmed = syncedRows[i].draft.trim();
    if (trimmed) {
      onEdit(i, trimmed);
    }
    setRows((prev) => {
      const next = [...prev];
      next[i] = { editing: false, draft: "" };
      return next;
    });
  }

  function updateDraft(i: number, value: string) {
    setRows((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], draft: value };
      return next;
    });
  }

  if (names.length === 0) {
    return <p className="text-sm text-gray-400 italic">Lista vacía.</p>;
  }

  return (
    <ol className="space-y-3">
      {names.map((name, i) => {
        const row = syncedRows[i];
        return (
          <li key={i} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-5 text-right shrink-0">{i + 1}.</span>

            {row.editing ? (
              <>
                <input
                  type="text"
                  value={row.draft}
                  onChange={(e) => updateDraft(i, e.target.value)}
                  maxLength={60}
                  autoFocus
                  className="flex-1 text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button
                  onClick={() => saveEdit(i)}
                  className="p-1.5 rounded-md text-green-600 hover:bg-green-50 hover:text-green-800 transition-colors shrink-0"
                  title="Guardar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </button>
                <button
                  onClick={() => cancelEdit(i)}
                  className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors shrink-0"
                  title="Cancelar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-gray-700">{name}</span>
                <button
                  onClick={() => startEdit(i)}
                  className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors shrink-0"
                  title="Editar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button
                  onClick={() => onDelete(i)}
                  className="p-1.5 rounded-md text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
                  title="Eliminar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
