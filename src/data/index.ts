import { ChapterInfo, ExamQuestion } from '../types/exam';
import { MCQ_QUESTIONS } from './mcqQuestions';
import { SHORT_ANSWER_QUESTIONS } from './shortEssayQuestions';
import { ESSAY_QUESTIONS } from './essayQuestions';

export { MCQ_QUESTIONS, SHORT_ANSWER_QUESTIONS, ESSAY_QUESTIONS };

export const ALL_QUESTIONS: ExamQuestion[] = [
  ...MCQ_QUESTIONS,
  ...SHORT_ANSWER_QUESTIONS,
  ...ESSAY_QUESTIONS,
];

export const QUESTION_BY_ID: Record<number, ExamQuestion> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q])
);

export const CHAPTERS: ChapterInfo[] = [
  { chapter: 1, title: 'Chương 1 – Tổng quan HTTT quản lý', shortTitle: 'Chương 1: Tổng quan HTTT' },
  { chapter: 2, title: 'Chương 2 – HTTT trong doanh nghiệp', shortTitle: 'Chương 2: HTTT trong DN' },
  { chapter: 3, title: 'Chương 3 – Xây dựng HTTT quản lý', shortTitle: 'Chương 3: Xây dựng HTTT' },
  { chapter: 4, title: 'Chương 4 – Cơ sở hạ tầng CNTT và Trí tuệ nhân tạo', shortTitle: 'Chương 4: Hạ tầng CNTT & AI' },
  { chapter: 5, title: 'Chương 5 – Những hệ thống ứng dụng trong doanh nghiệp', shortTitle: 'Chương 5: ERP, SCM & CRM' },
  { chapter: 6, title: 'Chương 6 – Thương mại điện tử', shortTitle: 'Chương 6: Thương mại điện tử' },
  { chapter: 7, title: 'Chương 7 – Kinh doanh thông minh và hỗ trợ ra quyết định', shortTitle: 'Chương 7: BI & Ra quyết định' },
];

export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildRandomDueMockExamIds(
  mcqCount = 10,
  shortCount = 3,
  essayCount = 1,
  chapters?: number[]
): number[] {
  const chapterFilter = (q: ExamQuestion) =>
    !chapters || chapters.length === 0 || chapters.includes(q.chapter);

  const mcqs = shuffleArray(MCQ_QUESTIONS.filter(chapterFilter)).slice(0, mcqCount);
  const shorts = shuffleArray(SHORT_ANSWER_QUESTIONS.filter(chapterFilter)).slice(0, shortCount);
  const essays = shuffleArray(ESSAY_QUESTIONS.filter(chapterFilter)).slice(0, essayCount);

  return [...mcqs, ...shorts, ...essays].map((q) => q.id);
}
