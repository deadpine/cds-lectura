"use client";

import { useState, useEffect } from "react";
import { AppData, DEFAULT_DATA, STORAGE_KEY, MAX_SPOTS } from "./types";

export function useAppData() {
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage once on mount (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw));
      }
    } catch {
      // Malformed JSON — fall back to defaults
    }
    setIsLoaded(true);
  }, []);

  // Persist whenever data changes (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, isLoaded]);

  const spotsLeft = Math.max(0, MAX_SPOTS - data.signups.length);
  const isFull = spotsLeft === 0;

  // --- Public actions ---

  function addSignup(name: string) {
    const trimmed = name.trim();
    if (!trimmed || isFull) return;
    setData((prev) => ({ ...prev, signups: [...prev.signups, trimmed] }));
  }

  function addWaitlist(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setData((prev) => ({ ...prev, waitlist: [...prev.waitlist, trimmed] }));
  }

  // --- Admin actions ---

  function updateMeeting(meeting: AppData["meeting"]) {
    setData((prev) => ({ ...prev, meeting }));
  }

  function editSignup(index: number, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setData((prev) => {
      const signups = [...prev.signups];
      signups[index] = trimmed;
      return { ...prev, signups };
    });
  }

  function deleteSignup(index: number) {
    setData((prev) => {
      const signups = prev.signups.filter((_, i) => i !== index);
      const waitlist = [...prev.waitlist];
      // Auto-promote first waitlisted person if a spot opens
      if (waitlist.length > 0 && signups.length < MAX_SPOTS) {
        signups.push(waitlist.shift()!);
      }
      return { ...prev, signups, waitlist };
    });
  }

  function editWaitlist(index: number, newName: string) {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setData((prev) => {
      const waitlist = [...prev.waitlist];
      waitlist[index] = trimmed;
      return { ...prev, waitlist };
    });
  }

  function deleteWaitlist(index: number) {
    setData((prev) => ({
      ...prev,
      waitlist: prev.waitlist.filter((_, i) => i !== index),
    }));
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
