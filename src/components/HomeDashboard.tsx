import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  History,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import {
  CHAPTERS,
  ESSAY_QUESTIONS,
  MCQ_QUESTIONS,
  SHORT_ANSWER_QUESTIONS,
} from '../data';
import { ExamHistoryRecord, GradingMode } from '../types/exam';
import { formatTimeClock } from '../utils/grading';

interface HomeDashboardProps {
  history: ExamHistoryRecord[];
  onStartDueMock: (gradingMode: GradingMode, timeMinutes: number) => void;
  onStartFullBank: (gradingMode: GradingMode) => void;
  onStartCustomExam: (options: {
    chapters: number[];
    mcqCount: number;
    shortCount: number;
    essayCount: number;
    timeLimitMinutes: number | null;
    gradingMode: GradingMode;
    shuffle: boolean;
  }) => void;
  onStartRetryWrong: (wrongIds: number[]) => void;
  onOpenQuestionBank: () => void;
  onClearHistory: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  history,
  onStartDueMock,
  onStartFullBank,
  onStartCustomExam,
  onStartRetryWrong,
  onOpenQuestionBank,
  onClearHistory,
}) => {
  const [selectedGradingMode, setSelectedGradingMode] = useState<GradingMode>('submit');
  const [selectedChapters, setSelectedChapters] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [mcqCount, setMcqCount] = useState(10);
  const [shortCount, setShortCount] = useState(3);
  const [essayCount, setEssayCount] = useState(1);
  const [timeMinutes, setTimeMinutes] = useState<number | null>(15);
  const [shuffleOrder, setShuffleOrder] = useState(true);

  const toggleChapter = (chapterNum: number) => {
    setSelectedChapters((prev) => {
      if (prev.includes(chapterNum)) {
        if (prev.length === 1) return prev; // Keep at least 1 chapter
        return prev.filter((c) => c !== chapterNum);
      }
      return [...prev, chapterNum].sort((a, b) => a - b);
    });
  };

  const availableMcq = MCQ_QUESTIONS.filter((q) =>
    selectedChapters.includes(q.chapter)
  ).length;
  const availableShort = SHORT_ANSWER_QUESTIONS.filter((q) =>
    selectedChapters.includes(q.chapter)
  ).length;
  const availableEssay = ESSAY_QUESTIONS.filter((q) =>
    selectedChapters.includes(q.chapter)
  ).length;

  const effectiveMcq = Math.min(mcqCount, availableMcq);
  const effectiveShort = Math.min(shortCount, availableShort);
  const effectiveEssay = Math.min(essayCount, availableEssay);
  const totalSelectedCustom = effectiveMcq + effectiveShort + effectiveEssay;
  const totalCustomPoints = effectiveMcq * 1 + effectiveShort * 2 + effectiveEssay * 4;

  const handleLaunchCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalSelectedCustom === 0) return;
    onStartCustomExam({
      chapters: selectedChapters,
      mcqCount: effectiveMcq,
      shortCount: effectiveShort,
      essayCount: effectiveEssay,
      timeLimitMinutes: timeMinutes,
      gradingMode: selectedGradingMode,
      shuffle: shuffleOrder,
    });
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Course Banner */}
      <section className="pb-8 border-b border-[#E2E8F0]">
        <p className="text-sm font-medium text-[#475569]">
          Trường Đại học Kinh tế – Đại học Đà Nẵng · Hệ thống luyện thi trực tuyến
        </p>
        <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-[#C2410C] max-w-4xl">
          [271] Hệ thống thông tin quản lý [MIS2002]
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#334155] max-w-3xl">
          Làm bài kết hợp <strong>Trắc nghiệm 5 đáp án (a–e)</strong>,{' '}
          <strong>Tự luận ngắn (điền khuyết)</strong> và{' '}
          <strong>Tự luận có đáp án gợi ý & bảng kiểm ý chính</strong> trên cùng một giao diện mô phỏng chuẩn DUE E-Study.
        </p>

        {/* Clean Unboxed Metadata Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#475569] tabular-nums">
          <span className="font-semibold text-[#0F172A]">140 câu hỏi đầy đủ</span>
          <span aria-hidden="true">·</span>
          <span>100 câu trắc nghiệm (Chương 1–7)</span>
          <span aria-hidden="true">·</span>
          <span>30 câu điền khuyết</span>
          <span aria-hidden="true">·</span>
          <span>10 câu tự luận có rubric</span>
        </div>

        {/* Grading Mode Switcher */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm font-semibold text-[#0F172A]">Chế độ chấm đáp án:</span>
          <div className="inline-flex items-center gap-1 p-1 bg-[#E2E8F0]/70 rounded-lg self-start">
            <button
              type="button"
              onClick={() => setSelectedGradingMode('submit')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedGradingMode === 'submit'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Thi thử (Nộp bài mới chấm)
            </button>
            <button
              type="button"
              onClick={() => setSelectedGradingMode('instant')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedGradingMode === 'instant'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Ôn tập (Check đáp án từng câu)
            </button>
          </div>
        </div>
      </section>

      {/* Primary Quick-Start Exam Modes */}
      <section className="py-8 border-b border-[#E2E8F0]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Dominant Focal Anchor — Standard DUE Mock */}
          <div className="bg-[#E7F3F5] border border-[#B6D4DA] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#0B4275] mb-1.5">
                Đề xuất · Đúng cấu trúc DUE E-Study
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Thi thử chuẩn 14 câu
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#334155]">
                Bốc ngẫu nhiên theo đúng ma trận đề thi trên DUE E-Study: 10 trắc nghiệm (1.0đ) + 3 điền khuyết (2.0đ) + 1 tự luận (4.0đ).
              </p>
              <div className="mt-4 text-xs text-[#475569] space-y-1 tabular-nums">
                <div>Tổng điểm gốc: 20.0 điểm (quy đổi thang 10)</div>
                <div>Thời gian chuẩn: 15 phút (có đồng hồ đếm ngược)</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onStartDueMock(selectedGradingMode, 15)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4" />
              Bắt đầu đề thi thử
            </button>
          </div>

          {/* Card 2: Full 140-question PDF */}
          <div className="bg-white border border-[#D6DCE2] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#C2410C] mb-1.5">
                Ôn luyện toàn diện · Phần I – III
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Trọn bộ 140 câu PDF
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                Làm tuần tự toàn bộ 100 câu trắc nghiệm, 30 câu tự luận ngắn và 10 câu tự luận theo đúng thứ tự Chương 1–7 trong đề cương.
              </p>
              <div className="mt-4 text-xs text-[#64748B] space-y-1 tabular-nums">
                <div>Không giới hạn thời gian làm bài</div>
                <div>Tự do nhảy câu qua Bảng câu hỏi bên phải</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onStartFullBank(selectedGradingMode)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B4275] bg-[#F8FAFC] hover:bg-[#EEF2F6] border border-[#0B4275]/30 rounded transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Làm trọn bộ 140 câu
            </button>
          </div>

          {/* Card 3: Answer Key & Searchable Bank */}
          <div className="bg-white border border-[#D6DCE2] rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#475569] mb-1.5">
                Tra cứu nhanh · Học thuộc đáp án
              </div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Ngân hàng đề & Đáp án
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                Xem và tìm kiếm nhanh trong cả 140 câu hỏi và đáp án chuẩn theo từ khóa hoặc từng chương. Hỗ trợ ẩn/hiện đáp án để tự dò bài.
              </p>
              <div className="mt-4 text-xs text-[#64748B] space-y-1">
                <div>Bao gồm đáp án gợi ý chi tiết Câu 131–140</div>
                <div>Lọc nhanh theo Chương 1–7 hoặc dạng câu hỏi</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenQuestionBank}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#334155] bg-[#F8FAFC] hover:bg-[#EEF2F6] border border-[#CBD5E1] rounded transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Mở ngân hàng đáp án
            </button>
          </div>
        </div>
      </section>

      {/* Custom Exam Builder + Recent History 2-Column Split */}
      <section className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Custom Builder */}
        <form
          onSubmit={handleLaunchCustom}
          className="lg:col-span-7 bg-white border border-[#D6DCE2] rounded p-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <SlidersHorizontal className="w-4 h-4 text-[#C2410C]" />
            <h2 className="text-lg font-bold text-[#0F172A]">
              Tùy chỉnh đề luyện tập theo Chương & Dạng bài
            </h2>
          </div>
          <p className="text-sm text-[#475569] mb-5">
            Chọn các chương cần ôn và số lượng câu hỏi cho từng phần để tạo đề riêng.
          </p>

          {/* Chapter checkboxes */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#334155]">
                Phạm vi kiến thức ({selectedChapters.length}/7 chương)
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelectedChapters(
                    selectedChapters.length === 7 ? [1] : [1, 2, 3, 4, 5, 6, 7]
                  )
                }
                className="text-xs font-medium text-[#0B4275] hover:underline cursor-pointer"
              >
                {selectedChapters.length === 7 ? 'Chỉ chọn Chương 1' : 'Chọn tất cả 7 chương'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CHAPTERS.map((ch) => {
                const checked = selectedChapters.includes(ch.chapter);
                return (
                  <label
                    key={ch.chapter}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded border text-sm transition-colors cursor-pointer ${
                      checked
                        ? 'bg-[#E7F3F5]/70 border-[#0B4275]/40 text-[#0F172A] font-medium'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleChapter(ch.chapter)}
                      className="w-4 h-4 shrink-0"
                    />
                    <span className="truncate">{ch.shortTitle}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Sliders / Numeric Inputs for 3 parts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label
                htmlFor="mcq-count-input"
                className="block text-xs font-semibold text-[#334155] mb-1.5"
              >
                Trắc nghiệm (tối đa {availableMcq})
              </label>
              <input
                id="mcq-count-input"
                type="number"
                min={0}
                max={availableMcq}
                value={effectiveMcq}
                onChange={(e) =>
                  setMcqCount(Math.max(0, Math.min(availableMcq, Number(e.target.value) || 0)))
                }
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded border border-[#CBD5E1] bg-white text-[#0F172A] focus:outline-none focus:border-[#0B4275]"
              />
            </div>

            <div>
              <label
                htmlFor="short-count-input"
                className="block text-xs font-semibold text-[#334155] mb-1.5"
              >
                Tự luận ngắn (tối đa {availableShort})
              </label>
              <input
                id="short-count-input"
                type="number"
                min={0}
                max={availableShort}
                value={effectiveShort}
                onChange={(e) =>
                  setShortCount(
                    Math.max(0, Math.min(availableShort, Number(e.target.value) || 0))
                  )
                }
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded border border-[#CBD5E1] bg-white text-[#0F172A] focus:outline-none focus:border-[#0B4275]"
              />
            </div>

            <div>
              <label
                htmlFor="essay-count-input"
                className="block text-xs font-semibold text-[#334155] mb-1.5"
              >
                Tự luận dài (tối đa {availableEssay})
              </label>
              <input
                id="essay-count-input"
                type="number"
                min={0}
                max={availableEssay}
                value={effectiveEssay}
                onChange={(e) =>
                  setEssayCount(
                    Math.max(0, Math.min(availableEssay, Number(e.target.value) || 0))
                  )
                }
                className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded border border-[#CBD5E1] bg-white text-[#0F172A] focus:outline-none focus:border-[#0B4275]"
              />
            </div>
          </div>

          {/* Timer & Shuffle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="time-limit-select"
                className="block text-xs font-semibold text-[#334155] mb-1.5"
              >
                Thời gian làm bài
              </label>
              <select
                id="time-limit-select"
                value={timeMinutes === null ? 'none' : String(timeMinutes)}
                onChange={(e) =>
                  setTimeMinutes(e.target.value === 'none' ? null : Number(e.target.value))
                }
                className="w-full px-3 py-2 text-sm rounded border border-[#CBD5E1] bg-white text-[#0F172A] focus:outline-none focus:border-[#0B4275]"
              >
                <option value="10">10 phút (thi nhanh)</option>
                <option value="15">15 phút (chuẩn DUE 14 câu)</option>
                <option value="30">30 phút</option>
                <option value="45">45 phút</option>
                <option value="60">60 phút</option>
                <option value="none">Không giới hạn thời gian</option>
              </select>
            </div>

            <div className="flex items-end pb-1">
              <label className="inline-flex items-center gap-2.5 text-sm text-[#334155] cursor-pointer">
                <input
                  type="checkbox"
                  checked={shuffleOrder}
                  onChange={(e) => setShuffleOrder(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Trộn ngẫu nhiên câu hỏi trong mỗi phần</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-[#475569] tabular-nums">
              Tổng cộng: <strong className="text-[#0F172A]">{totalSelectedCustom} câu</strong> ·{' '}
              <strong className="text-[#0F172A]">{totalCustomPoints.toFixed(1)} điểm</strong>
            </div>
            <button
              type="submit"
              disabled={totalSelectedCustom === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] disabled:opacity-45 rounded transition-colors cursor-pointer"
            >
              Tạo đề & Bắt đầu làm bài
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Recent Attempt History */}
        <div className="lg:col-span-5 bg-white border border-[#D6DCE2] rounded p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#0B4275]" />
              <h2 className="text-lg font-bold text-[#0F172A]">Lịch sử làm bài</h2>
            </div>
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#B91C1C] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa lịch sử
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#64748B]">
              <Clock className="w-7 h-7 mx-auto mb-2 text-[#94A3B8]" />
              <p>Chưa có lượt làm bài nào được lưu.</p>
              <p className="mt-1 text-xs">
                Sau khi nộp bài, điểm số và danh sách câu cần ôn lại sẽ hiển thị tại đây.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E2E8F0]">
              {history.slice(0, 6).map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A] truncate">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#64748B] tabular-nums">
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
                      <div className="text-base font-bold font-mono tabular-nums text-[#C2410C]">
                        {item.scoreOutOf10.toFixed(1)}/10
                      </div>
                      <div className="text-[11px] font-mono tabular-nums text-[#64748B]">
                        {item.earnedPoints.toFixed(1)}/{item.maxPoints.toFixed(0)}đ
                      </div>
                    </div>
                  </div>

                  {item.wrongQuestionIds.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => onStartRetryWrong(item.wrongQuestionIds)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0B4275] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Ôn lại {item.wrongQuestionIds.length} câu chưa đạt
                    </button>
                  ) : (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#047857]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Hoàn thành xuất sắc toàn bộ câu hỏi
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
