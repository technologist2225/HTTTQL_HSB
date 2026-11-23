import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Flag,
  Info,
  RotateCcw,
  Send,
  Table2,
} from 'lucide-react';
import { GradingMode, StaExamPaper, StaProblem } from '../types/exam';
import { formatTimeClock, normalizeText } from '../utils/grading';
import { NormalDistributionTable } from './NormalDistributionTable';

interface StaExamWorkspaceProps {
  exam: StaExamPaper;
  gradingMode: GradingMode;
  timeLimitSeconds: number | null;
  finishTriggerCount: number;
  onExitToSubjectHome: () => void;
  onStartExamByNumber: (examNumber: number, gradingMode: GradingMode) => void;
  onExamSubmitted: (payload: {
    subjectId: 'sta2005';
    staExamNumber: number;
    title: string;
    totalQuestions: number;
    answeredCount: number;
    earnedPoints: number;
    maxPoints: number;
    scoreOutOf10: number;
    durationSeconds: number;
    wrongQuestionIds: number[];
    gradingMode: GradingMode;
  }) => void;
}

interface StaProblemAnswerState {
  text: string;
  checked: boolean;
  /** Manually chosen rubric step IDs; undefined means auto-detected */
  rubricChecked?: string[];
}

function normalizeMathForKeywordMatch(input: string): string {
  const base = input.toLowerCase().replace(/,/g, '.');
  return `${base} ${normalizeText(input)}`;
}

function detectStaRubricIds(problem: StaProblem, text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  const haystack = normalizeMathForKeywordMatch(trimmed);

  return problem.rubric
    .filter((step) =>
      step.keywords.some((kw) => {
        const cleanKw = kw.trim().toLowerCase().replace(/,/g, '.');
        const normKw = normalizeText(kw);
        return (
          (cleanKw.length > 0 && haystack.includes(cleanKw)) ||
          (normKw.length > 0 && haystack.includes(normKw))
        );
      })
    )
    .map((step) => step.id);
}

