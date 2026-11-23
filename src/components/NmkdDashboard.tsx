import React, { useMemo, useState } from 'react';
import {
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
import { NMKD_CHAPTERS, NMKD_EXAM_SETS } from '../data/nmkdData';
import { ExamHistoryRecord, GradingMode } from '../types/exam';
import { formatTimeClock } from '../utils/grading';

interface NmkdDashboardProps {
  history: ExamHistoryRecord[];
  onBackToHub: () => void;
  onStartOfficialExam: (
    examNumber: number,
    gradingMode: GradingMode,
    timeLimitMinutes: number | null
  ) => void;
  onStartRandomMock: (gradingMode: GradingMode, timeLimitMinutes: number | null) => void;
  onStartFull300: (gradingMode: GradingMode) => void;
  onStartChapterPractice: (chapter: number, gradingMode: GradingMode) => void;
  onStartRetryWrong: (wrongIds: number[]) => void;
  onOpenNmkdBank: () => void;
  onClearHistory: () => void;
}

export const NmkdDashboard: React.FC<NmkdDashboardProps> = ({
  history,
  onBackToHub,
  onStartOfficialExam,
  onStartRandomMock,
  onStartFull300,
  onStartChapterPractice,
  onStartRetryWrong,
  onOpenNmkdBank,
  onClearHistory,
}) => {
  const [selectedGradingMode, setSelectedGradingMode] = useState<GradingMode>('submit');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number | null>(30);

  const nmkdHistory = useMemo(
    () => history.filter((item) => item.subjectId === 'nmkd2026'),
    [history]
  );

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
          [MGT2002] Nhập môn kinh doanh — 10 Bộ đề trắc nghiệm 2026
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#334155] dark:text-[#CBD5E1] max-w-3xl">
          Trọn bộ <strong>10 mã đề trắc nghiệm (Mã đề 202601 – 202610)</strong> gồm{' '}
          <strong>300 câu hỏi 5 lựa chọn (A–E)</strong> phân bổ đều 5 câu cho mỗi chương (Chương 1–6), kèm chấm điểm tự động và ôn lại câu làm sai.
        </p>

        {/* Clean Unboxed Metadata Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#475569] dark:text-[#94A3B8] tabular-nums">
          <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            10 bộ đề · 300 câu hỏi A–E
          </span>
          <span aria-hidden="true">·</span>
          <span>30 câu / đề (5 câu × 6 chương)</span>
          <span aria-hidden="true">·</span>
          <span>Đáp án tổng hợp đầy đủ</span>
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
                setTimeLimitMinutes(30);
              }}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedGradingMode === 'submit'
                  ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
              }`}
            >
              Thi thử 30 phút (Nộp bài mới chấm)
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
          {/* Card 1: Balanced Random 30-question Mock */}
          <div className="bg-[#E7F3F5] dark:bg-[#122631] border border-[#B6D4DA] dark:border-[#244A5C] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] mb-1.5">
                Đề xuất · Ma trận chuẩn 6 chương
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Thi thử trộn đề 30 câu
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
                Bốc ngẫu nhiên đúng 5 câu cho mỗi chương từ ngân hàng 300 câu NMKD 2026, quy đổi thang 10 và lọc câu sai sau khi nộp bài.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartRandomMock(selectedGradingMode, timeLimitMinutes)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              Bắt đầu đề trộn 30 câu
            </button>
          </div>

          {/* Card 2: Full 300 questions */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] mb-1.5">
                Ôn luyện toàn diện · Đề 01 – Đề 10
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Trọn bộ 300 câu hỏi
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                Làm liên tục toàn bộ 300 câu hỏi trắc nghiệm 5 đáp án A–E không giới hạn thời gian, dễ dàng nhảy câu qua Bảng câu hỏi bên phải.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartFull300(selectedGradingMode)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B4275] dark:text-[#38BDF8] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#0B4275]/30 dark:border-[#38BDF8]/30 rounded transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Làm trọn bộ 300 câu
            </button>
          </div>

          {/* Card 3: Searchable Answer Key Bank */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#475569] dark:text-[#94A3B8] mb-1.5">
                Tra cứu nhanh · Học thuộc đáp án
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Ngân hàng 300 câu & Đáp án
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                Tra cứu toàn bộ 10 mã đề (202601–202610) theo từ khóa hoặc từng chương 1–6. Hỗ trợ ẩn/hiện đáp án để tự dò bài nhanh.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenNmkdBank}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#334155] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#CBD5E1] dark:border-[#334155] rounded transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Mở ngân hàng đáp án
            </button>
          </div>
        </div>
      </section>

      {/* 10 Official Exam Sets + Chapter Practice + History */}
      <section className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* 10 Official Exam Papers */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                10 Bộ đề chính thức (Mã đề 202601 – 202610)
              </h2>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                Mỗi mã đề gồm 30 câu hỏi trắc nghiệm 5 đáp án A–E, phân bổ 5 câu/chương theo đúng tài liệu NMKD 2026.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {NMKD_EXAM_SETS.map((exam) => {
                const pastAttempt = nmkdHistory.find(
                  (h) => h.nmkdExamNumber === exam.examNumber
                );
                return (
                  <div
                    key={exam.examNumber}
                    className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] hover:border-[#0B4275]/60 dark:hover:border-[#38BDF8]/60 rounded p-4 flex flex-col justify-between transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                          Đề số {exam.code}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                          Mã đề {exam.examCode}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#475569] dark:text-[#CBD5E1]">
                        30 câu trắc nghiệm A–E · 6 chương (5 câu/chương)
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#243249] flex items-center justify-between gap-2">
                      {pastAttempt ? (
                        <span className="text-xs font-mono tabular-nums text-[#047857] dark:text-[#34D399] font-semibold">
                          Gần nhất: {pastAttempt.scoreOutOf10.toFixed(1)}/10 (
                          {pastAttempt.earnedPoints.toFixed(0)}/30)
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                          {timeLimitMinutes ? `${timeLimitMinutes} phút` : 'Không giới hạn'}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          onStartOfficialExam(
                            exam.examNumber,
                            selectedGradingMode,
                            timeLimitMinutes
                          )
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

          {/* Practice by Chapter (6 chapters × 50 questions) */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-5">
            <h2 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
              Luyện tập chuyên sâu theo từng Chương (50 câu / chương)
            </h2>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mb-4">
              Tổng hợp toàn bộ 50 câu hỏi của mỗi chương xuyên suốt cả 10 bộ đề.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {NMKD_CHAPTERS.map((ch) => (
                <button
                  key={ch.chapter}
                  type="button"
                  onClick={() => onStartChapterPractice(ch.chapter, selectedGradingMode)}
                  className="px-3.5 py-2.5 rounded border border-[#E2E8F0] dark:border-[#243249] bg-[#F8FAFC] dark:bg-[#0F172A] hover:border-[#0B4275]/60 dark:hover:border-[#38BDF8]/60 hover:bg-[#E7F3F5]/60 dark:hover:bg-[#122631] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] truncate">
                    {ch.shortTitle}
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#0B4275] dark:text-[#38BDF8] font-semibold shrink-0">
                    50 câu →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NMKD Attempt History */}
        <div className="lg:col-span-4 bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#0B4275] dark:text-[#38BDF8]" />
              <h2 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Lịch sử làm bài NMKD
              </h2>
            </div>
            {nmkdHistory.length > 0 && (
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

          {nmkdHistory.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
              <Clock className="w-7 h-7 mx-auto mb-2 text-[#94A3B8] dark:text-[#64748B]" />
              <p>Chưa có lượt làm bài Nhập môn kinh doanh nào.</p>
              <p className="mt-1 text-xs">
                Chọn một mã đề từ Đề 01–10 hoặc làm đề trộn ngẫu nhiên 30 câu để bắt đầu.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#243249]">
              {nmkdHistory.slice(0, 8).map((item) => (
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
