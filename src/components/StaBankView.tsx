import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Info,
  Play,
  Search,
  Table2,
} from 'lucide-react';
import { STA2005_EXAMS } from '../data/sta2005Exams';
import { normalizeText } from '../utils/grading';
import { NormalDistributionTable } from './NormalDistributionTable';

interface StaBankViewProps {
  onBackToStaHome: () => void;
  onStartStaExam: (examNumber: number) => void;
}

export const StaBankView: React.FC<StaBankViewProps> = ({
  onBackToStaHome,
  onStartStaExam,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamNumber, setSelectedExamNumber] = useState<number | 'all'>('all');
  const [showSolutions, setShowSolutions] = useState(true);
  const [activeSubView, setActiveSubView] = useState<'exams' | 'ztable'>('exams');

  const filteredExams = useMemo(() => {
    const q = normalizeText(searchQuery);
    return STA2005_EXAMS.filter((exam) => {
      if (selectedExamNumber !== 'all' && exam.examNumber !== selectedExamNumber) {
        return false;
      }
      if (!q) return true;

      const haystack = normalizeText(
        [
          `de ${exam.code}`,
          exam.topicSummary,
          ...exam.problems.map((p) => `${p.stem} ${p.subParts.join(' ')} ${p.solution}`),
        ].join(' ')
      );
      return haystack.includes(q);
    });
  }, [searchQuery, selectedExamNumber]);

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-[#475569] dark:text-[#94A3B8]">
            Học phần STA2005 · Thực hiện bởi{' '}
            <strong className="text-[#0B4275] dark:text-[#38BDF8]">Anh Hoàng 51K33</strong>
          </p>
          <button
            type="button"
            onClick={onBackToStaHome}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại trang môn STA2005
          </button>
        </div>

        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-[#C2410C] dark:text-[#FB923C] tracking-tight">
          Ngân hàng 18 đề thi & Đáp án STA2005
        </h1>
        <p className="mt-1.5 text-sm text-[#475569] dark:text-[#94A3B8]">
          Tra cứu toàn bộ đề bài, lời giải chi tiết từ Đề 01 đến Đề 18 cùng Bảng phân phối chuẩn hóa N(0,1).
        </p>

        {/* Sub-view Tabs: 18 Đề & Đáp án vs Bảng tra N(0,1) */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1 p-1 bg-[#E2E8F0]/70 dark:bg-[#1E293B] rounded-lg">
            <button
              type="button"
              onClick={() => setActiveSubView('exams')}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeSubView === 'exams'
                  ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
              }`}
            >
              18 đề & Lời giải
            </button>
            <button
              type="button"
              onClick={() => setActiveSubView('ztable')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeSubView === 'ztable'
                  ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
              }`}
            >
              <Table2 className="w-4 h-4" />
              Bảng phân phối chuẩn hóa N(0,1)
            </button>
          </div>

          {activeSubView === 'exams' && (
            <button
              type="button"
              onClick={() => setShowSolutions((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#334155] dark:text-[#E2E8F0] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              {showSolutions ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Ẩn toàn bộ lời giải
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Hiện toàn bộ lời giải
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {activeSubView === 'ztable' ? (
        <div className="mt-6">
          <NormalDistributionTable compact={false} />
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Search & Exam Picker Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo từ khóa (VD: Bayes, Poisson, khoảng tin cậy, kiểm định tỷ lệ, 1.96...)"
                className="w-full pl-9 pr-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
              />
            </div>

            <select
              value={selectedExamNumber === 'all' ? 'all' : String(selectedExamNumber)}
              onChange={(e) =>
                setSelectedExamNumber(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              aria-label="Lọc theo số đề"
              className="sm:w-56 px-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
            >
              <option value="all">Tất cả 18 đề (Đề 01 – 18)</option>
              {STA2005_EXAMS.map((exam) => (
                <option key={exam.examNumber} value={exam.examNumber}>
                  Đề {exam.code}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
            Đang hiển thị {filteredExams.length} / {STA2005_EXAMS.length} đề luyện tập
          </div>

          {filteredExams.length === 0 ? (
            <div className="py-12 text-center bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded text-sm text-[#64748B] dark:text-[#94A3B8]">
              Không tìm thấy đề nào khớp với từ khóa &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredExams.map((exam) => (
                <section
                  key={exam.examNumber}
                  className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded overflow-hidden"
                >
                  {/* Exam Card Header */}
                  <div className="px-5 py-3.5 bg-[#F3F5F7] dark:bg-[#182338] border-b border-[#D6DCE2] dark:border-[#2B3B54] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                        Đề {exam.code} · {exam.topicSummary}
                      </h2>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-mono tabular-nums">
                        Thời gian: {exam.timeLimitMinutes} phút · Tổng điểm: 10,0
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onStartStaExam(exam.examNumber)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Vào làm Đề {exam.code}
                    </button>
                  </div>

                  {/* 3 Problems */}
                  <div className="divide-y divide-[#E2E8F0] dark:divide-[#243249]">
                    {exam.problems.map((prob) => (
                      <div key={prob.number} className="p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-[#0B4275] dark:text-[#38BDF8]">
                            Câu {prob.number}
                          </span>
                          <span className="text-xs font-mono font-semibold tabular-nums text-[#C2410C] dark:text-[#FB923C]">
                            {prob.points.toFixed(1)} điểm
                          </span>
                        </div>

                        <div className="text-sm leading-relaxed text-[#0F172A] dark:text-[#F8FAFC] whitespace-pre-line">
                          {prob.stem}
                        </div>

                        {prob.subParts.length > 0 && (
                          <ul className="space-y-1.5 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
                            {prob.subParts.map((part, idx) => (
                              <li key={idx} className="whitespace-pre-line">
                                {part}
                              </li>
                            ))}
                          </ul>
                        )}

                        {showSolutions && (
                          <div className="mt-3 space-y-2.5">
                            <div className="p-4 rounded bg-[#E7F3F5]/65 dark:bg-[#122631] border border-[#B6D4DA] dark:border-[#244A5C]">
                              <div className="text-xs font-bold text-[#047857] dark:text-[#34D399] mb-1.5">
                                Lời giải chi tiết
                              </div>
                              <div className="text-xs sm:text-[13px] font-mono leading-relaxed text-[#0F172A] dark:text-[#F8FAFC] whitespace-pre-line">
                                {prob.solution}
                              </div>
                            </div>

                            {prob.mathNote && (
                              <div className="p-3 rounded bg-[#FEF3C7]/60 dark:bg-[#78350F]/25 border border-[#F59E0B]/40 dark:border-[#F59E0B]/30 flex items-start gap-2 text-xs text-[#92400E] dark:text-[#FDE68A]">
                                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>{prob.mathNote}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};
