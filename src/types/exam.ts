export type QuestionType = 'mcq' | 'short' | 'essay';

export type McqOptionKey = 'a' | 'b' | 'c' | 'd' | 'e';

export interface McqOption {
  key: McqOptionKey;
  text: string;
}

export interface McqQuestion {
  id: number;
  type: 'mcq';
  chapter: number;
  prompt: string;
  options: McqOption[];
  correctOption: McqOptionKey;
  points: number;
}

export interface ShortBlankAnswer {
  /** Official display string for this blank */
  display: string;
  /** Accepted variants (case- and accent-insensitive) */
  accepted: string[];
}

export interface ShortAnswerQuestion {
  id: number;
  type: 'short';
  chapter: number;
  /**
   * Text segments split around each blank.
   * For 1 blank: [before, after]. For 2 blanks: [before, middle, after].
   */
  segments: string[];
  blanks: ShortBlankAnswer[];
  officialAnswer: string;
  points: number;
}

export interface EssayRubricItem {
  id: string;
  label: string;
  detail: string;
  /** Keywords used to auto-detect coverage in student's typed essay */
  keywords: string[];
}

export interface EssayQuestion {
  id: number;
  type: 'essay';
  chapter: number;
  prompt: string;
  modelAnswerBullets: string[];
  rubric: EssayRubricItem[];
  points: number;
}

export type ExamQuestion = McqQuestion | ShortAnswerQuestion | EssayQuestion;

export type GradingMode = 'submit' | 'instant';

export interface ExamConfig {
  id: string;
  title: string;
  subtitle: string;
  questionIds: number[];
  /** Time limit in seconds; null means unlimited */
  timeLimitSeconds: number | null;
  gradingMode: GradingMode;
  questionsPerPage: number;
}

export interface UserAnswer {
  mcq?: McqOptionKey | null;
  short?: string[];
  essay?: string;
  /** Checked rubric item IDs for essay self-evaluation */
  essayRubricChecked?: string[];
  /** Whether user has triggered instant-check on this specific question */
  checked?: boolean;
}

export interface QuestionGradeResult {
  questionId: number;
  type: QuestionType;
  maxPoints: number;
  earnedPoints: number;
  status: 'unanswered' | 'correct' | 'incorrect' | 'partial' | 'self-check';
  /** Per-blank correctness for short answer questions */
  blankResults?: boolean[];
  /** Matched rubric IDs detected via keywords for essay questions */
  detectedRubricIds?: string[];
}

export interface ExamHistoryRecord {
  id: string;
  title: string;
  completedAt: string;
  totalQuestions: number;
  answeredCount: number;
  earnedPoints: number;
  maxPoints: number;
  scoreOutOf10: number;
  durationSeconds: number;
  wrongQuestionIds: number[];
  gradingMode: GradingMode;
}

export interface ChapterInfo {
  chapter: number;
  title: string;
  shortTitle: string;
}
