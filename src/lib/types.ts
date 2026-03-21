export interface MeetingInfo {
  date: string;       // "YYYY-MM-DD"
  timeStart: string;  // "HH:MM"
  timeEnd: string;    // "HH:MM"
  bookTitle: string;
  bookUrl: string;
}

export interface AppData {
  meeting: MeetingInfo;
  signups: string[];  // max MAX_SPOTS entries
  waitlist: string[]; // unbounded overflow
}

export const MAX_SPOTS = 8;
export const STORAGE_KEY = "cds-lectura-data";

export const DEFAULT_DATA: AppData = {
  meeting: { date: "", timeStart: "", timeEnd: "", bookTitle: "", bookUrl: "" },
  signups: [],
  waitlist: [],
};
