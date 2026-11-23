import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Flag,
  LayoutGrid,
  RefreshCw,
  RotateCcw,
  X,
  XCircle,
} from 'lucide-react';
import {
  ExamConfig,
  ExamQuestion,
  McqOptionKey,
  UserAnswer,
} from '../types/exam';
import { QUESTION_BY_ID } from '../data';
import {
  detectEssayRubricMatches,
  formatTimeClock,
  gradeExam,
  isQuestionAnswered,
} from '../utils/grading';
import { QuestionCard } from './QuestionCard';
import { QuizNavigator } from './QuizNavigator';

interface ExamWorkspaceProps {
  config: ExamConfig;
  finishTriggerCount: number;
  onExitToHome: () => void;
  onStartRetryWrong: (wrongIds: number[]) => void;
  onStartNewMock: () => void;
  onExamSubmitted: (payload: {
    title: string;
    totalQuestions: number;
    answeredCount: number;
    earnedPoints: number;
    maxPoints: number;
    scoreOutOf10: number;
    durationSeconds: number;
    wrongQuestionIds: number[];
    gradingMode: ExamConfig['gradingMode'];
  }) => void;
}

type ReviewFilter = 'all' | 'wrong' | 'unanswered' | 'flagged' | 'essay';

export const ExamWorkspace: React.FC<ExamWorkspaceProps> = ({
  config,
  finishTriggerCount,
  onExitToHome,
  onStartRetryWrong,
  onStartNewMock,
  onExamSubmitted,
}) => {
  const questions = useMemo<ExamQuestion[]>(
    () =>
      config.questionIds
        .map((id) => QUESTION_BY_ID[id])
        .filter((q): q is ExamQuestion => Boolean(q)),
    [config.questionIds]
  );

  const [answers, setAnswers] = useState<Record<number, UserAnswer>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const [showAllOnOnePage, setShowAllOnOnePage] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');

  // Timer state
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(
    config.timeLimitSeconds
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [hideTimer, setHideTimer] = useState(false);

  // Reset state whenever config.id changes
  useEffect(() => {
    setAnswers({});
    setFlaggedIds(new Set());
    setCurrentPage(0);
    setShowAllOnOnePage(false);
    setIsSubmitted(false);
    setShowSummaryModal(false);
    setReviewFilter('all');
    setRemainingSeconds(config.timeLimitSeconds);
    setElapsedSeconds(0);
    setHideTimer(false);
  }, [config.id, config.timeLimitSeconds]);

  // Open summary modal if header CTA triggered finish
  useEffect(() => {
    if (finishTriggerCount > 0 && !isSubmitted) {
      setShowSummaryModal(true);
    }
  }, [finishTriggerCount, isSubmitted]);

  // Countdown & elapsed timer
  useEffect(() => {
    if (isSubmitted) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      if (config.timeLimitSeconds !== null) {
        setRemainingSeconds((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isSubmitted, config.timeLimitSeconds]);

  const summary = useMemo(() => gradeExam(questions, answers), [questions, answers]);

  const handleConfirmSubmit = () => {
    if (isSubmitted) return;

    // Pre-populate essay rubric checkboxes with auto-detected keywords for transparency
    const nextAnswers: Record<number, UserAnswer> = { ...answers };
    for (const q of questions) {
      if (q.type === 'essay') {
        const cur = nextAnswers[q.id] ?? {};
        if (cur.essayRubricChecked === undefined) {
          const detected = detectEssayRubricMatches(q, cur.essay ?? '');
          nextAnswers[q.id] = {
            ...cur,
            essayRubricChecked: detected,
            checked: true,
          };
        }
      }
    }
    setAnswers(nextAnswers);
    setIsSubmitted(true);
    setShowSummaryModal(false);
    setShowAllOnOnePage(true);
    setReviewFilter('all');

    const finalGrade = gradeExam(questions, nextAnswers);
    onExamSubmitted({
      title: config.title,
      totalQuestions: finalGrade.totalCount,
      answeredCount: finalGrade.answeredCount,
      earnedPoints: finalGrade.earnedPoints,
      maxPoints: finalGrade.maxPoints,
      scoreOutOf10: finalGrade.scoreOutOf10,
      durationSeconds: elapsedSeconds,
      wrongQuestionIds: finalGrade.wrongQuestionIds,
      gradingMode: config.gradingMode,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-submit if countdown reaches 0
  useEffect(() => {
    if (
      !isSubmitted &&
      config.timeLimitSeconds !== null &&
      remainingSeconds === 0
    ) {
      handleConfirmSubmit();
    }
  }, [remainingSeconds, isSubmitted, config.timeLimitSeconds]);

  // Handlers
  const handleSelectMcq = (questionId: number, option: McqOptionKey | null) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        mcq: option,
        checked: config.gradingMode === 'instant' ? false : prev[questionId]?.checked,
      },
    }));
  };

  const handleChangeShort = (questionId: number, blankIndex: number, value: string) => {
    setAnswers((prev) => {
      const q = QUESTION_BY_ID[questionId];
      const blankCount = q && q.type === 'short' ? q.blanks.length : 1;
      const existing = prev[questionId]?.short
        ? [...prev[questionId].short]
        : Array(blankCount).fill('');
      existing[blankIndex] = value;
      return {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          short: existing,
          checked: config.gradingMode === 'instant' ? false : prev[questionId]?.checked,
        },
      };
    });
  };

  const handleChangeEssay = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        essay: value,
        // Clear cached manual rubric checks if student edits essay before submission
        essayRubricChecked: isSubmitted ? prev[questionId]?.essayRubricChecked : undefined,
        checked: config.gradingMode === 'instant' ? false : prev[questionId]?.checked,
      },
    }));
  };

  const handleToggleEssayRubric = (questionId: number, rubricId: string) => {
    setAnswers((prev) => {
      const q = QUESTION_BY_ID[questionId];
      if (!q || q.type !== 'essay') return prev;
      const cur = prev[questionId] ?? {};
      const currentList =
        cur.essayRubricChecked !== undefined
          ? cur.essayRubricChecked
          : detectEssayRubricMatches(q, cur.essay ?? '');
      const exists = currentList.includes(rubricId);
      const nextList = exists
        ? currentList.filter((id) => id !== rubricId)
        : [...currentList, rubricId];
      return {
        ...prev,
        [questionId]: {
          ...cur,
          essayRubricChecked: nextList,
        },
      };
    });
  };

  const handleToggleFlag = (questionId: number) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleInstantCheck = (questionId: number) => {
    setAnswers((prev) => {
      const q = QUESTION_BY_ID[questionId];
      const cur = prev[questionId] ?? {};
      let nextRubric = cur.essayRubricChecked;
      if (q && q.type === 'essay' && nextRubric === undefined) {
        nextRubric = detectEssayRubricMatches(q, cur.essay ?? '');
      }
      return {
        ...prev,
        [questionId]: {
          ...cur,
          essayRubricChecked: nextRubric,
          checked: true,
        },
      };
    });
  };

  // Build logical pages: keep MCQ, Short, and Essay grouped cleanly like DUE E-Study
  const pages = useMemo(() => {
    const groupedPages: { question: ExamQuestion; index: number }[][] = [];
    let currentBucket: { question: ExamQuestion; index: number }[] = [];

    questions.forEach((q, idx) => {
      const prevType =
        currentBucket.length > 0 ? currentBucket[0].question.type : null;

      // Essays are 1 per page like screenshot 3; MCQ/Short follow questionsPerPage
      const maxInBucket = q.type === 'essay' ? 1 : config.questionsPerPage;

      if (
        currentBucket.length > 0 &&
        (prevType !== q.type || currentBucket.length >= maxInBucket)
      ) {
        groupedPages.push(currentBucket);
        currentBucket = [];
      }
      currentBucket.push({ question: q, index: idx });
    });

    if (currentBucket.length > 0) {
      groupedPages.push(currentBucket);
    }

    return groupedPages;
  }, [questions, config.questionsPerPage]);

  const totalPages = Math.max(1, pages.length);
  const safePage = Math.min(currentPage, totalPages - 1);

  const filteredItems = useMemo(() => {
    const allItems = questions.map((question, index) => ({ question, index }));
    if (!isSubmitted || reviewFilter === 'all') {
      return allItems;
    }
    return allItems.filter(({ question }) => {
      const res = summary.resultsById[question.id];
      if (reviewFilter === 'wrong') {
        return res && res.status !== 'correct';
      }
      if (reviewFilter === 'unanswered') {
        return !isQuestionAnswered(question, answers[question.id]);
      }
      if (reviewFilter === 'flagged') {
        return flaggedIds.has(question.id);
      }
      if (reviewFilter === 'essay') {
        return question.type === 'essay';
      }
      return true;
    });
  }, [questions, isSubmitted, reviewFilter, summary.resultsById, answers, flaggedIds]);

  const displayedItems = showAllOnOnePage
    ? filteredItems
    : isSubmitted && reviewFilter !== 'all'
    ? filteredItems
    : pages[safePage] ?? [];

  const visibleQuestionIds = useMemo(
    () => new Set(displayedItems.map((item) => item.question.id)),
    [displayedItems]
  );

  const handleJumpToQuestion = (questionIndex: number) => {
    setShowMobileNav(false);
    const targetQuestion = questions[questionIndex];
    if (!targetQuestion) return;

    if (showAllOnOnePage || (isSubmitted && reviewFilter !== 'all')) {
      if (isSubmitted && reviewFilter !== 'all') {
        setReviewFilter('all');
      }
      window.setTimeout(() => {
        const el = document.getElementById(`question-anchor-${targetQuestion.id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
      return;
    }

    const pageIdx = pages.findIndex((bucket) =>
      bucket.some((item) => item.index === questionIndex)
    );
    if (pageIdx !== -1) {
      setCurrentPage(pageIdx);
      window.setTimeout(() => {
        const el = document.getElementById(`question-anchor-${targetQuestion.id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
    }
  };

  const handleChangePage = (nextPage: number) => {
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLowTime =
    remainingSeconds !== null && remainingSeconds > 0 && remainingSeconds <= 120;

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* DUE Course Title + Back Button */}
      <div className="mb-5">
        <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-[#C2410C] leading-snug">
          [271] Hệ thống thông tin quản lý [MIS2002]
        </h1>
        <p className="mt-1 text-sm text-[#475569]">
          {config.title} · {config.subtitle}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onExitToHome}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] rounded transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </button>

            <button
              type="button"
              onClick={() => setShowMobileNav(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-[#0F172A] bg-white border border-[#CBD5E1] rounded hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-[#0B4275]" />
              Bảng câu hỏi ({summary.answeredCount}/{questions.length})
            </button>
          </div>

          {/* Signature DUE Timer Box with Orange Ẩn Button */}
          {!isSubmitted && (
            <div className="flex items-center gap-1.5">
              {!hideTimer && (
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded border text-sm font-medium tabular-nums ${
                    isLowTime
                      ? 'bg-[#FEF2F2] border-[#DC2626] text-[#B91C1C]'
                      : 'bg-white border-[#C2410C]/40 text-[#0F172A]'
                  }`}
                >
                  <Clock className="w-4 h-4 text-[#C2410C] shrink-0" />
                  <span>
                    {remainingSeconds !== null ? 'Thời gian còn lại' : 'Thời gian làm bài'}
                  </span>
                  <span className="font-mono font-semibold">
                    {formatTimeClock(
                      remainingSeconds !== null ? remainingSeconds : elapsedSeconds
                    )}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setHideTimer((prev) => !prev)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] rounded transition-colors cursor-pointer"
              >
                {hideTimer ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    Hiện đồng hồ
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    Ẩn
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post-Submission Result Summary Banner */}
      {isSubmitted && (
        <section className="mb-6 bg-white border border-[#CBD5E1] rounded p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-[#E2E8F0]">
            <div>
              <p className="text-xs font-semibold text-[#0B4275] mb-1">
                Kết quả kiểm tra & Đối chiếu đáp án
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                Tổng điểm:{' '}
                <span className="text-[#C2410C] font-mono tabular-nums">
                  {summary.scoreOutOf10.toFixed(2)} / 10.00
                </span>
              </h2>
              <p className="mt-1 text-sm text-[#475569] tabular-nums">
                Đạt {summary.earnedPoints.toFixed(2)} / {summary.maxPoints.toFixed(1)} điểm gốc · Đã làm{' '}
                {summary.answeredCount}/{summary.totalCount} câu · Thời gian:{' '}
                {formatTimeClock(elapsedSeconds)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {summary.wrongQuestionIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => onStartRetryWrong(summary.wrongQuestionIds)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] rounded transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Làm lại {summary.wrongQuestionIds.length} câu chưa đạt
                </button>
              )}
              <button
                type="button"
                onClick={onStartNewMock}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Tạo đề thi thử mới
              </button>
            </div>
          </div>

          {/* Per-Section Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-b border-[#E2E8F0] text-sm">
            <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-xs font-medium text-[#64748B]">Phần I · Trắc nghiệm</div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-lg font-bold text-[#0F172A] tabular-nums">
                  {summary.mcq.correct}/{summary.mcq.total} câu đúng
                </span>
                <span className="text-xs font-mono tabular-nums text-[#047857] font-semibold">
                  {summary.mcq.earned.toFixed(1)}/{summary.mcq.max.toFixed(1)} đ
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-xs font-medium text-[#64748B]">Phần II · Tự luận ngắn</div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-lg font-bold text-[#0F172A] tabular-nums">
                  {summary.short.correct}/{summary.short.total} câu đúng
                </span>
                <span className="text-xs font-mono tabular-nums text-[#047857] font-semibold">
                  {summary.short.earned.toFixed(1)}/{summary.short.max.toFixed(1)} đ
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-xs font-medium text-[#64748B]">
                Phần III · Tự luận (tự chấm theo ý)
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-lg font-bold text-[#0F172A] tabular-nums">
                  {summary.essay.answered}/{summary.essay.total} câu đã viết
                </span>
                <span className="text-xs font-mono tabular-nums text-[#B45309] font-semibold">
                  {summary.essay.earned.toFixed(2)}/{summary.essay.max.toFixed(1)} đ
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Review Filter Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F1F5F9] rounded-md">
              {(
                [
                  { id: 'all', label: `Tất cả (${questions.length})` },
                  {
                    id: 'wrong',
                    label: `Sai / Chưa đạt (${summary.wrongQuestionIds.length})`,
                  },
                  {
                    id: 'unanswered',
                    label: `Chưa làm (${questions.length - summary.answeredCount})`,
                  },
                  { id: 'flagged', label: `Đã đặt cờ (${flaggedIds.size})` },
                  ...(summary.essay.total > 0
                    ? [{ id: 'essay' as const, label: `Tự luận (${summary.essay.total})` }]
                    : []),
                ] as { id: ReviewFilter; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setReviewFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    reviewFilter === tab.id
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="text-xs text-[#475569]">
              Mẹo: Với câu tự luận, tích chọn các ý chính bạn đã trình bày đúng để cập nhật tổng điểm ngay lập tức.
            </p>
          </div>
        </section>
      )}

      {/* Main 2-Column DUE Layout: Questions (Left/Center) + Quiz Navigator (Right) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 w-full min-w-0">
          {/* Page indicator when paginated */}
          {!showAllOnOnePage && !(isSubmitted && reviewFilter !== 'all') && (
            <div className="mb-4 flex items-center justify-between text-xs text-[#475569]">
              <span className="font-medium">
                Trang {safePage + 1} trên tổng số {totalPages}
              </span>
              <span>
                {displayedItems[0]?.question.type === 'mcq'
                  ? 'Phần I · Trắc nghiệm'
                  : displayedItems[0]?.question.type === 'short'
                  ? 'Phần II · Tự luận ngắn (điền khuyết)'
                  : 'Phần III · Tự luận'}
              </span>
            </div>
          )}

          {displayedItems.length === 0 ? (
            <div className="bg-white border border-[#D6DCE2] rounded p-8 text-center">
              <CheckCircle2 className="w-8 h-8 text-[#059669] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#0F172A]">
                Không có câu hỏi nào trong bộ lọc này.
              </p>
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className="mt-3 px-4 py-1.5 text-xs font-semibold text-white bg-[#0B4275] rounded hover:bg-[#083259] cursor-pointer"
              >
                Xem lại tất cả câu hỏi
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {displayedItems.map(({ question, index }) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  displayNumber={index + 1}
                  answer={answers[question.id]}
                  isFlagged={flaggedIds.has(question.id)}
                  isSubmitted={isSubmitted}
                  gradingMode={config.gradingMode}
                  gradeResult={summary.resultsById[question.id]}
                  onSelectMcq={handleSelectMcq}
                  onChangeShort={handleChangeShort}
                  onChangeEssay={handleChangeEssay}
                  onToggleEssayRubric={handleToggleEssayRubric}
                  onToggleFlag={handleToggleFlag}
                  onInstantCheck={handleInstantCheck}
                />
              ))}
            </div>
          )}

          {/* Bottom Navigation Bar (Trang trước / Trang tiếp / Làm xong ...) */}
          <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
            <div>
              {!showAllOnOnePage && safePage > 0 && (
                <button
                  type="button"
                  onClick={() => handleChangePage(safePage - 1)}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors cursor-pointer"
                >
                  Trang trước
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!showAllOnOnePage && safePage < totalPages - 1 ? (
                <button
                  type="button"
                  onClick={() => handleChangePage(safePage + 1)}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors cursor-pointer"
                >
                  Trang tiếp
                </button>
              ) : !isSubmitted ? (
                <button
                  type="button"
                  onClick={() => setShowSummaryModal(true)}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors cursor-pointer"
                >
                  Làm xong ...
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onExitToHome}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors cursor-pointer"
                >
                  Hoàn tất xem lại
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Sticky Right Quiz Navigator */}
        <div className="hidden lg:block w-64 shrink-0 sticky top-20">
          <QuizNavigator
            questions={questions}
            answers={answers}
            flaggedIds={flaggedIds}
            visibleQuestionIds={visibleQuestionIds}
            isSubmitted={isSubmitted}
            resultsById={summary.resultsById}
            showAllOnOnePage={showAllOnOnePage}
            onJumpToQuestion={handleJumpToQuestion}
            onToggleShowAll={() => setShowAllOnOnePage((prev) => !prev)}
            onFinishClick={() => setShowSummaryModal(true)}
          />
        </div>
      </div>

      {/* Mobile Quiz Navigator Drawer */}
      {showMobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/40">
          <div className="w-80 max-w-[88vw] bg-white h-full p-4 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#0F172A]">Điều hướng bài làm</span>
              <button
                type="button"
                onClick={() => setShowMobileNav(false)}
                className="p-1.5 text-[#475569] hover:text-[#0F172A] rounded cursor-pointer"
                aria-label="Đóng bảng câu hỏi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <QuizNavigator
              questions={questions}
              answers={answers}
              flaggedIds={flaggedIds}
              visibleQuestionIds={visibleQuestionIds}
              isSubmitted={isSubmitted}
              resultsById={summary.resultsById}
              showAllOnOnePage={showAllOnOnePage}
              onJumpToQuestion={handleJumpToQuestion}
              onToggleShowAll={() => {
                setShowAllOnOnePage((prev) => !prev);
                setShowMobileNav(false);
              }}
              onFinishClick={() => {
                setShowMobileNav(false);
                setShowSummaryModal(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Moodle-style Pre-Submission Summary Modal ("Tóm tắt lần làm bài") */}
      {showSummaryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-summary-title"
        >
          <div className="bg-white rounded border border-[#CBD5E1] max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-xl">
            <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <h2
                id="submit-summary-title"
                className="text-lg font-bold text-[#0F172A]"
              >
                Tóm tắt lần làm bài
              </h2>
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="p-1.5 text-[#475569] hover:text-[#0F172A] rounded cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              {summary.answeredCount < questions.length && (
                <div className="mb-4 p-3.5 rounded bg-[#FFFBEB] border border-[#FCD34D] text-sm text-[#92400E] flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    Bạn còn{' '}
                    <strong className="tabular-nums">
                      {questions.length - summary.answeredCount}
                    </strong>{' '}
                    câu chưa trả lời. Bạn có thể quay lại làm tiếp hoặc nộp bài để kiểm tra đáp án ngay.
                  </span>
                </div>
              )}

              <div className="border border-[#E2E8F0] rounded overflow-hidden">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-semibold text-[#475569]">
                    <tr>
                      <th className="px-4 py-2.5">Câu hỏi</th>
                      <th className="px-4 py-2.5">Dạng bài</th>
                      <th className="px-4 py-2.5">Trạng thái</th>
                      <th className="px-4 py-2.5 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {questions.map((q, idx) => {
                      const answered = isQuestionAnswered(q, answers[q.id]);
                      const flagged = flaggedIds.has(q.id);
                      return (
                        <tr key={q.id} className="hover:bg-[#F8FAFC]">
                          <td className="px-4 py-2.5 font-semibold text-[#0F172A] tabular-nums">
                            Câu {idx + 1}
                            {flagged && (
                              <Flag className="inline-block w-3.5 h-3.5 ml-1.5 fill-[#DC2626] text-[#DC2626]" />
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-[#475569]">
                            {q.type === 'mcq'
                              ? 'Trắc nghiệm'
                              : q.type === 'short'
                              ? 'Tự luận ngắn'
                              : 'Tự luận'}
                          </td>
                          <td className="px-4 py-2.5">
                            {answered ? (
                              <span className="inline-flex items-center gap-1 text-[#047857] font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Đã lưu câu trả lời
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[#B91C1C]">
                                <XCircle className="w-3.5 h-3.5" />
                                Chưa trả lời
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setShowSummaryModal(false);
                                handleJumpToQuestion(idx);
                              }}
                              className="text-xs font-semibold text-[#0B4275] hover:underline cursor-pointer"
                            >
                              Đi tới câu
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2 text-sm font-medium text-[#334155] bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] rounded transition-colors cursor-pointer"
              >
                Quay lại làm bài
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-5 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors cursor-pointer"
              >
                Nộp bài và kết thúc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
