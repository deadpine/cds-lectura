"use client";

import { useAppData } from "@/lib/useAppData";
import MeetingCard from "@/components/MeetingCard";
import SignupList from "@/components/SignupList";
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
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <header className="text-center">
      </header>
      
      <div className="max-w-md mx-auto flex flex-col">
        
        <MeetingCard meeting={data.meeting} />

        <section className="space-y-0">
          <SignupList signups={data.signups} spotsLeft={spotsLeft} onAdd={!isFull ? addSignup : undefined} />
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
