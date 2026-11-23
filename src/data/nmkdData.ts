import { ChapterInfo, McqQuestion, NmkdExamSet } from '../types/exam';
import { NMKD_QUESTIONS_PART_1 } from './nmkdExamsPart1';
import { NMKD_QUESTIONS_PART_2 } from './nmkdExamsPart2';
import { shuffleArray } from './index';

export const NMKD_CHAPTERS: ChapterInfo[] = [
  {
    chapter: 1,
    title: 'Chương 1: Tổng quan về kinh doanh',
    shortTitle: 'Ch.1 · Tổng quan về kinh doanh',
  },
  {
    chapter: 2,
    title: 'Chương 2: Tạo lập và sở hữu doanh nghiệp',
    shortTitle: 'Ch.2 · Tạo lập & sở hữu doanh nghiệp',
  },
  {
    chapter: 3,
    title: 'Chương 3: Quản trị sản xuất',
    shortTitle: 'Ch.3 · Quản trị sản xuất',
  },
  {
    chapter: 4,
    title: 'Chương 4: Quản trị nguồn nhân lực',
    shortTitle: 'Ch.4 · Quản trị nguồn nhân lực',
  },
  {
    chapter: 5,
    title: 'Chương 5: Quản trị Marketing',
    shortTitle: 'Ch.5 · Quản trị Marketing',
  },
  {
    chapter: 6,
    title: 'Chương 6: Kế toán trong doanh nghiệp',
    shortTitle: 'Ch.6 · Kế toán trong doanh nghiệp',
  },
];

export const NMKD_ALL_QUESTIONS: McqQuestion[] = [
  ...NMKD_QUESTIONS_PART_1,
  ...NMKD_QUESTIONS_PART_2,
];

export const NMKD_QUESTION_BY_ID: Record<number, McqQuestion> = Object.fromEntries(
  NMKD_ALL_QUESTIONS.map((q) => [q.id, q])
);

export const NMKD_EXAM_SETS: NmkdExamSet[] = Array.from({ length: 10 }, (_, idx) => {
  const examNumber = idx + 1;
  const code = String(examNumber).padStart(2, '0');
  const examCode = `2026${code}`;
  const startId = 1001 + idx * 30;
  const questionIds = Array.from({ length: 30 }, (__, qIdx) => startId + qIdx);
  return {
    examNumber,
    code,
    examCode,
    title: `Đề số ${code} · Mã đề ${examCode}`,
    questionIds,
  };
});

export const NMKD_EXAM_BY_NUMBER: Record<number, NmkdExamSet> = Object.fromEntries(
  NMKD_EXAM_SETS.map((exam) => [exam.examNumber, exam])
);

/**
 * Returns a balanced random 30-question exam (5 questions per chapter across all 6 chapters).
 */
export function buildRandomNmkdMockIds(): number[] {
  const chosen: number[] = [];
  for (let ch = 1; ch <= 6; ch += 1) {
    const pool = NMKD_ALL_QUESTIONS.filter((q) => q.chapter === ch);
    const picked = shuffleArray(pool)
      .slice(0, 5)
      .map((q) => q.id);
    chosen.push(...picked);
  }
  return chosen;
}
