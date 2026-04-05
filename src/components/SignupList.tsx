"use client";

import AddNameForm from "./AddNameForm";

interface Props {
  signups: string[];
  spotsLeft: number;
  onAdd?: (name: string) => void | Promise<void>;
}

export default function SignupList({ signups, spotsLeft, onAdd }: Props) {
  const isFull = spotsLeft === 0;

  const badgeText = isFull
    ? "Completo"
    : `${spotsLeft} ${spotsLeft === 1 ? "lugar disponible" : "lugares disponibles"}`;

  const badgeClass = isFull
    ? "bg-blue-100 text-blue-700"
    : "bg-green-100 text-green-700";

  return (
    <div className="space-y-4 p-5 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Participantes</h2>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeClass}`}>
          {badgeText}
        </span>
      </div>

      {signups.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Nadie inscrito aún.</p>
      ) : (
        <ol className="space-y-2.5">
          {signups.map((name, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-5 text-right shrink-0">{i + 1}.</span>
              <span className="text-sm text-gray-700">{name}</span>
            </li>
          ))}
        </ol>
      )}

      {onAdd && spotsLeft > 0 && (
        <AddNameForm onAdd={onAdd} label="Inscribirme" />
      )}
    </div>
  );
}
