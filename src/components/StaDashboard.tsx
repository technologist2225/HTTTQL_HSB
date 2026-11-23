import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  History,
  Play,
  RotateCcw,
  Shuffle,
  Table2,
  Trash2,
} from 'lucide-react';
import { STA2005_EXAMS } from '../data/sta2005Exams';
import { ExamHistoryRecord, GradingMode } from '../types/exam';
import { formatTimeClock } from '../utils/grading';
import { NormalDistributionTable } from './NormalDistributionTable';

interface StaDashboardProps {
  history: ExamHistoryRecord[];
  onBackToHub: () => void;
  onStartStaExam: (
    examNumber: number,
    gradingMode: GradingMode,
    timeLimitMinutes: number | null
  ) => void;
  onOpenStaBank: () => void;
  onClearHistory: () => void;
}

const TOPIC_FILTERS = [
  { key: 'all', label: 'Tất cả 18 đề' },
  { key: 'bayes', label: 'Bayes · Mật độ · Kiểm định μ' },
  { key: 'poisson', label: 'Poisson · Chuẩn · So sánh 2 mẫu' },
  { key: 'nhi-thuc', label: 'Nhị thức · Ước lượng · Kiểm định p' },
] as const;

type TopicFilterKey = (typeof TOPIC_FILTERS)[number]['key'];

