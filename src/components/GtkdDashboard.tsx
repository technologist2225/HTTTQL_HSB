import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  History,
  Play,
  RotateCcw,
  Shuffle,
  Trash2,
} from 'lucide-react';
import {
  GTKD_ALL_QUESTIONS,
  GTKD_CONFLICT_NOTES,
  GTKD_GROUPS,
  GTKD_SEGMENT_SETS,
} from '../data/gtkdData';
import { ExamHistoryRecord, GradingMode } from '../types/exam';
import { formatTimeClock } from '../utils/grading';

interface GtkdDashboardProps {
  history: ExamHistoryRecord[];
  onBackToHub: () => void;
  onStartRandomMock: (gradingMode: GradingMode, timeLimitMinutes: number | null) => void;
  onStartSegmentExam: (
    segmentNumber: number,
    gradingMode: GradingMode,
    timeLimitMinutes: number | null
  ) => void;
  onStartFull245: (gradingMode: GradingMode) => void;
  onStartGroupPractice: (group: number, gradingMode: GradingMode) => void;
  onStartRetryWrong: (wrongIds: number[]) => void;
  onOpenGtkdBank: () => void;
  onClearHistory: () => void;
}

export const GtkdDashboard: React.FC<GtkdDashboardProps> = ({
  history,
  onBackToHub,
  onStartRandomMock,
  onStartSegmentExam,
  onStartFull245,
  onStartGroupPractice,
  onStartRetryWrong,
  onOpenGtkdBank,
  onClearHistory,
}) => {
  const [selectedGradingMode, setSelectedGradingMode] = useState<GradingMode>('submit');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number | null>(35);

  const gtkdHistory = useMemo(
    () => history.filter((item) => item.subjectId === 'gtkd'),
    [history]
  );

  const groupCounts = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const q of GTKD_ALL_QUESTIONS) {
      counts[q.chapter] = (counts[q.chapter] ?? 0) + 1;
    }
    return counts;
  }, []);

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Course Banner */}
      <section className="pb-8 border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
            Trường Đại học Kinh tế – Đại học Đà Nẵng · Thực hiện bởi{' '}
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
          [GTKD] Giao tiếp kinh doanh — Tổng hợp 245 câu hỏi & Đáp án
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#334155] dark:text-[#CBD5E1] max-w-3xl">
          Tổng hợp chuẩn hóa từ 2 bộ tài liệu ôn tập DUE (đã gộp ~130 câu trùng) thành{' '}
          <strong>245 câu hỏi</strong> chia theo 4 nhóm, kèm chấm điểm tức thì, ghi chú{' '}
          <strong>{GTKD_CONFLICT_NOTES.length} câu lưu ý (⚠)</strong> và đánh dấu đáp án suy luận (*).
        </p>

        {/* Clean Unboxed Metadata Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#475569] dark:text-[#94A3B8] tabular-nums">
          <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            245 câu hỏi · 4 nhóm tài liệu
          </span>
          <span aria-hidden="true">·</span>
          <span>5 đề chia đoạn (~50 câu/đề)</span>
          <span aria-hidden="true">·</span>
          <span>Kèm {GTKD_CONFLICT_NOTES.length} ghi chú câu cần lưu ý (⚠)</span>
        </div>

        {/* Grading Mode Switcher */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            Chế độ chấm đáp án:
          </span>
          <div className="inline-flex items-center gap-1 p-1 bg-[#E2E8F0]/70 dark:bg-[#1E293B] rounded-lg self-start">
            <button
              type="button"
              onClick={() => {
                setSelectedGradingMode('submit');
                setTimeLimitMinutes(35);
              }}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedGradingMode === 'submit'
                  ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
              }`}
            >
              Thi thử 35 phút (Nộp bài mới chấm)
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
      </section>

      {/* Primary Quick-Start Modes */}
      <section className="py-8 border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Balanced Random 40-question Mock */}
          <div className="bg-[#E7F3F5] dark:bg-[#122631] border border-[#B6D4DA] dark:border-[#244A5C] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] mb-1.5">
                Đề xuất · Ma trận cân đối 4 nhóm
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Thi thử trộn đề 40 câu
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
                Bốc ngẫu nhiên 10 câu từ mỗi nhóm trong ngân hàng 245 câu Giao tiếp kinh doanh, tự động chấm điểm thang 10 và lọc câu sai.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartRandomMock(selectedGradingMode, timeLimitMinutes)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              Bắt đầu đề trộn 40 câu
            </button>
          </div>

          {/* Card 2: Full 245 questions */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] mb-1.5">
                Ôn luyện toàn diện · Câu 1 – Câu 245
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Trọn bộ 245 câu hỏi
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                Làm liên tục toàn bộ 245 câu hỏi (bao gồm cả Câu 56 trả lời ngắn) không giới hạn thời gian, kèm ghi chú chi tiết khi kiểm tra đáp án.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartFull245(selectedGradingMode)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B4275] dark:text-[#38BDF8] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#0B4275]/30 dark:border-[#38BDF8]/30 rounded transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Làm trọn bộ 245 câu
            </button>
          </div>

          {/* Card 3: Searchable Answer Key Bank */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#475569] dark:text-[#94A3B8] mb-1.5">
                Tra cứu nhanh · Ghi chú ⚠ &amp; *
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Ngân hàng 245 câu & Đáp án
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                Tìm kiếm theo từ khóa, lọc theo 4 nhóm, lọc riêng 12 câu có dấu lưu ý (⚠) hoặc ẩn đáp án để tự dò bài nhanh trước giờ thi.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenGtkdBank}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#334155] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#CBD5E1] dark:border-[#334155] rounded transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Mở ngân hàng đáp án
            </button>
          </div>
        </div>
      </section>

      {/* 5 Practice Segments + 4 Document Groups + History */}
      <section className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* 5 Practice Segments */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                5 Đề luyện chia đoạn (Phủ đủ Câu 1 – Câu 245)
              </h2>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                Chia nhỏ ngân hàng 245 câu thành 5 đề liên tiếp (~50 câu/đề) giúp ôn cuốn chiếu không bỏ sót câu nào.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {GTKD_SEGMENT_SETS.map((seg) => {
                const pastAttempt = gtkdHistory.find(
                  (h) => h.gtkdSegmentNumber === seg.segmentNumber
                );
                return (
                  <div
                    key={seg.segmentNumber}
                    className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] hover:border-[#0B4275]/60 dark:hover:border-[#38BDF8]/60 rounded p-4 flex flex-col justify-between transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                          Đề luyện {seg.code}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                          {seg.questionIds.length} câu
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#475569] dark:text-[#CBD5E1]">
                        {seg.rangeLabel}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#243249] flex items-center justify-between gap-2">
                      {pastAttempt ? (
                        <span className="text-xs font-mono tabular-nums text-[#047857] dark:text-[#34D399] font-semibold">
                          Gần nhất: {pastAttempt.scoreOutOf10.toFixed(1)}/10 (
                          {pastAttempt.earnedPoints.toFixed(0)}/{pastAttempt.maxPoints.toFixed(0)})
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                          {timeLimitMinutes ? `${timeLimitMinutes} phút` : 'Không giới hạn'}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          onStartSegmentExam(
                            seg.segmentNumber,
                            selectedGradingMode,
                            timeLimitMinutes
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        Làm Đề {seg.code}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practice by 4 Source Groups */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-5">
            <h2 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
              Luyện tập theo 4 Nhóm câu hỏi gốc
            </h2>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mb-4">
              Theo đúng cấu trúc phân nhóm từ tài liệu tổng hợp Giao tiếp kinh doanh DUE.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GTKD_GROUPS.map((grp) => (
                <button
                  key={grp.group}
                  type="button"
                  onClick={() => onStartGroupPractice(grp.group, selectedGradingMode)}
                  className="px-3.5 py-3 rounded border border-[#E2E8F0] dark:border-[#243249] bg-[#F8FAFC] dark:bg-[#0F172A] hover:border-[#0B4275]/60 dark:hover:border-[#38BDF8]/60 hover:bg-[#E7F3F5]/60 dark:hover:bg-[#122631] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                      {grp.shortTitle}
                    </div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] truncate mt-0.5">
                      {grp.sourceLabel}
                    </div>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-[#0B4275] dark:text-[#38BDF8] font-semibold shrink-0">
                    {groupCounts[grp.group]} câu →
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#E2E8F0] dark:border-[#243249] flex items-start gap-2 text-xs text-[#92400E] dark:text-[#FDE68A]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#D97706] dark:text-[#FBBF24]" />
              <span>
                Lưu ý: Trong bộ câu hỏi có <strong>{GTKD_CONFLICT_NOTES.length} câu đánh dấu ⚠</strong> (file gốc mâu thuẫn/cần đối chiếu) và các câu đánh dấu <strong>*</strong> (suy luận). Khi kiểm tra đáp án hoặc xem Ngân hàng đề, hệ thống sẽ hiển thị đầy đủ ghi chú đi kèm.
              </span>
            </div>
          </div>
        </div>

        {/* GTKD Attempt History */}
        <div className="lg:col-span-4 bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#0B4275] dark:text-[#38BDF8]" />
              <h2 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Lịch sử làm bài GTKD
              </h2>
            </div>
            {gtkdHistory.length > 0 && (
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

          {gtkdHistory.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
              <Clock className="w-7 h-7 mx-auto mb-2 text-[#94A3B8] dark:text-[#64748B]" />
              <p>Chưa có lượt làm bài Giao tiếp kinh doanh nào.</p>
              <p className="mt-1 text-xs">
                Chọn đề trộn ngẫu nhiên 40 câu, 1 trong 5 đề chia đoạn hoặc luyện theo nhóm để bắt đầu.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#243249]">
              {gtkdHistory.slice(0, 8).map((item) => (
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
                        · {item.answeredCount}/{item.totalQuestions} câu ·{' '}
                        {formatTimeClock(item.durationSeconds)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold font-mono tabular-nums text-[#C2410C] dark:text-[#FB923C]">
                        {item.scoreOutOf10.toFixed(1)}/10
                      </div>
                      <div className="text-[11px] font-mono tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                        {item.earnedPoints.toFixed(0)}/{item.maxPoints.toFixed(0)}đ
                      </div>
                    </div>
                  </div>

                  {item.wrongQuestionIds.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => onStartRetryWrong(item.wrongQuestionIds)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Ôn lại {item.wrongQuestionIds.length} câu chưa đạt
                    </button>
                  ) : (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#047857] dark:text-[#34D399]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đạt điểm tuyệt đối
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
