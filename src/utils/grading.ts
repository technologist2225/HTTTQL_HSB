import {
  EssayQuestion,
  ExamQuestion,
  QuestionGradeResult,
  ShortAnswerQuestion,
  UserAnswer,
} from '../types/exam';

/**
 * Normalizes Vietnamese/English text for forgiving answer comparison:
 * - lowercases
 * - converts đ/Đ -> d
 * - removes combining diacritical marks
 * - replaces dashes/punctuation with spaces
 * - collapses whitespace
 */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-–—/().,;:'"“”?!]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isQuestionAnswered(question: ExamQuestion, answer?: UserAnswer): boolean {
  if (!answer) return false;
  if (question.type === 'mcq') {
    return Boolean(answer.mcq);
  }
  if (question.type === 'short') {
    return Boolean(answer.short && answer.short.some((val) => val.trim().length > 0));
  }
  return Boolean(answer.essay && answer.essay.trim().length > 0);
}

export function evaluateShortBlank(userInput: string, acceptedVariants: string[]): boolean {
  const normalizedUser = normalizeText(userInput);
  if (!normalizedUser) return false;

  // Also strip "%" for numeric percentage blanks like "20%" vs "20"
  const userNoPercent = normalizedUser.replace(/%/g, '').trim();

  return acceptedVariants.some((variant) => {
    const normalizedVariant = normalizeText(variant);
    const variantNoPercent = normalizedVariant.replace(/%/g, '').trim();
    return (
      normalizedUser === normalizedVariant ||
      (userNoPercent.length > 0 && userNoPercent === variantNoPercent)
    );
  });
}

export function detectEssayRubricMatches(question: EssayQuestion, essayText: string): string[] {
  const normalizedEssay = normalizeText(essayText);
  if (!normalizedEssay) return [];

  return question.rubric
    .filter((item) =>
      item.keywords.some((kw) => {
        const normKw = normalizeText(kw);
        return normKw.length > 0 && normalizedEssay.includes(normKw);
      })
    )
    .map((item) => item.id);
}

export function gradeQuestion(question: ExamQuestion, answer?: UserAnswer): QuestionGradeResult {
  if (question.type === 'mcq') {
    if (!answer?.mcq) {
      return {
        questionId: question.id,
        type: 'mcq',
        maxPoints: question.points,
        earnedPoints: 0,
        status: 'unanswered',
      };
    }
    const isCorrect = answer.mcq === question.correctOption;
    return {
      questionId: question.id,
      type: 'mcq',
      maxPoints: question.points,
      earnedPoints: isCorrect ? question.points : 0,
      status: isCorrect ? 'correct' : 'incorrect',
    };
  }

  if (question.type === 'short') {
    const q = question as ShortAnswerQuestion;
    const inputs = answer?.short ?? q.blanks.map(() => '');
    const hasAnyInput = inputs.some((s) => s.trim().length > 0);

    if (!hasAnyInput) {
      return {
        questionId: q.id,
        type: 'short',
        maxPoints: q.points,
        earnedPoints: 0,
        status: 'unanswered',
        blankResults: q.blanks.map(() => false),
      };
    }

    const blankResults = q.blanks.map((blank, idx) =>
      evaluateShortBlank(inputs[idx] ?? '', blank.accepted)
    );
    const correctCount = blankResults.filter(Boolean).length;
    const earnedPoints =
      q.blanks.length > 0
        ? Math.round((correctCount / q.blanks.length) * q.points * 100) / 100
        : 0;

    let status: QuestionGradeResult['status'] = 'incorrect';
    if (correctCount === q.blanks.length) {
      status = 'correct';
    } else if (correctCount > 0) {
      status = 'partial';
    }

    return {
      questionId: q.id,
      type: 'short',
      maxPoints: q.points,
      earnedPoints,
      status,
      blankResults,
    };
  }

  // Essay question
  const essayText = answer?.essay?.trim() ?? '';
  const detectedRubricIds = detectEssayRubricMatches(question, essayText);
  const effectiveCheckedIds =
    answer?.essayRubricChecked !== undefined ? answer.essayRubricChecked : detectedRubricIds;

  if (!essayText && (!answer?.essayRubricChecked || answer.essayRubricChecked.length === 0)) {
    return {
      questionId: question.id,
      type: 'essay',
      maxPoints: question.points,
      earnedPoints: 0,
      status: 'unanswered',
      detectedRubricIds: [],
    };
  }

  const ratio =
    question.rubric.length > 0 ? effectiveCheckedIds.length / question.rubric.length : 0;
  const earnedPoints = Math.round(ratio * question.points * 100) / 100;

  let status: QuestionGradeResult['status'] = 'self-check';
  if (effectiveCheckedIds.length === question.rubric.length) {
    status = 'correct';
  } else if (effectiveCheckedIds.length > 0) {
    status = 'partial';
  }

  return {
    questionId: question.id,
    type: 'essay',
    maxPoints: question.points,
    earnedPoints,
    status,
    detectedRubricIds,
  };
}

