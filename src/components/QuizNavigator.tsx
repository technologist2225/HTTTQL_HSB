import React from 'react';
import { Check, LayoutList, ListOrdered, X } from 'lucide-react';
import { ExamQuestion, QuestionGradeResult, UserAnswer } from '../types/exam';
import { isQuestionAnswered } from '../utils/grading';

interface QuizNavigatorProps {
  questions: ExamQuestion[];
  answers: Record<number, UserAnswer>;
  flaggedIds: Set<number>;
  visibleQuestionIds: Set<number>;
  isSubmitted: boolean;
  resultsById: Record<number, QuestionGradeResult>;
  showAllOnOnePage: boolean;
  onJumpToQuestion: (index: number) => void;
  onToggleShowAll: () => void;
  onFinishClick: () => void;
}

export const QuizNavigator: React.FC<QuizNavigatorProps> = ({
  questions,
  answers,
  flaggedIds,
  visibleQuestionIds,
  isSubmitted,
  resultsById,
  showAllOnOnePage,
  onJumpToQuestion,
  onToggleShowAll,
  onFinishClick,
}) => {
  const sections: {
    key: 'mcq' | 'short' | 'essay';
    title: string;
    items: { question: ExamQuestion; index: number }[];
  }[] = [
    { key: 'mcq', title: 'Phần I · Trắc nghiệm', items: [] },
    { key: 'short', title: 'Phần II · Tự luận ngắn', items: [] },
    { key: 'essay', title: 'Phần III · Tự luận', items: [] },
  ];

  questions.forEach((q, idx) => {
    const target = sections.find((s) => s.key === q.type);
    if (target) target.items.push({ question: q, index: idx });
  });

  const nonEmptySections = sections.filter((s) => s.items.length > 0);
  const answeredTotal = questions.filter((q) =>
    isQuestionAnswered(q, answers[q.id])
  ).length;

  return (
    <aside className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-4">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0] dark:border-[#243249]">
        <h2 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          Bảng câu hỏi
        </h2>
        <span className="text-xs font-mono tabular-nums text-[#475569] dark:text-[#94A3B8]">
          {answeredTotal}/{questions.length}
        </span>
      </div>

      <div className="mt-3.5 space-y-4 max-h-[58vh] overflow-y-auto pr-1">
        {nonEmptySections.map((section) => (
          <div key={section.key}>
            <div className="text-xs font-semibold text-[#475569] dark:text-[#94A3B8] mb-2">
              {section.title} ({section.items.length})
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {section.items.map(({ question, index }) => {
                const ans = answers[question.id];
                const answered = isQuestionAnswered(question, ans);
                const flagged = flaggedIds.has(question.id);
                const isVisible = visibleQuestionIds.has(question.id);
                const showState = isSubmitted || Boolean(ans?.checked);
                const result = resultsById[question.id];

                let bottomBarClass = 'bg-white dark:bg-[#0F172A]';
                let bottomIcon: React.ReactNode = null;

                if (showState && result) {
                  if (result.status === 'correct') {
                    bottomBarClass = 'bg-[#059669] text-white';
                    bottomIcon = <Check className="w-3 h-3 stroke-[2.5]" />;
                  } else if (
                    result.status === 'partial' ||
                    result.status === 'self-check'
                  ) {
                    bottomBarClass = 'bg-[#D97706] text-white';
                    bottomIcon = <span className="text-[10px] font-bold">~</span>;
                  } else {
                    bottomBarClass = 'bg-[#DC2626] text-white';
                    bottomIcon = <X className="w-3 h-3 stroke-[2.5]" />;
                  }
                } else if (answered) {
                  bottomBarClass = 'bg-[#64748B] dark:bg-[#475569]';
                }

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => onJumpToQuestion(index)}
                    title={`Câu ${index + 1}${flagged ? ' (Đã đặt cờ)' : ''}`}
                    className={`relative flex flex-col justify-between h-11 rounded border text-xs font-semibold tabular-nums overflow-hidden transition-colors cursor-pointer ${
                      isVisible
                        ? 'border-[#0B4275] dark:border-[#38BDF8] ring-2 ring-[#0B4275]/25 dark:ring-[#38BDF8]/30 bg-white dark:bg-[#1E293B] text-[#0B4275] dark:text-[#38BDF8]'
                        : 'border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#1E293B] dark:text-[#E2E8F0] hover:border-[#64748B] dark:hover:border-[#64748B]'
                    }`}
                  >
                    {/* Moodle Red Flag Corner */}
                    {flagged && (
                      <span
                        aria-hidden="true"
                        className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-t-[#DC2626] border-l-[10px] border-l-transparent"
                      />
                    )}
                    <span className="flex-1 flex items-center justify-center leading-none pt-0.5">
                      {index + 1}
                    </span>
                    <span
                      className={`h-4 w-full flex items-center justify-center border-t border-[#E2E8F0] dark:border-[#334155] ${bottomBarClass}`}
                    >
                      {bottomIcon}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#243249] grid grid-cols-2 gap-y-1.5 text-[11px] text-[#475569] dark:text-[#94A3B8]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#64748B] dark:bg-[#475569] inline-block" />
          <span>Đã làm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs border border-[#CBD5E1] dark:border-[#475569] bg-white dark:bg-[#0F172A] inline-block" />
          <span>Chưa làm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#059669] inline-block" />
          <span>Đúng</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#DC2626] inline-block" />
          <span>Sai / Đặt cờ</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#243249] space-y-2">
        <button
          type="button"
          onClick={onToggleShowAll}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#334155] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#F1F5F9] dark:hover:bg-[#273549] border border-[#CBD5E1] dark:border-[#334155] rounded transition-colors cursor-pointer"
        >
          {showAllOnOnePage ? (
            <>
              <ListOrdered className="w-3.5 h-3.5" />
              Chuyển sang phân trang
            </>
          ) : (
            <>
              <LayoutList className="w-3.5 h-3.5" />
              Hiện tất cả trên 1 trang
            </>
          )}
        </button>

        {!isSubmitted && (
          <button
            type="button"
            onClick={onFinishClick}
            className="w-full px-3 py-2 text-xs font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
          >
            Làm xong bài thi...
          </button>
        )}
      </div>
    </aside>
  );
};
