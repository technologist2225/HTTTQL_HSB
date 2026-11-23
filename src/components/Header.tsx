import React from 'react';
import { BookOpenCheck, Moon, Sun } from 'lucide-react';
import { SubjectId } from '../types/exam';

export type AppView =
  | 'hub'
  | 'mis-home'
  | 'mis-exam'
  | 'mis-bank'
  | 'sta-home'
  | 'sta-exam'
  | 'sta-bank'
  | 'nmkd-home'
  | 'nmkd-exam'
  | 'nmkd-bank';

interface HeaderProps {
  activeView: AppView;
  activeSubject: SubjectId;
  hasActiveUnsubmittedExam: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigateView: (view: AppView) => void;
  onOpenBankForActiveSubject: () => void;
  onQuickStartForActiveSubject: () => void;
  onRequestFinishExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  activeSubject,
  hasActiveUnsubmittedExam,
  isDarkMode,
  onToggleTheme,
  onNavigateView,
  onOpenBankForActiveSubject,
  onQuickStartForActiveSubject,
  onRequestFinishExam,
}) => {
  const isMisActive = activeView === 'mis-home' || activeView === 'mis-exam';
  const isStaActive = activeView === 'sta-home' || activeView === 'sta-exam';
  const isNmkdActive = activeView === 'nmkd-home' || activeView === 'nmkd-exam';
  const isBankActive =
    activeView === 'mis-bank' ||
    activeView === 'sta-bank' ||
    activeView === 'nmkd-bank';

  const quickStartLabel =
    activeSubject === 'sta2005'
      ? 'Bốc đề STA2005'
      : activeSubject === 'nmkd2026'
        ? 'Thi thử NMKD'
        : 'Thi thử MIS2002';

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#11192B] border-b border-[#E2E8F0] dark:border-[#243249] transition-colors">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigateView('hub')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4275] dark:focus-visible:outline-[#38BDF8] rounded cursor-pointer"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#0B4275] dark:bg-[#1D63A8] text-white font-bold text-xs tracking-tight shrink-0">
            DUE
          </span>
          <span className="text-[17px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            DUE E-Study
          </span>
        </button>

        {/* Zone 2: Clean single-line text nav links (5 items) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
          <button
            type="button"
            onClick={() => onNavigateView('hub')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeView === 'hub'
                ? 'text-[#C2410C] dark:text-[#FB923C] border-[#C2410C] dark:border-[#FB923C]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            Môn học
          </button>
          <button
            type="button"
            onClick={() => onNavigateView('mis-home')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              isMisActive
                ? 'text-[#C2410C] dark:text-[#FB923C] border-[#C2410C] dark:border-[#FB923C]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            MIS2002
          </button>
          <button
            type="button"
            onClick={() => onNavigateView('sta-home')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              isStaActive
                ? 'text-[#C2410C] dark:text-[#FB923C] border-[#C2410C] dark:border-[#FB923C]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            STA2005
          </button>
          <button
            type="button"
            onClick={() => onNavigateView('nmkd-home')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              isNmkdActive
                ? 'text-[#C2410C] dark:text-[#FB923C] border-[#C2410C] dark:border-[#FB923C]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            MGT2002
          </button>
          <button
            type="button"
            onClick={onOpenBankForActiveSubject}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              isBankActive
                ? 'text-[#C2410C] dark:text-[#FB923C] border-[#C2410C] dark:border-[#FB923C]'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
            }`}
          >
            Ngân hàng đề
          </button>
        </nav>

        {/* Zone 3: Theme Toggle + 1 Context-Aware Primary Action */}
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

          {hasActiveUnsubmittedExam ? (
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
              onClick={onQuickStartForActiveSubject}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0B4275] hover:bg-[#083259] dark:bg-[#1D63A8] dark:hover:bg-[#18528C] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {quickStartLabel}
            </button>
          )}
        </div>
      </div>

      {/* Mobile compact subject strip (< md) */}
      <nav className="md:hidden border-t border-[#E2E8F0] dark:border-[#243249] px-4 py-2 flex items-center justify-between gap-3 text-xs font-medium text-[#475569] dark:text-[#94A3B8] overflow-x-auto">
        <button
          type="button"
          onClick={() => onNavigateView('hub')}
          className={`whitespace-nowrap cursor-pointer ${
            activeView === 'hub' ? 'text-[#C2410C] dark:text-[#FB923C] font-bold' : ''
          }`}
        >
          Môn học
        </button>
        <button
          type="button"
          onClick={() => onNavigateView('mis-home')}
          className={`whitespace-nowrap cursor-pointer ${
            isMisActive ? 'text-[#C2410C] dark:text-[#FB923C] font-bold' : ''
          }`}
        >
          MIS2002
        </button>
        <button
          type="button"
          onClick={() => onNavigateView('sta-home')}
          className={`whitespace-nowrap cursor-pointer ${
            isStaActive ? 'text-[#C2410C] dark:text-[#FB923C] font-bold' : ''
          }`}
        >
          STA2005
        </button>
        <button
          type="button"
          onClick={() => onNavigateView('nmkd-home')}
          className={`whitespace-nowrap cursor-pointer ${
            isNmkdActive ? 'text-[#C2410C] dark:text-[#FB923C] font-bold' : ''
          }`}
        >
          MGT2002
        </button>
        <button
          type="button"
          onClick={onOpenBankForActiveSubject}
          className={`whitespace-nowrap cursor-pointer ${
            isBankActive ? 'text-[#C2410C] dark:text-[#FB923C] font-bold' : ''
          }`}
        >
          Ngân hàng đề
        </button>
      </nav>
    </header>
  );
};
