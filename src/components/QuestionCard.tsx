import React from 'react';
import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  Flag,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  EssayQuestion,
  ExamQuestion,
  GradingMode,
  McqOptionKey,
  QuestionGradeResult,
  ShortAnswerQuestion,
  UserAnswer,
} from '../types/exam';
import { isQuestionAnswered } from '../utils/grading';

interface QuestionCardProps {
  question: ExamQuestion;
  displayNumber: number;
  answer: UserAnswer | undefined;
  isFlagged: boolean;
  isSubmitted: boolean;
  gradingMode: GradingMode;
  gradeResult: QuestionGradeResult;
  onSelectMcq: (questionId: number, option: McqOptionKey | null) => void;
  onChangeShort: (questionId: number, blankIndex: number, value: string) => void;
  onChangeEssay: (questionId: number, value: string) => void;
  onToggleEssayRubric: (questionId: number, rubricId: string) => void;
  onToggleFlag: (questionId: number) => void;
  onInstantCheck: (questionId: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  displayNumber,
  answer,
  isFlagged,
  isSubmitted,
  gradingMode,
  gradeResult,
  onSelectMcq,
  onChangeShort,
  onChangeEssay,
  onToggleEssayRubric,
  onToggleFlag,
  onInstantCheck,
}) => {
  const answered = isQuestionAnswered(question, answer);
  const showFeedback = isSubmitted || Boolean(answer?.checked);
  const isLocked = isSubmitted;

  const getStatusLabel = () => {
    if (!showFeedback) {
      return {
        text: answered ? 'Đã lưu câu trả lời' : 'Chưa trả lời',
        tone: answered
          ? 'text-[#0B4275] dark:text-[#38BDF8] font-medium'
          : 'text-[#475569] dark:text-[#94A3B8]',
        icon: null,
      };
    }

    if (gradeResult.status === 'correct') {
      return {
        text: 'Đúng',
        tone: 'text-[#047857] dark:text-[#34D399] font-semibold',
        icon: (
          <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] dark:text-[#34D399] shrink-0" />
        ),
      };
    }
    if (gradeResult.status === 'partial') {
      return {
        text: 'Đạt một phần',
        tone: 'text-[#B45309] dark:text-[#FBBF24] font-semibold',
        icon: (
          <ClipboardCheck className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24] shrink-0" />
        ),
      };
    }
    if (gradeResult.status === 'self-check') {
      return {
        text: 'Đối chiếu đáp án',
        tone: 'text-[#B45309] dark:text-[#FBBF24] font-semibold',
        icon: (
          <ClipboardCheck className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FBBF24] shrink-0" />
        ),
      };
    }
    if (gradeResult.status === 'unanswered') {
      return {
        text: 'Chưa trả lời',
        tone: 'text-[#B91C1C] dark:text-[#F87171] font-semibold',
        icon: (
          <XCircle className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#F87171] shrink-0" />
        ),
      };
    }
    return {
      text: 'Chưa đúng',
      tone: 'text-[#B91C1C] dark:text-[#F87171] font-semibold',
      icon: (
        <XCircle className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#F87171] shrink-0" />
      ),
    };
  };

  const statusInfo = getStatusLabel();

  const renderMcqBody = () => {
    if (question.type !== 'mcq') return null;

    return (
      <div>
        <p className="text-[15px] leading-relaxed font-medium text-[#0F172A] dark:text-[#F8FAFC] mb-4">
          {question.prompt}
        </p>
        <p className="text-[13px] text-[#475569] dark:text-[#94A3B8] mb-3">Select one:</p>

        <div className="space-y-2.5">
          {question.options.map((opt) => {
            const isSelected = answer?.mcq === opt.key;
            const isCorrectOpt = opt.key === question.correctOption;

            let optionClasses =
              'border-transparent bg-transparent hover:bg-white/60 dark:hover:bg-white/5 text-[#0F172A] dark:text-[#E2E8F0]';
            if (showFeedback) {
              if (isCorrectOpt) {
                optionClasses =
                  'border-[#059669] dark:border-[#10B981] bg-[#ECFDF5] dark:bg-[#064E3B]/45 text-[#064E3B] dark:text-[#D1FAE5] font-medium';
              } else if (isSelected && !isCorrectOpt) {
                optionClasses =
                  'border-[#DC2626] dark:border-[#EF4444] bg-[#FEF2F2] dark:bg-[#7F1D1D]/40 text-[#7F1D1D] dark:text-[#FECACA]';
              } else {
                optionClasses =
                  'border-transparent bg-white/30 dark:bg-white/[0.03] text-[#475569] dark:text-[#94A3B8]';
              }
            } else if (isSelected) {
              optionClasses =
                'border-[#0B4275]/40 dark:border-[#38BDF8]/50 bg-white/90 dark:bg-[#193544] text-[#0F172A] dark:text-[#F8FAFC] font-medium';
            }

            return (
              <label
                key={opt.key}
                className={`flex items-start gap-3 px-3 py-2.5 rounded border transition-colors ${
                  isLocked ? 'cursor-default' : 'cursor-pointer'
                } ${optionClasses}`}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={opt.key}
                  checked={isSelected}
                  disabled={isLocked}
                  onChange={() => onSelectMcq(question.id, opt.key)}
                  className="mt-1 w-4 h-4 shrink-0 cursor-pointer disabled:cursor-default"
                />
                <span className="text-[15px] leading-relaxed flex-1">
                  <span className="font-medium mr-1.5">{opt.key}.</span>
                  {opt.text}
                </span>

                {showFeedback && isCorrectOpt && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#047857] dark:text-[#34D399] shrink-0 mt-0.5 whitespace-nowrap">
                    <CheckCircle2 className="w-4 h-4" />
                    Đáp án đúng
                  </span>
                )}
                {showFeedback && isSelected && !isCorrectOpt && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B91C1C] dark:text-[#F87171] shrink-0 mt-0.5 whitespace-nowrap">
                    <XCircle className="w-4 h-4" />
                    Bạn chọn
                  </span>
                )}
              </label>
            );
          })}
        </div>

        {!isLocked && answer?.mcq && (
          <button
            type="button"
            onClick={() => onSelectMcq(question.id, null)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#475569] dark:text-[#94A3B8] hover:text-[#0B4275] dark:hover:text-[#38BDF8] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Xóa lựa chọn của tôi
          </button>
        )}

        {showFeedback && (
          <div
            className={`mt-4 p-3.5 rounded border text-sm ${
              gradeResult.status === 'correct'
                ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/35 border-[#A7F3D0] dark:border-[#059669]/50 text-[#065F46] dark:text-[#A7F3D0]'
                : 'bg-[#FFFBEB] dark:bg-[#78350F]/30 border-[#FDE68A] dark:border-[#D97706]/50 text-[#92400E] dark:text-[#FDE68A]'
            }`}
          >
            <div className="flex items-start gap-2">
              {gradeResult.status === 'correct' ? (
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#059669] dark:text-[#34D399]" />
              ) : (
                <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-[#DC2626] dark:text-[#F87171]" />
              )}
              <div>
                <p className="font-semibold">
                  {gradeResult.status === 'correct'
                    ? 'Câu trả lời của bạn chính xác.'
                    : `Đáp án đúng là: ${question.correctOption.toUpperCase()}.`}
                </p>
                {gradeResult.status !== 'correct' && (
                  <p className="mt-1 text-[#0F172A] dark:text-[#F1F5F9]">
                    {
                      question.options.find((o) => o.key === question.correctOption)
                        ?.text
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderShortAnswerBody = () => {
    if (question.type !== 'short') return null;
    const q = question as ShortAnswerQuestion;
    const values = answer?.short ?? q.blanks.map(() => '');

    return (
      <div>
        <div className="text-[15px] leading-[2.25] text-[#0F172A] dark:text-[#F8FAFC] font-medium">
          {q.segments.map((segment, idx) => (
            <React.Fragment key={idx}>
              <span>{segment}</span>
              {idx < q.blanks.length && (
                <span className="inline-flex items-center gap-1.5 align-middle mx-1">
                  <input
                    type="text"
                    value={values[idx] ?? ''}
                    disabled={isLocked}
                    onChange={(e) => onChangeShort(q.id, idx, e.target.value)}
                    placeholder="Nhập đáp án..."
                    aria-label={`Ô điền khuyết ${idx + 1} câu ${displayNumber}`}
                    className={`w-48 sm:w-64 px-3 py-1.5 text-[15px] font-normal rounded border leading-normal transition-colors focus:outline-none focus:ring-2 ${
                      showFeedback
                        ? gradeResult.blankResults?.[idx]
                          ? 'border-[#059669] dark:border-[#10B981] bg-[#ECFDF5] dark:bg-[#064E3B]/45 text-[#065F46] dark:text-[#D1FAE5] focus:ring-[#059669]/20'
                          : 'border-[#DC2626] dark:border-[#EF4444] bg-[#FEF2F2] dark:bg-[#7F1D1D]/40 text-[#7F1D1D] dark:text-[#FECACA] focus:ring-[#DC2626]/20'
                        : 'border-[#B6C8CE] dark:border-[#335768] bg-white dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:border-[#0B4275] dark:focus:border-[#38BDF8] focus:ring-[#0B4275]/20 dark:focus:ring-[#38BDF8]/25'
                    }`}
                  />
                  {showFeedback &&
                    (gradeResult.blankResults?.[idx] ? (
                      <CheckCircle2
                        className="w-4 h-4 text-[#059669] dark:text-[#34D399] shrink-0"
                        aria-label="Đúng"
                      />
                    ) : (
                      <XCircle
                        className="w-4 h-4 text-[#DC2626] dark:text-[#F87171] shrink-0"
                        aria-label="Chưa đúng"
                      />
                    ))}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="mt-3 text-xs text-[#475569] dark:text-[#94A3B8]">
          Chấp nhận tiếng Việt có dấu / không dấu hoặc thuật ngữ tiếng Anh tương ứng theo đáp án đề cương.
        </p>

        {showFeedback && (
          <div
            className={`mt-4 p-3.5 rounded border text-sm ${
              gradeResult.status === 'correct'
                ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/35 border-[#A7F3D0] dark:border-[#059669]/50 text-[#065F46] dark:text-[#A7F3D0]'
                : 'bg-[#FFFBEB] dark:bg-[#78350F]/30 border-[#FDE68A] dark:border-[#D97706]/50 text-[#92400E] dark:text-[#FDE68A]'
            }`}
          >
            <div className="flex items-start gap-2">
              {gradeResult.status === 'correct' ? (
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#059669] dark:text-[#34D399]" />
              ) : (
                <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-[#DC2626] dark:text-[#F87171]" />
              )}
              <div>
                <p className="font-semibold">
                  {gradeResult.status === 'correct'
                    ? 'Chính xác!'
                    : gradeResult.status === 'partial'
                    ? 'Đúng một phần.'
                    : 'Chưa khớp với đáp án chuẩn.'}
                </p>
                <p className="mt-1 text-[#0F172A] dark:text-[#F1F5F9]">
                  <span className="font-semibold">Đáp án chuẩn: </span>
                  {q.officialAnswer}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEssayBody = () => {
    if (question.type !== 'essay') return null;
    const q = question as EssayQuestion;
    const textValue = answer?.essay ?? '';
    const wordCount = textValue.trim() ? textValue.trim().split(/\s+/).length : 0;

    const detectedSet = new Set(gradeResult.detectedRubricIds ?? []);
    const activeCheckedSet = new Set(
      answer?.essayRubricChecked !== undefined
        ? answer.essayRubricChecked
        : gradeResult.detectedRubricIds ?? []
    );

    return (
      <div>
        <p className="text-[15px] leading-relaxed font-medium text-[#0F172A] dark:text-[#F8FAFC] mb-4">
          {q.prompt}
        </p>

        <textarea
          value={textValue}
          disabled={isLocked}
          onChange={(e) => onChangeEssay(q.id, e.target.value)}
          rows={7}
          placeholder="Nhập câu trả lời tự luận của bạn tại đây (nên trình bày rõ các ý chính và ví dụ minh họa)..."
          aria-label={`Câu trả lời tự luận câu ${displayNumber}`}
          className="w-full rounded border border-[#B6C8CE] dark:border-[#335768] bg-white dark:bg-[#0B1120] p-3.5 text-[15px] leading-relaxed text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8] focus:ring-2 focus:ring-[#0B4275]/20 dark:focus:ring-[#38BDF8]/25 disabled:bg-[#F8FAFC] dark:disabled:bg-[#0F172A]/80 disabled:text-[#334155] dark:disabled:text-[#CBD5E1] resize-y"
        />

        <div className="mt-2 flex items-center justify-between text-xs text-[#475569] dark:text-[#94A3B8]">
          <span className="tabular-nums">Số từ đã viết: {wordCount}</span>
          <span>Thang điểm tối đa: {q.points.toFixed(1)} điểm</span>
        </div>

        {showFeedback && (
          <div className="mt-5 space-y-4">
            {/* Official Model Answer */}
            <div className="rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#0F172A] p-4">
              <h4 className="text-sm font-bold text-[#0B4275] dark:text-[#38BDF8] mb-2.5">
                Đáp án gợi ý (theo bộ đề MIS2002)
              </h4>
              <ul className="space-y-2 text-sm leading-relaxed text-[#1E293B] dark:text-[#CBD5E1] list-disc pl-5">
                {q.modelAnswerBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Interactive Self-Grading Rubric Checklist */}
            <div className="rounded border border-[#FCD34D] dark:border-[#B45309]/60 bg-[#FFFBEB] dark:bg-[#451A03]/35 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-sm font-bold text-[#92400E] dark:text-[#FCD34D] flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4 shrink-0" />
                    Bảng kiểm ý chính & Tự chấm điểm tự luận
                  </h4>
                  <p className="text-xs text-[#78350F] dark:text-[#FDE68A]/85 mt-0.5">
                    Hệ thống tự đánh dấu các ý khớp từ khóa trong bài làm của bạn. Tích chọn/bỏ chọn để chốt điểm chính xác.
                  </p>
                </div>
                <div className="text-sm font-bold text-[#92400E] dark:text-[#FCD34D] font-mono tabular-nums">
                  {gradeResult.earnedPoints.toFixed(2)} / {q.points.toFixed(1)} đ
                </div>
              </div>

              <div className="space-y-2">
                {q.rubric.map((item) => {
                  const isChecked = activeCheckedSet.has(item.id);
                  const autoDetected = detectedSet.has(item.id);
                  const pointPerItem = q.points / q.rubric.length;

                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded border transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/40 border-[#6EE7B7] dark:border-[#10B981]/50'
                          : 'bg-white dark:bg-[#151F32] border-[#E2E8F0] dark:border-[#2B3B54] hover:border-[#CBD5E1] dark:hover:border-[#475569]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleEssayRubric(q.id, item.id)}
                        className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                            {item.label}
                          </span>
                          <span className="text-xs font-mono tabular-nums text-[#475569] dark:text-[#94A3B8]">
                            +{pointPerItem.toFixed(1)} đ
                          </span>
                        </div>
                        <p className="text-xs text-[#475569] dark:text-[#CBD5E1] mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                        {autoDetected && (
                          <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#047857] dark:text-[#34D399]">
                            <Check className="w-3 h-3" />
                            Đã phát hiện từ khóa liên quan trong bài viết
                          </p>
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
    );
  };

  return (
    <article
      id={`question-anchor-${question.id}`}
      className="flex flex-col md:flex-row gap-4 items-start scroll-mt-24"
    >
      {/* Left Moodle Question Info Sidebar */}
      <aside className="w-full md:w-44 shrink-0 rounded bg-[#F3F5F7] dark:bg-[#182338] border border-[#D6DCE2] dark:border-[#2B3B54] p-3.5 text-[13px] text-[#334155] dark:text-[#CBD5E1]">
        <div className="flex md:block items-baseline justify-between gap-2">
          <div className="font-semibold text-[#B93D0B] dark:text-[#FB923C]">
            Câu hỏi{' '}
            <span className="text-xl font-bold tabular-nums">{displayNumber}</span>
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] md:mt-0.5">
            Chương {question.chapter} ·{' '}
            {question.id >= 2001 && question.id <= 2140
              ? `Bộ khó · Câu ${question.id - 2000}`
              : question.id >= 1001 && question.id <= 1300
                ? `Đề ${String(Math.floor((question.id - 1001) / 30) + 1).padStart(2, '0')} · Câu ${((question.id - 1001) % 30) + 1}`
                : `Câu gốc ${question.id}`}
          </div>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-[#E2E8F0] dark:border-[#2B3B54] space-y-1.5">
          <div className={`flex items-center gap-1.5 ${statusInfo.tone}`}>
            {statusInfo.icon}
            <span>{statusInfo.text}</span>
          </div>

          <div className="text-[#475569] dark:text-[#94A3B8] tabular-nums">
            {showFeedback
              ? `Điểm: ${gradeResult.earnedPoints.toFixed(1)} / ${question.points.toFixed(1)}`
              : `Đạt điểm ${question.points.toFixed(1)}`}
          </div>

          <button
            type="button"
            onClick={() => onToggleFlag(question.id)}
            className={`mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
              isFlagged
                ? 'text-[#DC2626] dark:text-[#F87171]'
                : 'text-[#334155] dark:text-[#CBD5E1] hover:text-[#B93D0B] dark:hover:text-[#FB923C]'
            }`}
          >
            <Flag
              className={`w-3.5 h-3.5 ${
                isFlagged
                  ? 'fill-[#DC2626] dark:fill-[#F87171] text-[#DC2626] dark:text-[#F87171]'
                  : ''
              }`}
            />
            <span>{isFlagged ? 'Bỏ đặt cờ' : 'Đặt cờ'}</span>
          </button>
        </div>
      </aside>

      {/* Main Signature DUE Ice-Teal Question Container */}
      <div className="flex-1 w-full rounded bg-[#E7F3F5] dark:bg-[#122631] border border-[#C5DCE0] dark:border-[#244A5C] p-5 sm:p-6">
        {question.type === 'mcq' && renderMcqBody()}
        {question.type === 'short' && renderShortAnswerBody()}
        {question.type === 'essay' && renderEssayBody()}

        {/* Instant Check Control in Practice Mode */}
        {gradingMode === 'instant' && !isSubmitted && (
          <div className="mt-5 pt-3.5 border-t border-[#C5DCE0] dark:border-[#244A5C] flex items-center justify-between gap-3">
            <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
              Chế độ ôn tập · Kiểm tra đáp án ngay lập tức
            </span>
            <button
              type="button"
              onClick={() => onInstantCheck(question.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {answer?.checked ? 'Cập nhật kết quả' : 'Kiểm tra đáp án'}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
