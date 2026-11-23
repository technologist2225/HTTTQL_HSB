import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Play, Search } from 'lucide-react';
import {
  NMKD_ALL_QUESTIONS,
  NMKD_CHAPTERS,
  NMKD_EXAM_SETS,
} from '../data/nmkdData';
import { normalizeText } from '../utils/grading';

interface NmkdBankViewProps {
  onBackToNmkdHome: () => void;
  onStartOfficialExam: (examNumber: number) => void;
  onStartChapterPractice: (chapter: number) => void;
}

export const NmkdBankView: React.FC<NmkdBankViewProps> = ({
  onBackToNmkdHome,
  onStartOfficialExam,
  onStartChapterPractice,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<number | 'all'>('all');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [showAnswers, setShowAnswers] = useState(true);

  const filteredQuestions = useMemo(() => {
    const q = normalizeText(searchQuery);
    return NMKD_ALL_QUESTIONS.filter((item) => {
      const examNumber = Math.floor((item.id - 1001) / 30) + 1;
      if (selectedExam !== 'all' && examNumber !== selectedExam) return false;
      if (selectedChapter !== 'all' && item.chapter !== selectedChapter) return false;
      if (!q) return true;

      const haystack = normalizeText(
        `${item.prompt} ${item.options.map((o) => o.text).join(' ')}`
      );
      return haystack.includes(q);
    });
  }, [searchQuery, selectedExam, selectedChapter]);

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-[#475569] dark:text-[#94A3B8]">
            Học phần MGT2002 · Nhập môn kinh doanh · Thực hiện bởi{' '}
            <strong className="text-[#0B4275] dark:text-[#38BDF8]">Anh Hoàng 51K33</strong>
          </p>
          <button
            type="button"
            onClick={onBackToNmkdHome}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại trang môn NMKD
          </button>
        </div>

        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-[#C2410C] dark:text-[#FB923C] tracking-tight">
          Ngân hàng 300 câu trắc nghiệm & Đáp án NMKD 2026
        </h1>
        <p className="mt-1.5 text-sm text-[#475569] dark:text-[#94A3B8]">
          Tìm kiếm nhanh trong toàn bộ 10 mã đề (202601 – 202610), lọc theo chương hoặc ẩn đáp án để tự kiểm tra.
        </p>

        {/* Controls */}
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ khóa (VD: GDP, ROA, điểm hòa vốn, 4P, nhượng quyền, JIT...)"
              className="w-full pl-9 pr-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
            />
          </div>

          <select
            value={selectedExam === 'all' ? 'all' : String(selectedExam)}
            onChange={(e) =>
              setSelectedExam(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            aria-label="Lọc theo mã đề"
            className="md:w-48 px-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
          >
            <option value="all">Tất cả 10 đề</option>
            {NMKD_EXAM_SETS.map((ex) => (
              <option key={ex.examNumber} value={ex.examNumber}>
                Đề {ex.code} ({ex.examCode})
              </option>
            ))}
          </select>

          <select
            value={selectedChapter === 'all' ? 'all' : String(selectedChapter)}
            onChange={(e) =>
              setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            aria-label="Lọc theo chương"
            className="md:w-60 px-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
          >
            <option value="all">Tất cả 6 chương</option>
            {NMKD_CHAPTERS.map((ch) => (
              <option key={ch.chapter} value={ch.chapter}>
                {ch.shortTitle}
              </option>
            ))}
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

        {/* Contextual quick launch */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <span className="tabular-nums">
            Đang hiển thị <strong className="text-[#0F172A] dark:text-[#F8FAFC]">{filteredQuestions.length}</strong> / 300 câu hỏi
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {selectedExam !== 'all' && (
              <button
                type="button"
                onClick={() => onStartOfficialExam(selectedExam)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Vào làm Đề {String(selectedExam).padStart(2, '0')}
              </button>
            )}
            {selectedChapter !== 'all' && (
              <button
                type="button"
                onClick={() => onStartChapterPractice(selectedChapter)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] rounded transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Ôn luyện 50 câu Chương {selectedChapter}
              </button>
            )}
          </div>
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
            const examNumber = Math.floor((item.id - 1001) / 30) + 1;
            const numInExam = ((item.id - 1001) % 30) + 1;
            const examCode = `2026${String(examNumber).padStart(2, '0')}`;
            return (
              <article
                key={item.id}
                className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] mb-2 font-mono tabular-nums">
                  <span>
                    Đề {String(examNumber).padStart(2, '0')} ({examCode}) · Câu{' '}
                    {String(numInExam).padStart(2, '0')}
                  </span>
                  <span className="font-sans">Chương {item.chapter}</span>
                </div>

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
              </article>
            );
          })
        )}
      </div>
    </main>
  );
};
