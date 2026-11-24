import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calculator,
  CheckCircle2,
  Clock,
  Database,
  Flame,
  History,
  Play,
  RotateCcw,
  Sigma,
  Trash2,
} from 'lucide-react';
import { ExamHistoryRecord, SubjectId } from '../types/exam';
import { formatTimeClock } from '../utils/grading';

interface SubjectHubProps {
  history: ExamHistoryRecord[];
  onOpenSubject: (subject: SubjectId) => void;
  onQuickStartMisMock: () => void;
  onQuickStartMisHardMock: () => void;
  onQuickStartStaRandom: () => void;
  onQuickStartNmkdMock: () => void;
  onStartRetryMisWrong: (wrongIds: number[]) => void;
  onStartRetryNmkdWrong: (wrongIds: number[]) => void;
  onRetakeStaExam: (examNumber: number) => void;
  onClearHistory: () => void;
}

export const SubjectHub: React.FC<SubjectHubProps> = ({
  history,
  onOpenSubject,
  onQuickStartMisMock,
  onQuickStartMisHardMock,
  onQuickStartStaRandom,
  onQuickStartNmkdMock,
  onStartRetryMisWrong,
  onStartRetryNmkdWrong,
  onRetakeStaExam,
  onClearHistory,
}) => {
  const misCount = history.filter((h) => (h.subjectId ?? 'mis2002') === 'mis2002').length;
  const staCount = history.filter((h) => h.subjectId === 'sta2005').length;
  const nmkdCount = history.filter((h) => h.subjectId === 'nmkd2026').length;

  return (
    <main className="max-w-[1260px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Portal Hero Header */}
      <section className="pb-8 border-b border-[#E2E8F0] dark:border-[#243249]">
        <p className="text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
          Trường Đại học Kinh tế – Đại học Đà Nẵng · Thực hiện bởi{' '}
          <span className="font-semibold text-[#0B4275] dark:text-[#38BDF8]">
            Anh Hoàng 51K33
          </span>
        </p>
        <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-[#C2410C] dark:text-[#FB923C] max-w-4xl">
          DUE E-Study — Cổng ôn tập & luyện đề đa học phần
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#334155] dark:text-[#CBD5E1] max-w-3xl">
          Chọn học phần bên dưới để làm bài trắc nghiệm, tự luận, tự chấm theo đáp án chuẩn và tra cứu công cụ hỗ trợ (kèm{' '}
          <strong>Bảng phân phối chuẩn hóa N(0,1)</strong> cho môn Xác suất thống kê toán).
        </p>

        {/* Clean Unboxed Metadata Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#475569] dark:text-[#94A3B8] tabular-nums">
          <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            3 học phần chính thức
          </span>
          <span aria-hidden="true">·</span>
          <span>MIS2002 (280 câu · Bộ chuẩn &amp; Bộ khó)</span>
          <span aria-hidden="true">·</span>
          <span>STA2005 (18 đề + Bảng N(0,1))</span>
          <span aria-hidden="true">·</span>
          <span>MGT2002 (10 đề · 300 câu)</span>
        </div>
      </section>

      {/* Balanced 3-Column Subject Cards */}
      <section className="py-8 border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Subject 1: MIS2002 */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#0B4275] dark:text-[#38BDF8] font-mono">
                  <Database className="w-4 h-4" />
                  MIS2002_51K33
                </span>
                <span className="text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                  {misCount > 0 ? `${misCount} lượt đã làm` : '2 bộ đề · 280 câu'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Hệ thống thông tin quản lý
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                Luyện thi chuẩn DUE E-Study gồm <strong>Bộ đề chuẩn (140 câu)</strong> và{' '}
                <strong>Bộ đề khó (140 câu)</strong>: trắc nghiệm 5 đáp án, điền khuyết và tự luận có rubric (Chương 1–7).
              </p>

              <div className="mt-4 pt-4 border-t border-[#E2E8F0] dark:border-[#243249] grid grid-cols-3 gap-2 text-xs tabular-nums">
                <div>
                  <div className="text-[#64748B] dark:text-[#94A3B8]">Bộ chuẩn</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                    140 câu
                  </div>
                </div>
                <div>
                  <div className="text-[#64748B] dark:text-[#94A3B8]">Bộ đề khó</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#C2410C] dark:text-[#FB923C]">
                    140 câu
                  </div>
                </div>
                <div>
                  <div className="text-[#64748B] dark:text-[#94A3B8]">Tổng cộng</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                    280 câu
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onOpenSubject('mis2002')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
              >
                Vào môn MIS2002
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onQuickStartMisMock}
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#0B4275]/30 dark:border-[#38BDF8]/30 rounded transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  Đề chuẩn 14c
                </button>
                <button
                  type="button"
                  onClick={onQuickStartMisHardMock}
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] bg-[#FFF7ED] dark:bg-[#431407]/40 hover:bg-[#FFEDD5] dark:hover:bg-[#431407]/70 border border-[#C2410C]/35 dark:border-[#FB923C]/40 rounded transition-colors cursor-pointer"
                >
                  <Flame className="w-3 h-3" />
                  Bộ đề khó 14c
                </button>
              </div>
            </div>
          </div>

          {/* Subject 2: STA2005 */}
          <div className="bg-[#E7F3F5] dark:bg-[#122631] border border-[#B6D4DA] dark:border-[#244A5C] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#C2410C] dark:text-[#FB923C] font-mono">
                  <Sigma className="w-4 h-4" />
                  STA2005
                </span>
                <span className="text-xs text-[#475569] dark:text-[#94A3B8] tabular-nums">
                  {staCount > 0 ? `${staCount} lượt đã làm` : '18 đề · Bảng N(0,1)'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Xác suất thống kê toán
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
                Trọn bộ 18 đề thi luyện tập (60 phút · 3 câu · thang 10đ) kèm lời giải, bảng kiểm tự chấm từng ý và{' '}
                <strong>Bảng phân phối chuẩn hóa N(0,1)</strong> tra cứu ngay khi làm bài.
              </p>

              <div className="mt-4 pt-4 border-t border-[#B6D4DA] dark:border-[#244A5C] grid grid-cols-3 gap-2 text-xs tabular-nums">
                <div>
                  <div className="text-[#475569] dark:text-[#94A3B8]">Bộ đề thi</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                    18 đề
                  </div>
                </div>
                <div>
                  <div className="text-[#475569] dark:text-[#94A3B8]">Cấu trúc</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                    2·3·5đ
                  </div>
                </div>
                <div>
                  <div className="text-[#475569] dark:text-[#94A3B8]">Phụ lục</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#C2410C] dark:text-[#FB923C]">
                    N(0,1)
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onOpenSubject('sta2005')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] dark:bg-[#EA580C] dark:hover:bg-[#C2410C] rounded transition-colors cursor-pointer"
              >
                Vào môn STA2005
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onQuickStartStaRandom}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] bg-white dark:bg-[#151F32] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border border-[#B6D4DA] dark:border-[#2B3B54] rounded transition-colors cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-[#C2410C] dark:text-[#FB923C]" />
                Bốc đề thi thử 60 phút
              </button>
            </div>
          </div>

          {/* Subject 3: MGT2002 / NMKD 2026 */}
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#047857] dark:text-[#34D399] font-mono">
                  <Briefcase className="w-4 h-4" />
                  MGT2002 · NMKD 2026
                </span>
                <span className="text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                  {nmkdCount > 0 ? `${nmkdCount} lượt đã làm` : '10 đề · 300 câu'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Nhập môn kinh doanh
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                Trọn bộ 10 mã đề trắc nghiệm 2026 (202601–202610) gồm 300 câu hỏi 5 lựa chọn A–E phủ đủ 6 chương, chấm điểm tự động và ôn lại câu sai.
              </p>

              <div className="mt-4 pt-4 border-t border-[#E2E8F0] dark:border-[#243249] grid grid-cols-3 gap-2 text-xs tabular-nums">
                <div>
                  <div className="text-[#64748B] dark:text-[#94A3B8]">Bộ đề thi</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                    10 mã đề
                  </div>
                </div>
                <div>
                  <div className="text-[#64748B] dark:text-[#94A3B8]">Ngân hàng</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                    300 câu
                  </div>
                </div>
                <div>
                  <div className="text-[#64748B] dark:text-[#94A3B8]">Phạm vi</div>
                  <div className="mt-0.5 text-sm font-bold font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                    6 chương
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onOpenSubject('nmkd2026')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors cursor-pointer"
              >
                Vào môn Nhập môn KD
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onQuickStartNmkdMock}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] bg-[#F8FAFC] dark:bg-[#1E293B] hover:bg-[#EEF2F6] dark:hover:bg-[#273549] border border-[#0B4275]/30 dark:border-[#38BDF8]/30 rounded transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Thi thử trộn đề 30 câu (30 phút)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Recent History Across All 3 Subjects */}
      <section className="py-8">
        <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#0B4275] dark:text-[#38BDF8]" />
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Lịch sử làm bài gần đây (Tất cả môn học)
              </h2>
            </div>
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="inline-flex items-center gap-1 text-xs text-[#64748B] dark:text-[#94A3B8] hover:text-[#B91C1C] dark:hover:text-[#F87171] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa lịch sử
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
              <Clock className="w-7 h-7 mx-auto mb-2 text-[#94A3B8] dark:text-[#64748B]" />
              <p>Chưa có lượt làm bài nào được lưu trên trình duyệt này.</p>
              <p className="mt-1 text-xs">
                Hãy chọn môn MIS2002, STA2005 hoặc MGT2002 phía trên để bắt đầu làm bài và theo dõi tiến độ ôn tập.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#243249]">
              {history.slice(0, 8).map((item) => {
                const subj: SubjectId = item.subjectId ?? 'mis2002';
                const subjectLabel =
                  subj === 'sta2005'
                    ? 'STA2005'
                    : subj === 'nmkd2026'
                      ? 'MGT2002'
                      : 'MIS2002';
                const subjectColor =
                  subj === 'sta2005'
                    ? 'text-[#C2410C] dark:text-[#FB923C]'
                    : subj === 'nmkd2026'
                      ? 'text-[#047857] dark:text-[#34D399]'
                      : 'text-[#0B4275] dark:text-[#38BDF8]';

                return (
                  <div
                    key={item.id}
                    className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className={`text-xs font-bold font-mono ${subjectColor}`}>
                          {subjectLabel}
                        </span>
                        <span className="text-[#CBD5E1] dark:text-[#334155]">·</span>
                        <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                          {item.title}
                        </p>
                      </div>
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

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      {subj === 'sta2005' && item.staExamNumber ? (
                        <button
                          type="button"
                          onClick={() => onRetakeStaExam(item.staExamNumber!)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] hover:underline cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Làm lại Đề {String(item.staExamNumber).padStart(2, '0')}
                        </button>
                      ) : subj === 'nmkd2026' && item.wrongQuestionIds.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => onStartRetryNmkdWrong(item.wrongQuestionIds)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#047857] dark:text-[#34D399] hover:underline cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Ôn lại {item.wrongQuestionIds.length} câu sai
                        </button>
                      ) : subj === 'mis2002' && item.wrongQuestionIds.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => onStartRetryMisWrong(item.wrongQuestionIds)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4275] dark:text-[#38BDF8] hover:underline cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Ôn lại {item.wrongQuestionIds.length} câu chưa đạt
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#047857] dark:text-[#34D399]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đạt tối đa
                        </span>
                      )}

                      <div className="text-right min-w-[68px]">
                        <div className="text-base font-bold font-mono tabular-nums text-[#C2410C] dark:text-[#FB923C]">
                          {item.scoreOutOf10.toFixed(1)}/10
                        </div>
                        <div className="text-[11px] font-mono tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                          {item.earnedPoints.toFixed(1)}/{item.maxPoints.toFixed(0)}đ
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Helpful footer note */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#0B4275] dark:text-[#38BDF8]" />
            Dữ liệu lịch sử và chế độ Sáng/Tối được lưu cục bộ trên trình duyệt của bạn.
          </span>
        </div>
      </section>
    </main>
  );
};
