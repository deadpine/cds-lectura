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
    <ol className="space-y-2">
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
                  className="text-xs font-medium text-green-700 hover:text-green-900 transition-colors shrink-0"
                >
                  Guardar
                </button>
                <button
                  onClick={() => cancelEdit(i)}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-gray-700">{name}</span>
                <button
                  onClick={() => startEdit(i)}
                  className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors shrink-0"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(i)}
                  className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors shrink-0"
                >
                  Eliminar
                </button>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