export const StaExamWorkspace: React.FC<StaExamWorkspaceProps> = ({
  exam,
  gradingMode,
  timeLimitSeconds,
  finishTriggerCount,
  onExitToSubjectHome,
  onStartExamByNumber,
  onExamSubmitted,
}) => {
  const [answers, setAnswers] = useState<Record<number, StaProblemAnswerState>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [hideTimer, setHideTimer] = useState(false);
  const [showZTable, setShowZTable] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1280 : false
  );
  const [zTableTab, setZTableTab] = useState<'table' | 'formulas'>('table');

  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(timeLimitSeconds);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const submittedRef = useRef(false);
  const lastTriggerRef = useRef(finishTriggerCount);

  // Reset state whenever exam changes
  useEffect(() => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setShowSummaryModal(false);
    setRemainingSeconds(timeLimitSeconds);
    setElapsedSeconds(0);
    submittedRef.current = false;
  }, [exam.examNumber, gradingMode, timeLimitSeconds]);

  // Compute live score per problem and overall
  const scoring = useMemo(() => {
    const perProblem: Record<
      number,
      {
        earned: number;
        max: number;
        detectedIds: string[];
        effectiveIds: string[];
        answered: boolean;
      }
    > = {};

    let totalEarned = 0;
    let totalMax = 0;
    let answeredCount = 0;

    for (const prob of exam.problems) {
      const state = answers[prob.number];
      const text = state?.text ?? '';
      const detectedIds = detectStaRubricIds(prob, text);
      const effectiveIds =
        state?.rubricChecked !== undefined ? state.rubricChecked : detectedIds;

      const earned = prob.rubric.reduce(
        (sum, step) => (effectiveIds.includes(step.id) ? sum + step.points : sum),
        0
      );
      const roundedEarned = Math.round(earned * 100) / 100;
      const answered = text.trim().length > 0 || (state?.rubricChecked?.length ?? 0) > 0;

      perProblem[prob.number] = {
        earned: roundedEarned,
        max: prob.points,
        detectedIds,
        effectiveIds,
        answered,
      };

      totalEarned += roundedEarned;
      totalMax += prob.points;
      if (answered) answeredCount += 1;
    }

    const roundedTotal = Math.round(totalEarned * 100) / 100;
    const scoreOutOf10 =
      totalMax > 0 ? Math.round((roundedTotal / totalMax) * 100) / 10 : 0;

    return {
      perProblem,
      totalEarned: roundedTotal,
      totalMax,
      scoreOutOf10,
      answeredCount,
    };
  }, [exam.problems, answers]);

  const finalizeExam = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setIsSubmitted(true);
    setShowSummaryModal(false);

    // Compute snapshot at submission time
    const wrongNums = exam.problems
      .filter((p) => (scoring.perProblem[p.number]?.earned ?? 0) < p.points)
      .map((p) => p.number);

    onExamSubmitted({
      subjectId: 'sta2005',
      staExamNumber: exam.examNumber,
      title: `STA2005 · Đề ${exam.code} (${exam.topicSummary})`,
      totalQuestions: exam.problems.length,
      answeredCount: scoring.answeredCount,
      earnedPoints: scoring.totalEarned,
      maxPoints: scoring.totalMax,
      scoreOutOf10: scoring.scoreOutOf10,
      durationSeconds: elapsedSeconds,
      wrongQuestionIds: wrongNums,
      gradingMode,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [
    exam.code,
    exam.examNumber,
    exam.problems,
    exam.topicSummary,
    elapsedSeconds,
    gradingMode,
    onExamSubmitted,
    scoring,
  ]);

  // Trigger summary modal from Header CTA
  useEffect(() => {
    if (finishTriggerCount !== lastTriggerRef.current) {
      lastTriggerRef.current = finishTriggerCount;
      if (!isSubmitted) {
        setShowSummaryModal(true);
      }
    }
  }, [finishTriggerCount, isSubmitted]);

  // Countdown / Elapsed timer
  useEffect(() => {
    if (isSubmitted) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setRemainingSeconds((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          window.clearInterval(timer);
          finalizeExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isSubmitted, finalizeExam]);

  const handleTextChange = (probNum: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [probNum]: {
        text: value,
        checked: prev[probNum]?.checked ?? false,
        rubricChecked: prev[probNum]?.rubricChecked,
      },
    }));
  };

  const handleInstantCheck = (probNum: number) => {
    setAnswers((prev) => ({
      ...prev,
      [probNum]: {
        text: prev[probNum]?.text ?? '',
        checked: true,
        rubricChecked: prev[probNum]?.rubricChecked,
      },
    }));
  };

  const handleToggleRubricStep = (prob: StaProblem, stepId: string) => {
    const currentEffective = scoring.perProblem[prob.number]?.effectiveIds ?? [];
    const nextIds = currentEffective.includes(stepId)
      ? currentEffective.filter((id) => id !== stepId)
      : [...currentEffective, stepId];

    setAnswers((prev) => ({
      ...prev,
      [prob.number]: {
        text: prev[prob.number]?.text ?? '',
        checked: prev[prob.number]?.checked ?? false,
        rubricChecked: nextIds,
      },
    }));
  };

  const handleCheckAllRubric = (prob: StaProblem, checkAll: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [prob.number]: {
        text: prev[prob.number]?.text ?? '',
        checked: prev[prob.number]?.checked ?? false,
        rubricChecked: checkAll ? prob.rubric.map((r) => r.id) : [],
      },
    }));
  };

  const isLowTime = remainingSeconds !== null && remainingSeconds <= 300;
  const nextExamNumber = exam.examNumber < 18 ? exam.examNumber + 1 : 1;

  return (
    <main className="max-w-[1380px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Exam Title & Action Row */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] mb-1">
          <span>
            Khoa Thống kê - Tin học · Học phần STA2005 · Thực hiện bởi{' '}
            <strong className="text-[#0B4275] dark:text-[#38BDF8]">Anh Hoàng 51K33</strong>
          </span>
          <span className="font-mono tabular-nums">
            {gradingMode === 'instant'
              ? 'Chế độ: Ôn tập (Check từng câu)'
              : 'Chế độ: Thi thử 60 phút'}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-bold text-[#C2410C] dark:text-[#FB923C] tracking-tight">
          [STA2005] Lý thuyết xác suất và thống kê toán — Đề {exam.code}
        </h1>
        <p className="mt-1 text-sm text-[#475569] dark:text-[#94A3B8]">
          {exam.topicSummary} · 3 bài toán (Câu 1: 2,0đ · Câu 2: 3,0đ · Câu 3: 5,0đ · Tổng 10,0 điểm)
        </p>

        {/* Action Strip: Quay lại + Toggle Bảng N(0,1) + Timer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onExitToSubjectHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] rounded transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Danh sách 18 đề
            </button>

            <button
              type="button"
              onClick={() => {
                setZTableTab('table');
                setShowZTable((prev) => !prev);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded border transition-colors cursor-pointer ${
                showZTable
                  ? 'bg-[#0B4275] dark:bg-[#1D63A8] text-white border-[#0B4275] dark:border-[#1D63A8]'
                  : 'bg-white dark:bg-[#151F32] text-[#0B4275] dark:text-[#38BDF8] border-[#0B4275]/40 dark:border-[#38BDF8]/40 hover:bg-[#E7F3F5] dark:hover:bg-[#122631]'
              }`}
            >
              <Table2 className="w-4 h-4" />
              {showZTable ? 'Ẩn bảng N(0,1)' : 'Mở bảng phân phối chuẩn hóa N(0,1)'}
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded border text-sm font-mono tabular-nums ${
                isLowTime && !isSubmitted
                  ? 'border-[#DC2626] bg-[#FEF2F2] dark:bg-[#450A0A]/50 text-[#B91C1C] dark:text-[#FCA5A5]'
                  : 'border-[#C2410C]/40 dark:border-[#FB923C]/40 bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC]'
              }`}
            >
              <Clock className="w-4 h-4 text-[#C2410C] dark:text-[#FB923C]" />
              {!hideTimer && (
                <span>
                  {remainingSeconds !== null
                    ? `Thời gian còn lại ${formatTimeClock(remainingSeconds)}`
                    : `Đã làm ${formatTimeClock(elapsedSeconds)}`}
                </span>
              )}
              <button
                type="button"
                onClick={() => setHideTimer((prev) => !prev)}
                className="text-xs font-sans font-medium text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] ml-1 inline-flex items-center gap-1 cursor-pointer"
              >
                {hideTimer ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    Hiện
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    Ẩn
                  </>
                )}
              </button>
            </div>

            {!isSubmitted && (
              <button
                type="button"
                onClick={() => setShowSummaryModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Nộp bài & Xem đáp án
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Post-submission Scoreboard */}
      {isSubmitted && (
        <section className="mb-6 bg-white dark:bg-[#151F32] border border-[#B6D4DA] dark:border-[#244A5C] rounded p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0] dark:border-[#243249]">
            <div>
              <div className="text-xs font-semibold text-[#047857] dark:text-[#34D399] inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Đã hoàn thành Đề {exam.code} · Hiển thị toàn bộ lời giải & bảng kiểm tự chấm
              </div>
              <h2 className="mt-1 text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Điểm tự chấm hiện tại:{' '}
                <span className="font-mono tabular-nums text-[#C2410C] dark:text-[#FB923C]">
                  {scoring.totalEarned.toFixed(2)} / {scoring.totalMax.toFixed(2)} điểm
                </span>
              </h2>
              <p className="mt-1 text-xs text-[#475569] dark:text-[#94A3B8]">
                Hãy đối chiếu bài làm của bạn với đáp án chuẩn bên dưới và tick/bỏ tick từng ý trong bảng kiểm để cập nhật điểm chính xác.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => onStartExamByNumber(exam.examNumber, gradingMode)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-[#334155] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#CBD5E1] dark:border-[#334155] rounded transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Làm lại Đề {exam.code}
              </button>
              <button
                type="button"
                onClick={() => onStartExamByNumber(nextExamNumber, gradingMode)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
              >
                Làm tiếp Đề {String(nextExamNumber).padStart(2, '0')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center font-mono tabular-nums">
            {exam.problems.map((p) => {
              const res = scoring.perProblem[p.number];
              return (
                <div
                  key={p.number}
                  className="p-3 rounded bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#243249]"
                >
                  <div className="text-xs font-sans text-[#64748B] dark:text-[#94A3B8]">
                    Câu {p.number}
                  </div>
                  <div className="mt-1 text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    {(res?.earned ?? 0).toFixed(2)} / {p.points.toFixed(1)}đ
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Layout: Split pane on xl+ when Z-Table is open */}
      <div
        className={`grid grid-cols-1 gap-6 items-start ${
          showZTable ? 'xl:grid-cols-12' : ''
        }`}
      >
        {/* Left: Problems Column */}
        <div className={showZTable ? 'xl:col-span-7 space-y-6' : 'space-y-6 max-w-[1040px]'}>
          {/* Quick Problem Jump Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#334155] dark:text-[#CBD5E1]">
                Điều hướng nhanh:
              </span>
              {exam.problems.map((p) => {
                const info = scoring.perProblem[p.number];
                const isFlag = Boolean(flagged[p.number]);
                return (
                  <a
                    key={p.number}
                    href={`#sta-problem-${p.number}`}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border font-medium transition-colors ${
                      info?.answered
                        ? 'bg-[#E7F3F5] dark:bg-[#122631] border-[#0B4275]/40 dark:border-[#38BDF8]/40 text-[#0B4275] dark:text-[#38BDF8]'
                        : 'bg-[#F8FAFC] dark:bg-[#0F172A] border-[#CBD5E1] dark:border-[#334155] text-[#475569] dark:text-[#94A3B8] hover:border-[#0B4275]'
                    }`}
                  >
                    Câu {p.number} ({p.points}đ)
                    {isFlag && <Flag className="w-3 h-3 text-[#C2410C] dark:text-[#FB923C]" />}
                  </a>
                );
              })}
            </div>
            <span className="text-[#64748B] dark:text-[#94A3B8] font-mono tabular-nums">
              Đã trả lời: {scoring.answeredCount}/3 câu
            </span>
          </div>

          {/* 3 Problems in Signature DUE Moodle 2-column Card Style */}
          {exam.problems.map((prob) => {
            const ansState = answers[prob.number];
            const probScore = scoring.perProblem[prob.number];
            const isRevealed = isSubmitted || Boolean(ansState?.checked);
            const isFlag = Boolean(flagged[prob.number]);

            return (
              <article
                id={`sta-problem-${prob.number}`}
                key={prob.number}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 scroll-mt-24"
              >
                {/* Left Info Box */}
                <aside className="md:col-span-3 bg-[#F3F5F7] dark:bg-[#182338] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-4 text-xs space-y-2.5 self-start">
                  <div className="text-sm font-bold text-[#0B4275] dark:text-[#38BDF8]">
                    Câu hỏi <span className="text-base font-mono">{prob.number}</span>
                  </div>

                  <div className="text-[#475569] dark:text-[#94A3B8]">
                    {isRevealed ? (
                      <span className="font-semibold text-[#047857] dark:text-[#34D399]">
                        Đã hiện đáp án
                      </span>
                    ) : probScore?.answered ? (
                      <span className="font-semibold text-[#0B4275] dark:text-[#38BDF8]">
                        Đã nhập bài làm
                      </span>
                    ) : (
                      <span>Chưa trả lời</span>
                    )}
                  </div>

                  <div className="font-mono tabular-nums text-[#334155] dark:text-[#CBD5E1]">
                    {isRevealed
                      ? `Đạt ${probScore.earned.toFixed(2)} / ${prob.points.toFixed(2)} điểm`
                      : `Đạt điểm ${prob.points.toFixed(2).replace('.', ',')}`}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFlagged((prev) => ({
                        ...prev,
                        [prob.number]: !prev[prob.number],
                      }))
                    }
                    className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      isFlag
                        ? 'text-[#C2410C] dark:text-[#FB923C] font-semibold'
                        : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    {isFlag ? 'Bỏ đặt cờ' : 'Đặt cờ'}
                  </button>
                </aside>

                {/* Right Problem Box */}
                <div className="md:col-span-9 space-y-4">
                  <div className="bg-[#E7F3F5] dark:bg-[#122631] border border-[#B6D4DA] dark:border-[#244A5C] rounded p-5">
                    <div className="text-[15px] leading-relaxed text-[#0F172A] dark:text-[#F8FAFC] whitespace-pre-line font-medium">
                      {prob.stem}
                    </div>

                    {prob.subParts.length > 0 && (
                      <ul className="mt-3.5 space-y-2 text-[14.5px] leading-relaxed text-[#1E293B] dark:text-[#E2E8F0]">
                        {prob.subParts.map((part, idx) => (
                          <li key={idx} className="whitespace-pre-line">
                            {part}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Student Workspace Textarea */}
                    <div className="mt-5">
                      <label
                        htmlFor={`sta-answer-${exam.examNumber}-${prob.number}`}
                        className="block text-xs font-semibold text-[#334155] dark:text-[#CBD5E1] mb-1.5"
                      >
                        Bài làm của bạn (nhập công thức, giá trị tra bảng z và kết quả từng ý):
                      </label>
                      <textarea
                        id={`sta-answer-${exam.examNumber}-${prob.number}`}
                        rows={6}
                        value={ansState?.text ?? ''}
                        onChange={(e) => handleTextChange(prob.number, e.target.value)}
                        placeholder={`Trình bày lời giải Câu ${prob.number} (VD: a. z = ..., P = ...; b. KTC 95% = ...)`}
                        className="w-full px-3.5 py-2.5 text-sm font-mono leading-relaxed rounded border border-[#B6D4DA] dark:border-[#2B4F62] bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
                      />
                    </div>

                    {/* Instant Check Action */}
                    {gradingMode === 'instant' && !isRevealed && (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                          Bạn có thể đối chiếu ngay lời giải chi tiết của Câu {prob.number}.
                        </span>
                        <button
                          type="button"
                          onClick={() => handleInstantCheck(prob.number)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Kiểm tra đáp án Câu {prob.number}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Revealed Solution & Interactive Rubric */}
                  {isRevealed && (
                    <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-5 space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide text-[#047857] dark:text-[#34D399] mb-2">
                          Đáp án & Hướng dẫn giải Câu {prob.number}
                        </div>
                        <div className="text-sm leading-relaxed text-[#1E293B] dark:text-[#E2E8F0] whitespace-pre-line font-mono bg-[#F8FAFC] dark:bg-[#0F172A] p-4 rounded border border-[#E2E8F0] dark:border-[#243249]">
                          {prob.solution}
                        </div>
                      </div>

                      {prob.mathNote && (
                        <div className="p-3.5 rounded bg-[#FEF3C7]/60 dark:bg-[#78350F]/25 border border-[#F59E0B]/40 dark:border-[#F59E0B]/30 flex items-start gap-2.5 text-xs text-[#92400E] dark:text-[#FDE68A]">
                          <Info className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{prob.mathNote}</span>
                        </div>
                      )}

                      {/* Interactive Rubric Self-Check */}
                      <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#243249]">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                              Bảng kiểm tự chấm Câu {prob.number} ({probScore.earned.toFixed(2)} /{' '}
                              {prob.points.toFixed(2)} điểm)
                            </h4>
                            <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                              Hệ thống tự nhận diện số liệu trùng khớp từ bài làm của bạn; bạn có thể tick/bỏ tick thủ công để chấm chính xác.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <button
                              type="button"
                              onClick={() => handleCheckAllRubric(prob, true)}
                              className="font-medium text-[#0B4275] dark:text-[#38BDF8] hover:underline cursor-pointer"
                            >
                              Chọn đủ ý
                            </button>
                            <span className="text-[#CBD5E1] dark:text-[#334155]">·</span>
                            <button
                              type="button"
                              onClick={() => handleCheckAllRubric(prob, false)}
                              className="font-medium text-[#64748B] dark:text-[#94A3B8] hover:underline cursor-pointer"
                            >
                              Bỏ chọn
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {prob.rubric.map((step) => {
                            const isChecked = probScore.effectiveIds.includes(step.id);
                            const isAutoMatched = probScore.detectedIds.includes(step.id);
                            return (
                              <label
                                key={step.id}
                                className={`flex items-start gap-3 p-3 rounded border text-xs transition-colors cursor-pointer ${
                                  isChecked
                                    ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/30 border-[#10B981]/40 dark:border-[#10B981]/35'
                                    : 'bg-[#F8FAFC] dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#243249] hover:border-[#CBD5E1] dark:hover:border-[#334155]'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleRubricStep(prob, step.id)}
                                  className="w-4 h-4 mt-0.5 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                                      {step.label}
                                    </span>
                                    <span className="font-mono font-bold tabular-nums text-[#047857] dark:text-[#34D399]">
                                      +{step.points.toFixed(2)}đ
                                    </span>
                                  </div>
                                  <div className="mt-0.5 font-mono text-[#475569] dark:text-[#CBD5E1]">
                                    Kết quả chuẩn: {step.expected}
                                  </div>
                                  {isAutoMatched && (
                                    <div className="mt-0.5 text-[11px] text-[#047857] dark:text-[#34D399]">
                                      Đã nhận diện kết quả khớp trong bài làm của bạn
                                    </div>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          {/* Bottom Submit Bar */}
          {!isSubmitted && (
            <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#243249] flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                Sau khi nộp bài, toàn bộ lời giải chi tiết và bảng kiểm tự chấm cho cả 3 bài toán sẽ mở ngay lập tức.
              </p>
              <button
                type="button"
                onClick={() => setShowSummaryModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Nộp bài & Chấm điểm Đề {exam.code}
              </button>
            </div>
          )}
        </div>

        {/* Right: Sticky Standard Normal Distribution Table on Desktop (xl+) */}
        {showZTable && (
          <aside className="hidden xl:block xl:col-span-5 sticky top-20">
            <NormalDistributionTable
              compact
              initialTab={zTableTab}
              onClose={() => setShowZTable(false)}
            />
          </aside>
        )}
      </div>

      {/* Responsive Modal for Z-Table on screens < xl */}
      {showZTable && (
        <div
          className="xl:hidden fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Bảng phân phối chuẩn hóa N(0,1)"
        >
          <div className="w-full max-w-3xl max-h-[90vh] flex flex-col">
            <NormalDistributionTable
              compact={false}
              initialTab={zTableTab}
              onClose={() => setShowZTable(false)}
            />
          </div>
        </div>
      )}

      {/* Pre-Submission Summary Modal */}
      {showSummaryModal && !isSubmitted && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Xác nhận nộp bài"
        >
          <div className="w-full max-w-lg bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 shadow-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#C2410C] dark:text-[#FB923C] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  Tóm tắt lần làm bài — Đề {exam.code}
                </h2>
                <p className="mt-1 text-xs text-[#475569] dark:text-[#94A3B8]">
                  Kiểm tra trạng thái 3 bài toán trước khi mở toàn bộ lời giải và ghi nhận điểm.
                </p>
              </div>
            </div>

            <div className="mt-4 border border-[#E2E8F0] dark:border-[#243249] rounded divide-y divide-[#E2E8F0] dark:divide-[#243249] text-sm">
              {exam.problems.map((p) => {
                const answered = scoring.perProblem[p.number]?.answered;
                return (
                  <div
                    key={p.number}
                    className="px-4 py-2.5 flex items-center justify-between"
                  >
                    <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      Câu {p.number} ({p.points.toFixed(1)} điểm)
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        answered
                          ? 'text-[#047857] dark:text-[#34D399]'
                          : 'text-[#B45309] dark:text-[#FBBF24]'
                      }`}
                    >
                      {answered ? 'Đã nhập lời giải' : 'Chưa nhập bài làm'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2 text-sm font-semibold text-[#334155] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#CBD5E1] dark:border-[#334155] rounded transition-colors cursor-pointer"
              >
                Quay lại làm bài
              </button>
              <button
                type="button"
                onClick={finalizeExam}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
              >
                Nộp bài & Xem đáp án
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
