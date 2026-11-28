import React from 'react';
import { Briefcase, Database, MessageSquareText, Sigma } from 'lucide-react';
import { SubjectId } from '../types/exam';
import { MisQuestionSet } from '../data';
import { QuestionBankView } from './QuestionBankView';
import { StaBankView } from './StaBankView';
import { NmkdBankView } from './NmkdBankView';
import { GtkdBankView } from './GtkdBankView';

interface UnifiedBankViewProps {
  activeSubject: SubjectId;
  initialMisSet?: MisQuestionSet;
  onSelectSubject: (subject: SubjectId) => void;
  onStartMisChapterPractice: (chapter: number, set: MisQuestionSet) => void;
  onBackToStaHome: () => void;
  onStartStaExam: (examNumber: number) => void;
  onBackToNmkdHome: () => void;
  onStartNmkdOfficialExam: (examNumber: number) => void;
  onStartNmkdChapterPractice: (chapter: number) => void;
  onBackToGtkdHome: () => void;
  onStartGtkdGroupPractice: (group: number) => void;
}

const BANK_SUBJECTS: {
  id: SubjectId;
  code: string;
  name: string;
  meta: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'mis2002',
    code: 'MIS2002',
    name: 'Hệ thống thông tin quản lý',
    meta: '280 câu · Bộ chuẩn & Bộ đề khó',
    icon: Database,
  },
  {
    id: 'sta2005',
    code: 'STA2005',
    name: 'Xác suất thống kê toán',
    meta: '18 đề · Lời giải & Bảng N(0,1)',
    icon: Sigma,
  },
  {
    id: 'nmkd2026',
    code: 'MGT2002',
    name: 'Nhập môn kinh doanh',
    meta: '10 mã đề · 300 câu A–E',
    icon: Briefcase,
  },
  {
    id: 'gtkd',
    code: 'GTKD',
    name: 'Giao tiếp kinh doanh',
    meta: '245 câu · 4 nhóm & Ghi chú ⚠',
    icon: MessageSquareText,
  },
];

export const UnifiedBankView: React.FC<UnifiedBankViewProps> = ({
  activeSubject,
  initialMisSet = 'standard',
  onSelectSubject,
  onStartMisChapterPractice,
  onBackToStaHome,
  onStartStaExam,
  onBackToNmkdHome,
  onStartNmkdOfficialExam,
  onStartNmkdChapterPractice,
  onBackToGtkdHome,
  onStartGtkdGroupPractice,
}) => {
  return (
    <div>
      {/* 4-Subject Bank Switcher Bar */}
      <div className="bg-white dark:bg-[#11192B] border-b border-[#E2E8F0] dark:border-[#243249]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#64748B] dark:text-[#94A3B8]">
              Chọn môn học trong Ngân hàng đề &amp; Đáp án (4 học phần)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BANK_SUBJECTS.map((subj) => {
              const Icon = subj.icon;
              const isActive = activeSubject === subj.id;
              return (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => onSelectSubject(subj.id)}
                  className={`text-left px-3.5 py-3 rounded border transition-colors cursor-pointer flex items-start gap-2.5 ${
                    isActive
                      ? 'bg-[#E7F3F5] dark:bg-[#122631] border-[#0B4275] dark:border-[#38BDF8]'
                      : 'bg-[#F8FAFC] dark:bg-[#151F32] border-[#D6DCE2] dark:border-[#2B3B54] hover:border-[#0B4275]/50 dark:hover:border-[#38BDF8]/50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      isActive
                        ? 'text-[#C2410C] dark:text-[#FB923C]'
                        : 'text-[#64748B] dark:text-[#94A3B8]'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-bold font-mono ${
                          isActive
                            ? 'text-[#C2410C] dark:text-[#FB923C]'
                            : 'text-[#0B4275] dark:text-[#38BDF8]'
                        }`}
                      >
                        {subj.code}
                      </span>
                      {isActive && (
                        <span className="text-[11px] font-semibold text-[#0B4275] dark:text-[#38BDF8]">
                          · Đang xem
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                      {subj.name}
                    </div>
                    <div className="text-xs text-[#475569] dark:text-[#94A3B8] tabular-nums">
                      {subj.meta}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Subject's Question Bank */}
      {activeSubject === 'mis2002' && (
        <QuestionBankView
          key={initialMisSet}
          initialSet={initialMisSet}
          onStartChapterPractice={onStartMisChapterPractice}
        />
      )}

      {activeSubject === 'sta2005' && (
        <StaBankView
          onBackToStaHome={onBackToStaHome}
          onStartStaExam={onStartStaExam}
        />
      )}

      {activeSubject === 'nmkd2026' && (
        <NmkdBankView
          onBackToNmkdHome={onBackToNmkdHome}
          onStartOfficialExam={onStartNmkdOfficialExam}
          onStartChapterPractice={onStartNmkdChapterPractice}
        />
      )}

      {activeSubject === 'gtkd' && (
        <GtkdBankView
          onBackToGtkdHome={onBackToGtkdHome}
          onStartGroupPractice={onStartGtkdGroupPractice}
        />
      )}
    </div>
  );
};
