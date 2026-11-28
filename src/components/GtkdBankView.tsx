import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Info,
  Play,
  Search,
} from 'lucide-react';
import {
  GTKD_ALL_QUESTIONS,
  GTKD_CONFLICT_NOTES,
  GTKD_GROUPS,
} from '../data/gtkdData';
import { normalizeText } from '../utils/grading';

interface GtkdBankViewProps {
  onBackToGtkdHome: () => void;
  onStartGroupPractice: (group: number) => void;
}

type FlagFilter = 'all' | 'conflict' | 'inferred';

export const GtkdBankView: React.FC<GtkdBankViewProps> = ({
  onBackToGtkdHome,
  onStartGroupPractice,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
  const [flagFilter, setFlagFilter] = useState<FlagFilter>('all');
  const [showAnswers, setShowAnswers] = useState(true);
  const [showConflictPanel, setShowConflictPanel] = useState(false);

  const filteredQuestions = useMemo(() => {
    const q = normalizeText(searchQuery);
    return GTKD_ALL_QUESTIONS.filter((item) => {
      if (selectedGroup !== 'all' && item.chapter !== selectedGroup) return false;
      if (flagFilter === 'conflict') {
        if (item.type === 'essay' || item.answerFlag !== 'conflict') return false;
      } else if (flagFilter === 'inferred') {
        if (item.type === 'essay' || item.answerFlag !== 'inferred') return false;
      }
      if (!q) return true;

      if (item.type === 'mcq') {
        const haystack = normalizeText(
          `cau ${item.id - 3000} ${item.prompt} ${item.options.map((o) => o.text).join(' ')} ${item.note ?? ''}`
        );
        return haystack.includes(q);
      }
      if (item.type === 'short') {
        const haystack = normalizeText(
          `cau ${item.id - 3000} ${item.segments.join(' ')} ${item.officialAnswer} ${item.note ?? ''}`
        );
        return haystack.includes(q);
      }
      return false;
    });
  }, [searchQuery, selectedGroup, flagFilter]);

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-[#475569] dark:text-[#94A3B8]">
            Học phần GTKD · Giao tiếp kinh doanh · Thực hiện bởi{' '}
            <strong className="text-[#0B4275] dark:text-[#38BDF8]">Anh Hoàng 51K33</strong>
          </p>
          <button
            type="button"
            onClick={onBackToGtkdHome}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại trang môn GTKD
          </button>
        </div>

        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-[#C2410C] dark:text-[#FB923C] tracking-tight">
          Ngân hàng 245 câu hỏi & Đáp án Giao tiếp kinh doanh
        </h1>
        <p className="mt-1.5 text-sm text-[#475569] dark:text-[#94A3B8]">
          Tìm kiếm nhanh theo từ khóa hoặc số câu (1–245), lọc theo 4 nhóm, lọc các câu có dấu ⚠ / * hoặc ẩn đáp án để tự dò bài.
        </p>

        {/* Controls */}
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ khóa hoặc số câu (VD: résumé, đồng thuận, ngữ cảnh cao, tin đồn, câu 45...)"
              className="w-full pl-9 pr-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
            />
          </div>

          <select
            value={selectedGroup === 'all' ? 'all' : String(selectedGroup)}
            onChange={(e) =>
              setSelectedGroup(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            aria-label="Lọc theo nhóm câu hỏi"
            className="md:w-56 px-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
          >
            <option value="all">Tất cả 4 nhóm (245 câu)</option>
            {GTKD_GROUPS.map((grp) => (
              <option key={grp.group} value={grp.group}>
                Nhóm {grp.group} ({grp.rangeLabel})
              </option>
            ))}
          </select>

          <select
            value={flagFilter}
            onChange={(e) => setFlagFilter(e.target.value as FlagFilter)}
            aria-label="Lọc theo ghi chú đáp án"
            className="md:w-52 px-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="conflict">Chỉ câu có dấu ⚠ ({GTKD_CONFLICT_NOTES.length} câu)</option>
            <option value="inferred">Chỉ câu có dấu * (suy luận)</option>
          </select>

          <button
            type="button"
            onClick={() => setShowAnswers((prev) => !prev)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#334155] dark:text-[#E2E8F0] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap cursor-pointer"
          >
            {showAnswers ? (
              <>
                <EyeOff className="w-4 h-4" />
                Ẩn đáp án
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Hiện đáp án
              </>
            )}
          </button>
        </div>

        {/* Collapsible 12 Conflict Notes Panel */}
        <div className="mt-4 rounded border border-[#FCD34D] dark:border-[#B45309]/60 bg-[#FFFBEB] dark:bg-[#451A03]/30">
          <button
            type="button"
            onClick={() => setShowConflictPanel((prev) => !prev)}
            className="w-full px-4 py-3 flex items-center justify-between gap-2 text-left cursor-pointer"
          >
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#92400E] dark:text-[#FCD34D]">
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#D97706] dark:text-[#FBBF24]" />
              Ghi chú {GTKD_CONFLICT_NOTES.length} câu có dấu ⚠ (đáp án file gốc mâu thuẫn / cần lưu ý)
            </span>
            {showConflictPanel ? (
              <ChevronUp className="w-4 h-4 text-[#92400E] dark:text-[#FCD34D] shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#92400E] dark:text-[#FCD34D] shrink-0" />
            )}
          </button>

          {showConflictPanel && (
            <div className="px-4 pb-4 pt-1 border-t border-[#FDE68A] dark:border-[#B45309]/40 grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              {GTKD_CONFLICT_NOTES.map((item) => (
                <div
                  key={item.questionNum}
                  className="p-2.5 rounded bg-white/80 dark:bg-[#151F32]/90 border border-[#FDE68A] dark:border-[#B45309]/40"
                >
                  <div className="font-bold text-[#92400E] dark:text-[#FCD34D] font-mono">
                    Câu {item.questionNum} · Đáp án chọn: {item.selectedKey}
                  </div>
                  <p className="mt-1 text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contextual quick launch */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <span className="tabular-nums">
            Đang hiển thị{' '}
            <strong className="text-[#0F172A] dark:text-[#F8FAFC]">
              {filteredQuestions.length}
            </strong>{' '}
            / 245 câu hỏi
          </span>
          {selectedGroup !== 'all' && (
            <button
              type="button"
              onClick={() => onStartGroupPractice(selectedGroup)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] rounded transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              Vào luyện tập Nhóm {selectedGroup}
            </button>
          )}
        </div>
      </div>

      {/* Question List */}
      <div className="mt-6 space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="py-12 text-center bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded text-sm text-[#64748B] dark:text-[#94A3B8]">
            Không tìm thấy câu hỏi nào khớp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredQuestions.map((item) => {
            const qNum = item.id - 3000;
            const flag = item.type !== 'essay' ? item.answerFlag : undefined;
            const note = item.type !== 'essay' ? item.note : undefined;

            return (
              <article
                key={item.id}
                className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] mb-2">
                  <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums">
                    <span className="font-bold text-[#0B4275] dark:text-[#38BDF8]">
                      Câu {qNum}
                    </span>
                    <span>·</span>
                    <span className="font-sans">Nhóm {item.chapter}</span>
                    {flag === 'conflict' && (
                      <span className="inline-flex items-center gap-1 font-sans font-semibold text-[#B45309] dark:text-[#FBBF24]">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Cần lưu ý (⚠)
                      </span>
                    )}
                    {flag === 'inferred' && (
                      <span className="inline-flex items-center gap-1 font-sans text-[#475569] dark:text-[#94A3B8]">
                        <Info className="w-3.5 h-3.5" />
                        Đáp án suy luận (*)
                      </span>
                    )}
                  </div>
                  <span className="font-sans">
                    {item.type === 'short' ? 'Trả lời ngắn' : 'Trắc nghiệm A–D'}
                  </span>
                </div>

                {item.type === 'mcq' ? (
                  <>
                    <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                      {item.prompt}
                    </h3>

                    <ul className="mt-3 space-y-1.5 text-sm">
                      {item.options.map((opt) => {
                        const isCorrect = opt.key === item.correctOption;
                        return (
                          <li
                            key={opt.key}
                            className={`px-3 py-1.5 rounded flex items-start gap-2 ${
                              showAnswers && isCorrect
                                ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/35 text-[#065F46] dark:text-[#6EE7B7] font-semibold'
                                : 'text-[#334155] dark:text-[#CBD5E1]'
                            }`}
                          >
                            <span className="font-mono uppercase shrink-0">{opt.key}.</span>
                            <span className="flex-1">{opt.text}</span>
                            {showAnswers && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#047857] dark:text-[#34D399]" />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : item.type === 'short' ? (
                  <>
                    <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                      {item.segments.join(' ')}
                    </h3>
                    {showAnswers && (
                      <div className="mt-3 px-3.5 py-2.5 rounded bg-[#ECFDF5] dark:bg-[#064E3B]/35 text-sm text-[#065F46] dark:text-[#6EE7B7]">
                        <span className="font-semibold">Đáp án chuẩn: </span>
                        {item.officialAnswer}
                      </div>
                    )}
                  </>
                ) : null}

                {showAnswers && note && (
                  <div
                    className={`mt-3 px-3 py-2 rounded text-xs leading-relaxed ${
                      flag === 'conflict'
                        ? 'bg-[#FFFBEB] dark:bg-[#451A03]/35 border border-[#FDE68A] dark:border-[#B45309]/50 text-[#92400E] dark:text-[#FDE68A]'
                        : 'bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#243249] text-[#475569] dark:text-[#94A3B8]'
                    }`}
                  >
                    <strong className="font-semibold">Ghi chú: </strong>
                    {note}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </main>
  );
};
