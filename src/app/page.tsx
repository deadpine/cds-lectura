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
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <header className="text-center">
      </header>
      
      <div className="max-w-lg mx-auto flex flex-col gap-6 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        
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
      </div>
      <footer className="text-center pt-8">
        <a href="/admin" className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
          admin
        </a>
      </footer>
    </main>
  );
}
