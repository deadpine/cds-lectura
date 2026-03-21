"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { AppData, DEFAULT_DATA, MAX_SPOTS } from "./types";

export function useAppData() {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  const [signupIds, setSignupIds] = useState<number[]>([]);
  const [waitlistIds, setWaitlistIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchAll = useCallback(async () => {
    const [meetingRes, signupsRes, waitlistRes] = await Promise.all([
      supabase.from("meeting").select("*").eq("id", 1).single(),
      supabase.from("signups").select("*").order("created_at"),
      supabase.from("waitlist").select("*").order("created_at"),
    ]);

    const m = meetingRes.data;
    const meeting = m
      ? { date: m.date, timeStart: m.time_start, timeEnd: m.time_end, bookTitle: m.book_title, bookUrl: m.book_url }
      : DEFAULT_DATA.meeting;

    const signups = signupsRes.data ?? [];
    const waitlist = waitlistRes.data ?? [];

    setData({ meeting, signups: signups.map((r) => r.name), waitlist: waitlist.map((r) => r.name) });
    setSignupIds(signups.map((r) => r.id));
    setWaitlistIds(waitlist.map((r) => r.id));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchAll();

    const channel = supabase
      .channel("app-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "signups" }, fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "waitlist" }, fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "meeting" }, fetchAll)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchAll]);

  const spotsLeft = Math.max(0, MAX_SPOTS - data.signups.length);
  const isFull = spotsLeft === 0;

  async function addSignup(name: string) {
    const trimmed = name.trim();
    if (!trimmed || isFull) return;
    await supabase.from("signups").insert({ name: trimmed });
    await fetchAll();
  }

  async function addWaitlist(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    await supabase.from("waitlist").insert({ name: trimmed });
    await fetchAll();
  }

  async function updateMeeting(meeting: AppData["meeting"]) {
    await supabase.from("meeting").update({
      date: meeting.date,
      time_start: meeting.timeStart,
      time_end: meeting.timeEnd,
      book_title: meeting.bookTitle,
      book_url: meeting.bookUrl,
    }).eq("id", 1);
    await fetchAll();
  }

  async function editSignup(index: number, newName: string) {
    const id = signupIds[index];
    if (!id) return;
    await supabase.from("signups").update({ name: newName.trim() }).eq("id", id);
    await fetchAll();
  }

  async function deleteSignup(index: number) {
    const id = signupIds[index];
    if (!id) return;
    await supabase.from("signups").delete().eq("id", id);
    // Auto-promote first person on waitlist
    if (waitlistIds.length > 0) {
      await Promise.all([
        supabase.from("signups").insert({ name: data.waitlist[0] }),
        supabase.from("waitlist").delete().eq("id", waitlistIds[0]),
      ]);
    }
    await fetchAll();
  }

  async function editWaitlist(index: number, newName: string) {
    const id = waitlistIds[index];
    if (!id) return;
    await supabase.from("waitlist").update({ name: newName.trim() }).eq("id", id);
    await fetchAll();
  }

  async function deleteWaitlist(index: number) {
    const id = waitlistIds[index];
    if (!id) return;
    await supabase.from("waitlist").delete().eq("id", id);
    await fetchAll();
  }

  return {
    data,
    isLoaded,
    spotsLeft,
    isFull,
    addSignup,
    addWaitlist,
    updateMeeting,
    editSignup,
    deleteSignup,
    editWaitlist,
    deleteWaitlist,
  };
}
