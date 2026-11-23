import { ExamHistoryRecord } from '../types/exam';

const HISTORY_STORAGE_KEY = 'due_mis2002_exam_history_v1';

export function loadExamHistory(): ExamHistoryRecord[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveExamHistoryRecord(record: ExamHistoryRecord): ExamHistoryRecord[] {
  const existing = loadExamHistory();
  const next = [record, ...existing].slice(0, 20);
  try {
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota errors
  }
  return next;
}

export function clearExamHistory(): void {
  try {
    window.localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
