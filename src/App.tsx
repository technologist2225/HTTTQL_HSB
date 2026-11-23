import { useCallback, useEffect, useState } from 'react';
import {
  ALL_QUESTIONS,
  buildRandomDueMockExamIds,
  ESSAY_QUESTIONS,
  MCQ_QUESTIONS,
  SHORT_ANSWER_QUESTIONS,
  shuffleArray,
} from './data';
import { ExamConfig, ExamHistoryRecord, GradingMode } from './types/exam';
import {
  clearExamHistory,
  loadExamHistory,
  saveExamHistoryRecord,
} from './utils/storage';
import { ActiveTab, Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { ExamWorkspace } from './components/ExamWorkspace';
import { QuestionBankView } from './components/QuestionBankView';

const THEME_STORAGE_KEY = 'due_mis2002_theme';

function getInitialDarkMode(): boolean {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  } catch {
    return false;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeExam, setActiveExam] = useState<ExamConfig | null>(null);
  const [isCurrentExamSubmitted, setIsCurrentExamSubmitted] = useState(false);
  const [finishTriggerCount, setFinishTriggerCount] = useState(0);
  const [history, setHistory] = useState<ExamHistoryRecord[]>(() => loadExamHistory());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => getInitialDarkMode());

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, [isDarkMode]);

  const handleToggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const startDueMockExam = useCallback(
    (gradingMode: GradingMode = 'submit', timeMinutes = 15) => {
      const ids = buildRandomDueMockExamIds(10, 3, 1);
      setActiveExam({
        id: `due-mock-${Date.now()}`,
        title: 'Thi thử chuẩn DUE E-Study (14 câu)',
        subtitle:
          gradingMode === 'instant'
            ? '10 trắc nghiệm · 3 tự luận ngắn · 1 tự luận · Chấm đáp án từng câu'
            : '10 trắc nghiệm · 3 tự luận ngắn · 1 tự luận · 20 điểm',
        questionIds: ids,
        timeLimitSeconds: timeMinutes * 60,
        gradingMode,
        questionsPerPage: 2,
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveTab('exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startFullBankExam = useCallback((gradingMode: GradingMode = 'instant') => {
    setActiveExam({
      id: `full-140-${Date.now()}`,
      title: 'Trọn bộ đề ôn tập MIS2002 (140 câu)',
      subtitle:
        gradingMode === 'instant'
          ? '100 trắc nghiệm · 30 điền khuyết · 10 tự luận · Kiểm tra từng câu'
          : '100 trắc nghiệm · 30 điền khuyết · 10 tự luận · Nộp bài chấm điểm',
      questionIds: ALL_QUESTIONS.map((q) => q.id),
      timeLimitSeconds: null,
      gradingMode,
      questionsPerPage: 5,
    });
    setIsCurrentExamSubmitted(false);
    setFinishTriggerCount(0);
    setActiveTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startCustomExam = useCallback(
    (options: {
      chapters: number[];
      mcqCount: number;
      shortCount: number;
      essayCount: number;
      timeLimitMinutes: number | null;
      gradingMode: GradingMode;
      shuffle: boolean;
    }) => {
      const filterCh = (ch: number) => options.chapters.includes(ch);
      const mcqPool = MCQ_QUESTIONS.filter((q) => filterCh(q.chapter));
      const shortPool = SHORT_ANSWER_QUESTIONS.filter((q) => filterCh(q.chapter));
      const essayPool = ESSAY_QUESTIONS.filter((q) => filterCh(q.chapter));

      const chosenMcq = (options.shuffle ? shuffleArray(mcqPool) : mcqPool).slice(
        0,
        options.mcqCount
      );
      const chosenShort = (options.shuffle ? shuffleArray(shortPool) : shortPool).slice(
        0,
        options.shortCount
      );
      const chosenEssay = (options.shuffle ? shuffleArray(essayPool) : essayPool).slice(
        0,
        options.essayCount
      );

      const ids = [...chosenMcq, ...chosenShort, ...chosenEssay].map((q) => q.id);
      if (ids.length === 0) return;

      const chapterText =
        options.chapters.length === 7
          ? 'Tất cả Chương 1–7'
          : `Chương ${options.chapters.join(', ')}`;

      setActiveExam({
        id: `custom-${Date.now()}`,
        title: `Đề tự chọn · ${chapterText} (${ids.length} câu)`,
        subtitle: `${chosenMcq.length} trắc nghiệm · ${chosenShort.length} điền khuyết · ${chosenEssay.length} tự luận`,
        questionIds: ids,
        timeLimitSeconds:
          options.timeLimitMinutes !== null ? options.timeLimitMinutes * 60 : null,
        gradingMode: options.gradingMode,
        questionsPerPage: ids.length <= 20 ? 2 : 5,
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveTab('exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startChapterPractice = useCallback((chapter: number) => {
    const ids = ALL_QUESTIONS.filter((q) => q.chapter === chapter).map((q) => q.id);
    if (ids.length === 0) return;

    setActiveExam({
      id: `chapter-${chapter}-${Date.now()}`,
      title: `Ôn tập Chương ${chapter} (${ids.length} câu)`,
      subtitle: 'Đầy đủ trắc nghiệm, tự luận ngắn và tự luận thuộc Chương ' + chapter,
      questionIds: ids,
      timeLimitSeconds: null,
      gradingMode: 'instant',
      questionsPerPage: 3,
    });
    setIsCurrentExamSubmitted(false);
    setFinishTriggerCount(0);
    setActiveTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startRetryWrong = useCallback((wrongIds: number[]) => {
    if (wrongIds.length === 0) return;
    setActiveExam({
      id: `retry-${Date.now()}`,
      title: `Ôn lại câu chưa đạt (${wrongIds.length} câu)`,
      subtitle: 'Chế độ kiểm tra đáp án tức thì từng câu',
      questionIds: wrongIds,
      timeLimitSeconds: null,
      gradingMode: 'instant',
      questionsPerPage: 3,
    });
    setIsCurrentExamSubmitted(false);
    setFinishTriggerCount(0);
    setActiveTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleExamSubmitted = useCallback(
    (payload: {
      title: string;
      totalQuestions: number;
      answeredCount: number;
      earnedPoints: number;
      maxPoints: number;
      scoreOutOf10: number;
      durationSeconds: number;
      wrongQuestionIds: number[];
      gradingMode: GradingMode;
    }) => {
      setIsCurrentExamSubmitted(true);
      const record: ExamHistoryRecord = {
        id: `hist-${Date.now()}`,
        completedAt: new Date().toISOString(),
        ...payload,
      };
      setHistory(saveExamHistoryRecord(record));
    },
    []
  );

  const handleClearHistory = useCallback(() => {
    clearExamHistory();
    setHistory([]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] text-[#1E293B] dark:text-[#E2E8F0] transition-colors">
      <Header
        activeTab={activeTab}
        hasActiveExam={Boolean(activeExam)}
        isExamSubmitted={isCurrentExamSubmitted}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickStartMock={() => startDueMockExam('submit', 15)}
        onQuickStartFull={() => startFullBankExam('instant')}
        onRequestFinishExam={() => setFinishTriggerCount((c) => c + 1)}
      />

      <div className="flex-1">
        {activeTab === 'home' && (
          <HomeDashboard
            history={history}
            onStartDueMock={startDueMockExam}
            onStartFullBank={startFullBankExam}
            onStartCustomExam={startCustomExam}
            onStartRetryWrong={startRetryWrong}
            onOpenQuestionBank={() => {
              setActiveTab('bank');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === 'exam' && activeExam && (
          <ExamWorkspace
            config={activeExam}
            finishTriggerCount={finishTriggerCount}
            onExitToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartRetryWrong={startRetryWrong}
            onStartNewMock={() => startDueMockExam(activeExam.gradingMode, 15)}
            onExamSubmitted={handleExamSubmitted}
          />
        )}

        {activeTab === 'bank' && (
          <QuestionBankView onStartChapterPractice={startChapterPractice} />
        )}
      </div>

      {/* Signature DUE E-Study Bottom Accent Footer */}
      <footer className="mt-12">
        <div className="h-1 bg-[#C2410C] dark:bg-[#EA580C]" />
        <div className="bg-[#0B4275] dark:bg-[#0F1B2E] text-white/90">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span>
              DUE E-Study · Bộ đề ôn tập Hệ thống thông tin quản lý (MIS2002_51K33)
            </span>
            <span className="text-white/90 font-medium">
              Thực hiện bởi <strong className="text-white">Anh Hoàng 51K33</strong> · 140 câu hỏi kèm đáp án
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
