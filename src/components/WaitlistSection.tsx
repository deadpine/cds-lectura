"use client";

import AddNameForm from "./AddNameForm";

interface Props {
  waitlist: string[];
  onAdd: (name: string) => void;
}

export default function WaitlistSection({ waitlist, onAdd }: Props) {
  return (
    <div className="space-y-4 border-t border-gray-100 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Lista de espera</h2>
        {waitlist.length > 0 && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
            {waitlist.length} en espera
          </span>
        )}
      </div>

      {waitlist.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Lista de espera vacía.</p>
      ) : (
        <ol className="space-y-1.5">
          {waitlist.map((name, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-5 text-right shrink-0">{i + 1}.</span>
              <span className="text-sm text-gray-700">{name}</span>
            </li>
          ))}
        </ol>
      )}

      <AddNameForm
        onAdd={onAdd}
        label="Unirme a la espera"
        placeholder="Tu nombre..."
      />
    </div>
  );
}
