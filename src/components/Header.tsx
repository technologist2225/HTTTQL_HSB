import React from 'react';
import { BookOpenCheck } from 'lucide-react';

export type ActiveTab = 'home' | 'exam' | 'bank';

interface HeaderProps {
  activeTab: ActiveTab;
  hasActiveExam: boolean;
  isExamSubmitted: boolean;
  onNavigate: (tab: ActiveTab) => void;
  onQuickStartMock: () => void;
  onQuickStartFull: () => void;
  onRequestFinishExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  hasActiveExam,
  isExamSubmitted,
  onNavigate,
  onQuickStartMock,
  onQuickStartFull,
  onRequestFinishExam,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4275] rounded"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#0B4275] text-white font-bold text-xs tracking-tight shrink-0">
            DUE
          </span>
          <span className="text-[17px] font-bold tracking-tight text-[#0F172A]">
            DUE E-Study
          </span>
        </button>

        {/* Zone 2: Clean single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'home'
                ? 'text-[#C2410C] border-[#C2410C]'
                : 'border-transparent hover:text-[#0F172A]'
            }`}
          >
            Trang chủ
          </button>
          <button
            type="button"
            onClick={onQuickStartMock}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'exam' && hasActiveExam
                ? 'text-[#C2410C] border-[#C2410C]'
                : 'border-transparent hover:text-[#0F172A]'
            }`}
          >
            Thi thử DUE
          </button>
          <button
            type="button"
            onClick={onQuickStartFull}
            className="py-1 border-b-2 border-transparent hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
          >
            Trọn bộ 140 câu
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bank')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'bank'
                ? 'text-[#C2410C] border-[#C2410C]'
                : 'border-transparent hover:text-[#0F172A]'
            }`}
          >
            Ngân hàng đáp án
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          {activeTab === 'exam' && hasActiveExam && !isExamSubmitted ? (
            <button
              type="button"
              onClick={onRequestFinishExam}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpenCheck className="w-4 h-4" />
              Nộp bài & Chấm điểm
            </button>
          ) : (
            <button
              type="button"
              onClick={onQuickStartMock}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Bắt đầu thi thử
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