export const StaDashboard: React.FC<StaDashboardProps> = ({
  history,
  onBackToHub,
  onStartStaExam,
  onOpenStaBank,
  onClearHistory,
}) => {
  const [selectedGradingMode, setSelectedGradingMode] = useState<GradingMode>('submit');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number | null>(60);
  const [topicFilter, setTopicFilter] = useState<TopicFilterKey>('all');
  const [showTableModal, setShowTableModal] = useState(false);

  const staHistory = useMemo(
    () => history.filter((item) => item.subjectId === 'sta2005'),
    [history]
  );

  const filteredExams = useMemo(() => {
    if (topicFilter === 'all') return STA2005_EXAMS;
    return STA2005_EXAMS.filter((exam) => {
      const lower = exam.topicSummary.toLowerCase();
      if (topicFilter === 'bayes') {
        return lower.includes('bayes') || lower.includes('mật độ');
      }
      if (topicFilter === 'poisson') {
        return lower.includes('poisson') || lower.includes('2 mẫu');
      }
      if (topicFilter === 'nhi-thuc') {
        return lower.includes('nhị thức') || lower.includes('tỷ lệ') || lower.includes('ước lượng');
      }
      return true;
    });
  }, [topicFilter]);

  const handleStartRandomExam = () => {
    const randomIndex = Math.floor(Math.random() * STA2005_EXAMS.length);
    const chosen = STA2005_EXAMS[randomIndex];
    onStartStaExam(chosen.examNumber, selectedGradingMode, timeLimitMinutes);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Course Banner */}
      <section className="pb-8 border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
            Khoa Thống kê - Tin học · Trường Đại học Kinh tế – ĐH Đà Nẵng · Thực hiện bởi{' '}
            <span className="font-semibold text-[#0B4275] dark:text-[#38BDF8]">
              Anh Hoàng 51K33
            </span>
          </p>
          <button
            type="button"
            onClick={onBackToHub}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Tất cả môn học
          </button>
        </div>

        <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-[#C2410C] dark:text-[#FB923C] max-w-4xl">
          [STA2005] Lý thuyết xác suất và thống kê toán
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#334155] dark:text-[#CBD5E1] max-w-3xl">
          Bộ 18 đề thi luyện tập đầy đủ (Đề 01 – Đề 18) kèm lời giải chi tiết, bảng kiểm tự chấm điểm từng ý và{' '}
          <strong>Bảng phân phối chuẩn hóa N(0,1)</strong> mở sẵn song song trong mỗi đề để sinh viên dò giá trị Φ(z) trực tiếp lúc làm bài.
        </p>

        {/* Clean Unboxed Metadata Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#475569] dark:text-[#94A3B8] tabular-nums">
          <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            18 đề luyện tập chuẩn
          </span>
          <span aria-hidden="true">·</span>
          <span>Mỗi đề 3 câu (2đ · 3đ · 5đ)</span>
          <span aria-hidden="true">·</span>
          <span>Thời gian 60 phút</span>
          <span aria-hidden="true">·</span>
          <span>Tích hợp Bảng tra N(0,1) & Công thức</span>
        </div>

        {/* Mode & Timer Settings */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              Chế độ làm bài:
            </span>
            <div className="inline-flex items-center gap-1 p-1 bg-[#E2E8F0]/70 dark:bg-[#1E293B] rounded-lg self-start">
              <button
                type="button"
                onClick={() => {
                  setSelectedGradingMode('submit');
                  setTimeLimitMinutes(60);
                }}
                className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedGradingMode === 'submit'
                    ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                    : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
              >
                Thi thử 60 phút (Nộp bài mới chấm)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedGradingMode('instant');
                  setTimeLimitMinutes(null);
                }}
                className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedGradingMode === 'instant'
                    ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                    : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
              >
                Ôn tập (Check đáp án từng câu)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Quick Action Cards */}
      <section className="py-8 border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Random Exam */}
          <div className="bg-[#E7F3F5] dark:bg-[#122631] border border-[#B6D4DA] dark:border-[#244A5C] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] mb-1.5">
                Luyện thi thực chiến · 60 phút
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Bốc ngẫu nhiên 1 đề
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
                Chọn ngẫu nhiên 1 trong 18 đề thi chính thức (Đề 01 – Đề 18) với đồng hồ đếm ngược và Bảng phân phối chuẩn hóa N(0,1) tích hợp sẵn.
              </p>
            </div>
            <button
              type="button"
              onClick={handleStartRandomExam}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] rounded transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              Bốc đề thi thử ngay
            </button>
          </div>

          {/* Card 2: Interactive Z-Table Reference */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] mb-1.5">
                Phụ lục thi · Có sẵn trong mọi đề
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Bảng phân phối chuẩn N(0,1)
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                Tra nhanh Φ(z) = P(Z ≤ z) từ 0,00 đến 3,09, tự động tô sáng hàng–cột, tính đối xứng cho z âm kèm tóm tắt công thức ước lượng & kiểm định.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowTableModal(true)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B4275] dark:text-[#38BDF8] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#0B4275]/30 dark:border-[#38BDF8]/30 rounded transition-colors cursor-pointer"
            >
              <Table2 className="w-4 h-4" />
              Mở bảng tra N(0,1) & Công thức
            </button>
          </div>

          {/* Card 3: Full 18-Exam Solution Bank */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#475569] dark:text-[#94A3B8] mb-1.5">
                Tra cứu toàn bộ · Đề 01 – Đề 18
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Ngân hàng 18 đề & Lời giải
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                Tìm kiếm nhanh theo từ khóa hoặc dạng bài trong toàn bộ 18 đề thi STA2005. Hỗ trợ ẩn/hiện lời giải để tự ôn luyện.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenStaBank}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#334155] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#CBD5E1] dark:border-[#334155] rounded transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Xem ngân hàng 18 đề
            </button>
          </div>
        </div>
      </section>

      {/* 18-Exam Selector Grid + STA History */}
      <section className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 18-Exam Selector */}
        <div className="lg:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Chọn đề luyện tập ({filteredExams.length}/18 đề)
              </h2>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                Mỗi đề đều có Bảng phân phối chuẩn hóa N(0,1) hiển thị trực tiếp bên cạnh bài làm.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {TOPIC_FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setTopicFilter(f.key)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded border transition-colors cursor-pointer ${
                    topicFilter === f.key
                      ? 'bg-[#0B4275] dark:bg-[#1D63A8] text-white border-[#0B4275] dark:border-[#1D63A8]'
                      : 'bg-white dark:bg-[#151F32] text-[#475569] dark:text-[#94A3B8] border-[#CBD5E1] dark:border-[#334155] hover:border-[#0B4275]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredExams.map((exam) => {
              const pastAttempt = staHistory.find((h) => h.staExamNumber === exam.examNumber);
              return (
                <div
                  key={exam.examNumber}
                  className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] hover:border-[#0B4275]/60 dark:hover:border-[#38BDF8]/60 rounded p-4 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                        Đề {exam.code}
                      </span>
                      <span className="text-xs font-mono tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                        {exam.timeLimitMinutes} phút · 10đ
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                      {exam.topicSummary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#243249] flex items-center justify-between gap-2">
                    {pastAttempt ? (
                      <span className="text-xs font-mono tabular-nums text-[#047857] dark:text-[#34D399] font-semibold">
                        Gần nhất: {pastAttempt.scoreOutOf10.toFixed(1)}/10
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        Kèm bảng N(0,1)
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        onStartStaExam(exam.examNumber, selectedGradingMode, timeLimitMinutes)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3" />
                      Làm Đề {exam.code}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STA2005 Attempt History */}
        <div className="lg:col-span-4 bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#C2410C] dark:text-[#FB923C]" />
              <h2 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Lịch sử làm đề STA2005
              </h2>
            </div>
            {staHistory.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="inline-flex items-center gap-1 text-xs text-[#64748B] dark:text-[#94A3B8] hover:text-[#B91C1C] dark:hover:text-[#F87171] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa
              </button>
            )}
          </div>

          {staHistory.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
              <Clock className="w-7 h-7 mx-auto mb-2 text-[#94A3B8] dark:text-[#64748B]" />
              <p>Chưa có lượt làm bài STA2005 nào.</p>
              <p className="mt-1 text-xs">
                Chọn bất kỳ đề nào từ Đề 01 đến Đề 18 để luyện tập và tự chấm theo thang 10 điểm.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#243249]">
              {staHistory.slice(0, 8).map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                        {new Date(item.completedAt).toLocaleString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}{' '}
                        · {formatTimeClock(item.durationSeconds)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold font-mono tabular-nums text-[#C2410C] dark:text-[#FB923C]">
                        {item.scoreOutOf10.toFixed(1)}/10
                      </div>
                    </div>
                  </div>

                  {item.staExamNumber ? (
                    <button
                      type="button"
                      onClick={() =>
                        onStartStaExam(
                          item.staExamNumber!,
                          selectedGradingMode,
                          timeLimitMinutes
                        )
                      }
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Làm lại Đề {String(item.staExamNumber).padStart(2, '0')}
                    </button>
                  ) : (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#047857] dark:text-[#34D399]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đã hoàn thành
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Standalone Z-Table Modal */}
      {showTableModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Bảng phân phối chuẩn hóa N(0,1)"
        >
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col">
            <NormalDistributionTable
              compact={false}
              onClose={() => setShowTableModal(false)}
            />
          </div>
        </div>
      )}
    </main>
  );
};
