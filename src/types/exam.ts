export type SubjectId = 'mis2002' | 'sta2005' | 'nmkd2026' | 'gtkd';

export type QuestionType = 'mcq' | 'short' | 'essay';

export type McqOptionKey = 'a' | 'b' | 'c' | 'd' | 'e';

export type AnswerFlag = 'inferred' | 'conflict';

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
  /** Optional status flag for questions whose source key was inferred (*) or conflicted (⚠) */
  answerFlag?: AnswerFlag;
  /** Optional explanatory note shown with answer feedback */
  note?: string;
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
  answerFlag?: AnswerFlag;
  note?: string;
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
  subjectId?: SubjectId;
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
  /** Optional STA2005 exam code (1..18) for direct retake */
  staExamNumber?: number;
  /** Optional NMKD 2026 exam code (1..10) for direct retake */
  nmkdExamNumber?: number;
  /** Optional GTKD segment exam number (1..5) for direct retake */
  gtkdSegmentNumber?: number;
}

export interface ChapterInfo {
  chapter: number;
  title: string;
  shortTitle: string;
}

/* ==================== STA2005 (Xác suất thống kê toán) Types ==================== */

export interface StaRubricStep {
  id: string;
  label: string;
  points: number;
  expected: string;
  keywords: string[];
}

export interface StaProblem {
  number: 1 | 2 | 3;
  points: number;
  stem: string;
  subParts: string[];
  solution: string;
  mathNote?: string;
  rubric: StaRubricStep[];
}

export interface StaExamPaper {
  examNumber: number;
  code: string;
  topicSummary: string;
  timeLimitMinutes: number;
  problems: [StaProblem, StaProblem, StaProblem];
}

/* ==================== NMKD 2026 (Nhập môn kinh doanh - MGT2002) Types ==================== */

export interface NmkdExamSet {
  examNumber: number;
  code: string;
  examCode: string;
  title: string;
  questionIds: number[];
}

/* ==================== GTKD (Giao tiếp kinh doanh) Types ==================== */

export interface GtkdGroupInfo {
  group: number;
  title: string;
  shortTitle: string;
  sourceLabel: string;
  rangeLabel: string;
}

export interface GtkdSegmentSet {
  segmentNumber: number;
  code: string;
  title: string;
  rangeLabel: string;
  questionIds: number[];
}