export interface ExamScoreSummary {
  earnedPoints: number;
  maxPoints: number;
  scoreOutOf10: number;
  answeredCount: number;
  totalCount: number;
  mcq: { correct: number; total: number; earned: number; max: number };
  short: { correct: number; partial: number; total: number; earned: number; max: number };
  essay: { answered: number; total: number; earned: number; max: number };
  wrongQuestionIds: number[];
  resultsById: Record<number, QuestionGradeResult>;
}

export function gradeExam(
  questions: ExamQuestion[],
  answers: Record<number, UserAnswer>
): ExamScoreSummary {
  const resultsById: Record<number, QuestionGradeResult> = {};
  let earnedPoints = 0;
  let maxPoints = 0;
  let answeredCount = 0;

  const mcq = { correct: 0, total: 0, earned: 0, max: 0 };
  const short = { correct: 0, partial: 0, total: 0, earned: 0, max: 0 };
  const essay = { answered: 0, total: 0, earned: 0, max: 0 };
  const wrongQuestionIds: number[] = [];

  for (const q of questions) {
    const ans = answers[q.id];
    const result = gradeQuestion(q, ans);
    resultsById[q.id] = result;

    earnedPoints += result.earnedPoints;
    maxPoints += result.maxPoints;
    if (isQuestionAnswered(q, ans)) {
      answeredCount += 1;
    }

    if (q.type === 'mcq') {
      mcq.total += 1;
      mcq.max += q.points;
      mcq.earned += result.earnedPoints;
      if (result.status === 'correct') {
        mcq.correct += 1;
      } else {
        wrongQuestionIds.push(q.id);
      }
    } else if (q.type === 'short') {
      short.total += 1;
      short.max += q.points;
      short.earned += result.earnedPoints;
      if (result.status === 'correct') {
        short.correct += 1;
      } else {
        if (result.status === 'partial') short.partial += 1;
        wrongQuestionIds.push(q.id);
      }
    } else {
      essay.total += 1;
      essay.max += q.points;
      essay.earned += result.earnedPoints;
      if (isQuestionAnswered(q, ans)) {
        essay.answered += 1;
      }
      if (result.status !== 'correct') {
        wrongQuestionIds.push(q.id);
      }
    }
  }

  const roundedEarned = Math.round(earnedPoints * 100) / 100;
  const roundedMax = Math.round(maxPoints * 100) / 100;
  const scoreOutOf10 =
    roundedMax > 0 ? Math.round((roundedEarned / roundedMax) * 100) / 10 : 0;

  return {
    earnedPoints: roundedEarned,
    maxPoints: roundedMax,
    scoreOutOf10,
    answeredCount,
    totalCount: questions.length,
    mcq,
    short,
    essay,
    wrongQuestionIds,
    resultsById,
  };
}

export function formatTimeClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${hours}:${pad(minutes)}:${pad(seconds)}`;
}
