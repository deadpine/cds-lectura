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
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto flex flex-col gap-4">
<section className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">
            Información del encuentro
          </h2>
          <AdminMeetingForm meeting={data.meeting} onSave={updateMeeting} />
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="text-base font-semibold text-gray-800">
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
          <section className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <h2 className="text-base font-semibold text-gray-800">
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
