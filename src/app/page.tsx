"use client";

import { useAppData } from "@/lib/useAppData";
import MeetingCard from "@/components/MeetingCard";
import SignupList from "@/components/SignupList";
import AddNameForm from "@/components/AddNameForm";
import WaitlistSection from "@/components/WaitlistSection";

export default function HomePage() {
  const { data, isLoaded, spotsLeft, isFull, addSignup, addWaitlist } = useAppData();

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-12 flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Club del Sur</h1>
          <p className="text-sm text-gray-400 mt-1">Próxima reunión</p>
        </header>

        <MeetingCard meeting={data.meeting} />

        <section className="space-y-0">
          <SignupList signups={data.signups} spotsLeft={spotsLeft} />
          {!isFull && (
            <AddNameForm onAdd={addSignup} label="Inscribirme" />
          )}
        </section>

        {isFull && (
          <WaitlistSection waitlist={data.waitlist} onAdd={addWaitlist} />
        )}

        <footer className="text-center pt-4">
          <a href="/admin" className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
            admin
          </a>
        </footer>
      </div>
    </main>
  );
}
