import React, { useMemo, useState } from 'react';
import { CheckCircle2, Eye, EyeOff, Search } from 'lucide-react';
import { ALL_QUESTIONS, CHAPTERS } from '../data';
import { QuestionType } from '../types/exam';
import { normalizeText } from '../utils/grading';

interface QuestionBankViewProps {
  onStartChapterPractice: (chapter: number) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  onStartChapterPractice,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | QuestionType>('all');
  const [chapterFilter, setChapterFilter] = useState<number | 'all'>('all');
  const [showAnswers, setShowAnswers] = useState(true);

  const filteredQuestions = useMemo(() => {
    const qNorm = normalizeText(searchQuery);
    return ALL_QUESTIONS.filter((q) => {
      if (typeFilter !== 'all' && q.type !== typeFilter) return false;
      if (chapterFilter !== 'all' && q.chapter !== chapterFilter) return false;
      if (!qNorm) return true;

      if (String(q.id).includes(qNorm)) return true;

      if (q.type === 'mcq') {
        const hay = normalizeText(
          `${q.prompt} ${q.options.map((o) => o.text).join(' ')}`
        );
        return hay.includes(qNorm);
      }
      if (q.type === 'short') {
        const hay = normalizeText(`${q.segments.join(' ')} ${q.officialAnswer}`);
        return hay.includes(qNorm);
      }
      const hay = normalizeText(`${q.prompt} ${q.modelAnswerBullets.join(' ')}`);
      return hay.includes(qNorm);
    });
  }, [searchQuery, typeFilter, chapterFilter]);

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <div className="pb-6 border-b border-[#E2E8F0] dark:border-[#243249]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#C2410C] dark:text-[#FB923C]">
          Ngân hàng 140 câu hỏi & Đáp án MIS2002_51K33
        </h1>
        <p className="mt-1.5 text-sm text-[#475569] dark:text-[#94A3B8]">
          Tra cứu nhanh toàn bộ Phần I (100 trắc nghiệm), Phần II (30 điền khuyết) và Phần III (10 tự luận gợi ý) · Biên soạn:{' '}
          <span className="font-semibold text-[#0B4275] dark:text-[#38BDF8]">
            Anh Hoàng 51K33
          </span>
          .
        </p>

        {/* Controls Bar */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo từ khóa, thuật ngữ (VD: Bullwhip, ERP, Simon, Câu 48)..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-1 p-1 bg-[#E2E8F0]/70 dark:bg-[#1E293B] rounded-md overflow-x-auto">
            {(
              [
                { id: 'all', label: 'Tất cả' },
                { id: 'mcq', label: 'Trắc nghiệm' },
                { id: 'short', label: 'Điền khuyết' },
                { id: 'essay', label: 'Tự luận' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTypeFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  typeFilter === tab.id
                    ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                    : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-2">
            <select
              value={chapterFilter === 'all' ? 'all' : String(chapterFilter)}
              onChange={(e) =>
                setChapterFilter(
                  e.target.value === 'all' ? 'all' : Number(e.target.value)
                )
              }
              aria-label="Lọc theo chương"
              className="flex-1 px-3 py-2 text-xs font-medium rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#151F32] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
            >
              <option value="all">Tất cả 7 chương</option>
              {CHAPTERS.map((ch) => (
                <option key={ch.chapter} value={ch.chapter}>
                  {ch.shortTitle}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowAnswers((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded border border-[#0B4275]/30 dark:border-[#38BDF8]/35 bg-white dark:bg-[#151F32] text-[#0B4275] dark:text-[#38BDF8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showAnswers ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  Ẩn đáp án
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  Hiện đáp án
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <span className="tabular-nums">
            Đang hiển thị{' '}
            <strong className="text-[#0F172A] dark:text-[#F8FAFC]">
              {filteredQuestions.length}
            </strong>{' '}
            / 140 câu hỏi
          </span>
          {chapterFilter !== 'all' && (
            <button
              type="button"
              onClick={() => onStartChapterPractice(chapterFilter)}
              className="font-semibold text-[#C2410C] dark:text-[#FB923C] hover:underline cursor-pointer"
            >
              Làm bài luyện tập riêng Chương {chapterFilter} →
            </button>
          )}
        </div>
      </div>

      {/* Question List */}
      <div className="mt-6 space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-10 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
            Không tìm thấy câu hỏi nào khớp với từ khóa "{searchQuery}".
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <article
              key={q.id}
              className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#B93D0B] dark:text-[#FB923C] text-sm tabular-nums">
                    Câu {q.id}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Chương {q.chapter}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {q.type === 'mcq'
                      ? 'Trắc nghiệm'
                      : q.type === 'short'
                      ? 'Tự luận ngắn'
                      : 'Tự luận'}
                  </span>
                </div>
                <span className="font-mono tabular-nums">{q.points.toFixed(1)} đ</span>
              </div>

              {q.type === 'mcq' && (
                <div>
                  <p className="text-[15px] font-medium text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed mb-3">
                    {q.prompt}
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    {q.options.map((opt) => {
                      const isCorrect = showAnswers && opt.key === q.correctOption;
                      return (
                        <li
                          key={opt.key}
                          className={`px-3 py-1.5 rounded flex items-start gap-2 ${
                            isCorrect
                              ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/45 text-[#065F46] dark:text-[#D1FAE5] font-semibold'
                              : 'text-[#334155] dark:text-[#CBD5E1]'
                          }`}
                        >
                          <span className="shrink-0">{opt.key}.</span>
                          <span className="flex-1">{opt.text}</span>
                          {isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#34D399] shrink-0 mt-0.5" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {q.type === 'short' && (
                <div>
                  <p className="text-[15px] font-medium text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                    {q.segments.map((seg, i) => (
                      <React.Fragment key={i}>
                        {seg}
                        {i < q.blanks.length && (
                          <span className="inline-block px-2 mx-1 border-b-2 border-[#0B4275]/50 dark:border-[#38BDF8]/60 font-semibold text-[#047857] dark:text-[#34D399]">
                            {showAnswers ? q.blanks[i].display : '………………'}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                  {showAnswers && (
                    <p className="mt-2.5 text-sm text-[#065F46] dark:text-[#D1FAE5] bg-[#ECFDF5] dark:bg-[#064E3B]/40 px-3 py-2 rounded">
                      <strong>Đáp án chuẩn:</strong> {q.officialAnswer}
                    </p>
                  )}
                </div>
              )}

              {q.type === 'essay' && (
                <div>
                  <p className="text-[15px] font-medium text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                    {q.prompt}
                  </p>
                  {showAnswers && (
                    <div className="mt-3 p-4 rounded bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#243249]">
                      <div className="text-xs font-bold text-[#0B4275] dark:text-[#38BDF8] mb-2">
                        Đáp án gợi ý:
                      </div>
                      <ul className="space-y-1.5 text-sm text-[#1E293B] dark:text-[#CBD5E1] list-disc pl-5 leading-relaxed">
                        {q.modelAnswerBullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </main>
  );
};
