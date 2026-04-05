"use client";

import { useAppData } from "@/lib/useAppData";
import AdminMeetingForm from "@/components/AdminMeetingForm";
import AdminNameList from "@/components/AdminNameList";

export default function AdminPage() {
  const {
    data,
    isLoaded,
    updateMeeting,
    editSignup,
    deleteSignup,
    editWaitlist,
    deleteWaitlist,
  } = useAppData();

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-12 flex flex-col gap-8">
        <header className="flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Administración</h1>
            <p className="text-sm text-gray-400 mt-0.5">Club del Sur</p>
          </div>
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Ver página
          </a>
        </header>

        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Información de la reunión
          </h2>
          <AdminMeetingForm meeting={data.meeting} onSave={updateMeeting} />
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Participantes{" "}
            <span className="text-gray-400 font-normal text-sm">
              ({data.signups.length}/8)
            </span>
          </h2>
          <AdminNameList
            names={data.signups}
            onEdit={editSignup}
            onDelete={deleteSignup}
          />
        </section>

        {data.waitlist.length > 0 && (
          <section className="">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Lista de espera{" "}
              <span className="text-gray-400 font-normal text-sm">
                ({data.waitlist.length})
              </span>
            </h2>
            <AdminNameList
              names={data.waitlist}
              onEdit={editWaitlist}
              onDelete={deleteWaitlist}
            />
          </section>
        )}
      </div>
    </main>
  );
}
