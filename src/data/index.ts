import { ChapterInfo, ExamQuestion } from '../types/exam';
import { MCQ_QUESTIONS } from './mcqQuestions';
import { SHORT_ANSWER_QUESTIONS } from './shortEssayQuestions';
import { ESSAY_QUESTIONS } from './essayQuestions';
import {
  HARD_MCQ_QUESTIONS,
  MIS_HARD_CONFUSING_PAIRS,
} from './misHardMcqQuestions';
import {
  HARD_ESSAY_QUESTIONS,
  HARD_SHORT_ANSWER_QUESTIONS,
} from './misHardShortAndEssayQuestions';

export type MisQuestionSet = 'standard' | 'hard';

export {
  MCQ_QUESTIONS,
  SHORT_ANSWER_QUESTIONS,
  ESSAY_QUESTIONS,
  HARD_MCQ_QUESTIONS,
  HARD_SHORT_ANSWER_QUESTIONS,
  HARD_ESSAY_QUESTIONS,
  MIS_HARD_CONFUSING_PAIRS,
};

export const ALL_QUESTIONS: ExamQuestion[] = [
  ...MCQ_QUESTIONS,
  ...SHORT_ANSWER_QUESTIONS,
  ...ESSAY_QUESTIONS,
];

export const HARD_ALL_QUESTIONS: ExamQuestion[] = [
  ...HARD_MCQ_QUESTIONS,
  ...HARD_SHORT_ANSWER_QUESTIONS,
  ...HARD_ESSAY_QUESTIONS,
];

/**
 * Combined lookup map covering BOTH Bộ 1 (1..140) and Bộ 2 – Bộ đề khó (2001..2140)
 * so exam workspaces and history retry-wrong actions resolve seamlessly.
 */
export const QUESTION_BY_ID: Record<number, ExamQuestion> = Object.fromEntries(
  [...ALL_QUESTIONS, ...HARD_ALL_QUESTIONS].map((q) => [q.id, q])
);

export function getMisQuestionPools(set: MisQuestionSet) {
  if (set === 'hard') {
    return {
      mcq: HARD_MCQ_QUESTIONS,
      short: HARD_SHORT_ANSWER_QUESTIONS,
      essay: HARD_ESSAY_QUESTIONS,
      all: HARD_ALL_QUESTIONS,
    };
  }
  return {
    mcq: MCQ_QUESTIONS,
    short: SHORT_ANSWER_QUESTIONS,
    essay: ESSAY_QUESTIONS,
    all: ALL_QUESTIONS,
  };
}

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
  chapters?: number[],
  set: MisQuestionSet = 'standard'
): number[] {
  const pools = getMisQuestionPools(set);
  const chapterFilter = (q: ExamQuestion) =>
    !chapters || chapters.length === 0 || chapters.includes(q.chapter);

  const mcqs = shuffleArray(pools.mcq.filter(chapterFilter)).slice(0, mcqCount);
  const shorts = shuffleArray(pools.short.filter(chapterFilter)).slice(0, shortCount);
  const essays = shuffleArray(pools.essay.filter(chapterFilter)).slice(0, essayCount);

  return [...mcqs, ...shorts, ...essays].map((q) => q.id);
}
