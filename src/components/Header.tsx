import React from 'react';
import { BookOpenCheck, Moon, Sun } from 'lucide-react';

export type ActiveTab = 'home' | 'exam' | 'bank';

interface HeaderProps {
  activeTab: ActiveTab;
  hasActiveExam: boolean;
  isExamSubmitted: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onQuickStartMock: () => void;
  onQuickStartFull: () => void;
  onRequestFinishExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  hasActiveExam,
  isExamSubmitted,
  isDarkMode,
  onToggleTheme,
  onNavigate,
  onQuickStartMock,
  onQuickStartFull,
  onRequestFinishExam,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#11192B] border-b border-[#E2E8F0] dark:border-[#243249] transition-colors">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4275] dark:focus-visible:outline-[#38BDF8] rounded cursor-pointer"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#0B4275] dark:bg-[#1D63A8] text-white font-bold text-xs tracking-tight shrink-0">
            DUE
          </span>
          <span className="text-[17px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            DUE E-Study
          </span>
        </button>

        {/* Zone 2: Clean single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'home'
                ? 'text-[#C2410C] dark:text-[#FB923C] border-[#C2410C] dark:border-[#FB923C]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            Trang chủ
          </button>
          <button
            type="button"
            onClick={onQuickStartMock}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'exam' && hasActiveExam
                ? 'text-[#C2410C] dark:text-[#FB923C] border-[#C2410C] dark:border-[#FB923C]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            Thi thử DUE
          </button>
          <button
            type="button"
            onClick={onQuickStartFull}
            className="py-1 border-b-2 border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Trọn bộ 140 câu
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bank')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'bank'
                ? 'text-[#C2410C] dark:text-[#FB923C] border-[#C2410C] dark:border-[#FB923C]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            Ngân hàng đáp án
          </button>
        </nav>

        {/* Zone 3: Theme Toggle + Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            title={isDarkMode ? 'Chế độ sáng' : 'Chế độ tối'}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] text-[#334155] dark:text-[#E2E8F0] hover:bg-[#F1F5F9] dark:hover:bg-[#273549] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-[#FBBF24]" />
                <span className="hidden sm:inline">Sáng</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#0B4275]" />
                <span className="hidden sm:inline">Tối</span>
              </>
            )}
          </button>

          {activeTab === 'exam' && hasActiveExam && !isExamSubmitted ? (
            <button
              type="button"
              onClick={onRequestFinishExam}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpenCheck className="w-4 h-4" />
              Nộp bài & Chấm điểm
            </button>
          ) : (
            <button
              type="button"
              onClick={onQuickStartMock}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Bắt đầu thi thử
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
