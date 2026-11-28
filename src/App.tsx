import { useCallback, useEffect, useState } from 'react';
import {
  buildRandomDueMockExamIds,
  getMisQuestionPools,
  MisQuestionSet,
  shuffleArray,
} from './data';
import { STA2005_EXAMS, STA_EXAM_BY_NUMBER } from './data/sta2005Exams';
import {
  buildRandomNmkdMockIds,
  NMKD_ALL_QUESTIONS,
  NMKD_EXAM_BY_NUMBER,
  NMKD_QUESTION_BY_ID,
} from './data/nmkdData';
import {
  buildRandomGtkdMockIds,
  GTKD_ALL_QUESTIONS,
  GTKD_QUESTION_BY_ID,
  GTKD_SEGMENT_BY_NUMBER,
} from './data/gtkdData';
import {
  ExamConfig,
  ExamHistoryRecord,
  GradingMode,
  SubjectId,
} from './types/exam';
import {
  clearExamHistory,
  loadExamHistory,
  saveExamHistoryRecord,
} from './utils/storage';
import { AppView, Header } from './components/Header';
import { SubjectHub } from './components/SubjectHub';
import { HomeDashboard } from './components/HomeDashboard';
import { ExamWorkspace } from './components/ExamWorkspace';
import { StaDashboard } from './components/StaDashboard';
import { StaExamWorkspace } from './components/StaExamWorkspace';
import { NmkdDashboard } from './components/NmkdDashboard';
import { GtkdDashboard } from './components/GtkdDashboard';
import { UnifiedBankView } from './components/UnifiedBankView';

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

interface ActiveStaExamConfig {
  examNumber: number;
  gradingMode: GradingMode;
  timeLimitSeconds: number | null;
}

interface ActiveNmkdExamState {
  config: ExamConfig;
  examNumber?: number;
}

interface ActiveGtkdExamState {
  config: ExamConfig;
  segmentNumber?: number;
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('hub');
  const [activeSubject, setActiveSubject] = useState<SubjectId>('mis2002');

  // MIS2002 active exam state
  const [selectedMisSet, setSelectedMisSet] = useState<MisQuestionSet>('standard');
  const [activeMisExam, setActiveMisExam] = useState<ExamConfig | null>(null);
  const [activeMisExamSet, setActiveMisExamSet] = useState<MisQuestionSet>('standard');
  const [isCurrentExamSubmitted, setIsCurrentExamSubmitted] = useState(false);

  // STA2005 active exam state
  const [activeStaExam, setActiveStaExam] = useState<ActiveStaExamConfig | null>(null);

  // NMKD 2026 (MGT2002) active exam state
  const [activeNmkdExam, setActiveNmkdExam] = useState<ActiveNmkdExamState | null>(null);

  // GTKD (Giao tiếp kinh doanh) active exam state
  const [activeGtkdExam, setActiveGtkdExam] = useState<ActiveGtkdExamState | null>(null);

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

  const navigateToView = useCallback((view: AppView) => {
    setActiveView(view);
    if (view === 'mis-home' || view === 'mis-exam' || view === 'mis-bank') {
      setActiveSubject('mis2002');
    } else if (view === 'sta-home' || view === 'sta-exam' || view === 'sta-bank') {
      setActiveSubject('sta2005');
    } else if (view === 'nmkd-home' || view === 'nmkd-exam' || view === 'nmkd-bank') {
      setActiveSubject('nmkd2026');
    } else if (view === 'gtkd-home' || view === 'gtkd-exam' || view === 'gtkd-bank') {
      setActiveSubject('gtkd');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ==================== MIS2002 Launchers ==================== */

  const startDueMockExam = useCallback(
    (
      gradingMode: GradingMode = 'submit',
      timeMinutes = 15,
      set: MisQuestionSet = 'standard'
    ) => {
      const ids = buildRandomDueMockExamIds(10, 3, 1, undefined, set);
      const setLabel = set === 'hard' ? ' · Bộ đề khó' : '';
      setSelectedMisSet(set);
      setActiveMisExamSet(set);
      setActiveMisExam({
        id: `due-mock-${set}-${Date.now()}`,
        title: `Thi thử chuẩn DUE E-Study (14 câu)${setLabel}`,
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
      setActiveSubject('mis2002');
      setActiveView('mis-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startFullBankExam = useCallback(
    (gradingMode: GradingMode = 'instant', set: MisQuestionSet = 'standard') => {
      const pools = getMisQuestionPools(set);
      const setLabel = set === 'hard' ? ' — Bộ đề khó' : '';
      setSelectedMisSet(set);
      setActiveMisExamSet(set);
      setActiveMisExam({
        id: `full-140-${set}-${Date.now()}`,
        title: `Trọn bộ đề ôn tập MIS2002 (140 câu)${setLabel}`,
        subtitle:
          gradingMode === 'instant'
            ? '100 trắc nghiệm · 30 điền khuyết · 10 tự luận · Kiểm tra từng câu'
            : '100 trắc nghiệm · 30 điền khuyết · 10 tự luận · Nộp bài chấm điểm',
        questionIds: pools.all.map((q) => q.id),
        timeLimitSeconds: null,
        gradingMode,
        questionsPerPage: 5,
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('mis2002');
      setActiveView('mis-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startCustomExam = useCallback(
    (options: {
      chapters: number[];
      mcqCount: number;
      shortCount: number;
      essayCount: number;
      timeLimitMinutes: number | null;
      gradingMode: GradingMode;
      shuffle: boolean;
      set: MisQuestionSet;
    }) => {
      const pools = getMisQuestionPools(options.set);
      const filterCh = (ch: number) => options.chapters.includes(ch);
      const mcqPool = pools.mcq.filter((q) => filterCh(q.chapter));
      const shortPool = pools.short.filter((q) => filterCh(q.chapter));
      const essayPool = pools.essay.filter((q) => filterCh(q.chapter));

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
      const setLabel = options.set === 'hard' ? ' · Bộ đề khó' : '';

      setSelectedMisSet(options.set);
      setActiveMisExamSet(options.set);
      setActiveMisExam({
        id: `custom-${options.set}-${Date.now()}`,
        title: `Đề tự chọn · ${chapterText} (${ids.length} câu)${setLabel}`,
        subtitle: `${chosenMcq.length} trắc nghiệm · ${chosenShort.length} điền khuyết · ${chosenEssay.length} tự luận`,
        questionIds: ids,
        timeLimitSeconds:
          options.timeLimitMinutes !== null ? options.timeLimitMinutes * 60 : null,
        gradingMode: options.gradingMode,
        questionsPerPage: ids.length <= 20 ? 2 : 5,
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('mis2002');
      setActiveView('mis-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startChapterPractice = useCallback(
    (chapter: number, set: MisQuestionSet = 'standard') => {
      const pools = getMisQuestionPools(set);
      const ids = pools.all.filter((q) => q.chapter === chapter).map((q) => q.id);
      if (ids.length === 0) return;

      const setLabel = set === 'hard' ? ' · Bộ đề khó' : '';
      setSelectedMisSet(set);
      setActiveMisExamSet(set);
      setActiveMisExam({
        id: `chapter-${set}-${chapter}-${Date.now()}`,
        title: `Ôn tập Chương ${chapter} (${ids.length} câu)${setLabel}`,
        subtitle:
          'Đầy đủ trắc nghiệm, tự luận ngắn và tự luận thuộc Chương ' + chapter,
        questionIds: ids,
        timeLimitSeconds: null,
        gradingMode: 'instant',
        questionsPerPage: 3,
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('mis2002');
      setActiveView('mis-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startRetryMisWrong = useCallback((wrongIds: number[]) => {
    if (wrongIds.length === 0) return;
    setActiveMisExam({
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
    setActiveSubject('mis2002');
    setActiveView('mis-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ==================== STA2005 Launchers ==================== */

  const startStaExam = useCallback(
    (
      examNumber: number,
      gradingMode: GradingMode = 'submit',
      timeLimitMinutes: number | null = 60
    ) => {
      if (!STA_EXAM_BY_NUMBER[examNumber]) return;
      setActiveStaExam({
        examNumber,
        gradingMode,
        timeLimitSeconds: timeLimitMinutes !== null ? timeLimitMinutes * 60 : null,
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('sta2005');
      setActiveView('sta-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startRandomStaExam = useCallback(() => {
    const idx = Math.floor(Math.random() * STA2005_EXAMS.length);
    const chosen = STA2005_EXAMS[idx];
    startStaExam(chosen.examNumber, 'submit', 60);
  }, [startStaExam]);

  /* ==================== NMKD 2026 (MGT2002) Launchers ==================== */

  const startNmkdOfficialExam = useCallback(
    (
      examNumber: number,
      gradingMode: GradingMode = 'submit',
      timeLimitMinutes: number | null = 30
    ) => {
      const set = NMKD_EXAM_BY_NUMBER[examNumber];
      if (!set) return;
      setActiveNmkdExam({
        examNumber,
        config: {
          id: `nmkd-de-${set.code}-${Date.now()}`,
          title: `Đề số ${set.code} · Mã đề ${set.examCode} (30 câu)`,
          subtitle:
            gradingMode === 'instant'
              ? '30 câu trắc nghiệm A–E (6 chương) · Check đáp án từng câu'
              : '30 câu trắc nghiệm A–E (6 chương) · Nộp bài chấm điểm',
          questionIds: set.questionIds,
          timeLimitSeconds:
            timeLimitMinutes !== null ? timeLimitMinutes * 60 : null,
          gradingMode,
          questionsPerPage: 5,
        },
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('nmkd2026');
      setActiveView('nmkd-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startNmkdRandomMock = useCallback(
    (gradingMode: GradingMode = 'submit', timeLimitMinutes: number | null = 30) => {
      const ids = buildRandomNmkdMockIds();
      setActiveNmkdExam({
        config: {
          id: `nmkd-mock-${Date.now()}`,
          title: 'Thi thử trộn đề NMKD 2026 (30 câu)',
          subtitle: 'Ngẫu nhiên 5 câu/chương × 6 chương · Trắc nghiệm 5 lựa chọn A–E',
          questionIds: ids,
          timeLimitSeconds:
            timeLimitMinutes !== null ? timeLimitMinutes * 60 : null,
          gradingMode,
          questionsPerPage: 5,
        },
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('nmkd2026');
      setActiveView('nmkd-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startNmkdFull300 = useCallback((gradingMode: GradingMode = 'instant') => {
    setActiveNmkdExam({
      config: {
        id: `nmkd-full-300-${Date.now()}`,
        title: 'Trọn bộ 10 mã đề NMKD 2026 (300 câu)',
        subtitle: 'Toàn bộ 300 câu hỏi trắc nghiệm A–E từ Đề 01 đến Đề 10',
        questionIds: NMKD_ALL_QUESTIONS.map((q) => q.id),
        timeLimitSeconds: null,
        gradingMode,
        questionsPerPage: 10,
      },
    });
    setIsCurrentExamSubmitted(false);
    setFinishTriggerCount(0);
    setActiveSubject('nmkd2026');
    setActiveView('nmkd-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startNmkdChapterPractice = useCallback(
    (chapter: number, gradingMode: GradingMode = 'instant') => {
      const ids = NMKD_ALL_QUESTIONS.filter((q) => q.chapter === chapter).map(
        (q) => q.id
      );
      if (ids.length === 0) return;
      setActiveNmkdExam({
        config: {
          id: `nmkd-ch-${chapter}-${Date.now()}`,
          title: `Ôn tập Chương ${chapter} NMKD (${ids.length} câu)`,
          subtitle: `Tổng hợp toàn bộ ${ids.length} câu hỏi Chương ${chapter} từ 10 mã đề`,
          questionIds: ids,
          timeLimitSeconds: null,
          gradingMode,
          questionsPerPage: 5,
        },
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('nmkd2026');
      setActiveView('nmkd-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startRetryNmkdWrong = useCallback((wrongIds: number[]) => {
    if (wrongIds.length === 0) return;
    setActiveNmkdExam({
      config: {
        id: `nmkd-retry-${Date.now()}`,
        title: `Ôn lại câu sai NMKD (${wrongIds.length} câu)`,
        subtitle: 'Chế độ kiểm tra đáp án tức thì từng câu',
        questionIds: wrongIds,
        timeLimitSeconds: null,
        gradingMode: 'instant',
        questionsPerPage: 5,
      },
    });
    setIsCurrentExamSubmitted(false);
    setFinishTriggerCount(0);
    setActiveSubject('nmkd2026');
    setActiveView('nmkd-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ==================== GTKD (Giao tiếp kinh doanh) Launchers ==================== */

  const startGtkdRandomMock = useCallback(
    (gradingMode: GradingMode = 'submit', timeLimitMinutes: number | null = 35) => {
      const ids = buildRandomGtkdMockIds(10);
      setActiveGtkdExam({
        config: {
          id: `gtkd-mock-${Date.now()}`,
          title: 'Thi thử trộn đề Giao tiếp kinh doanh (40 câu)',
          subtitle: 'Ngẫu nhiên 10 câu/nhóm × 4 nhóm · Trắc nghiệm 4 lựa chọn A–D',
          questionIds: ids,
          timeLimitSeconds:
            timeLimitMinutes !== null ? timeLimitMinutes * 60 : null,
          gradingMode,
          questionsPerPage: 5,
        },
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('gtkd');
      setActiveView('gtkd-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startGtkdSegmentExam = useCallback(
    (
      segmentNumber: number,
      gradingMode: GradingMode = 'submit',
      timeLimitMinutes: number | null = 35
    ) => {
      const seg = GTKD_SEGMENT_BY_NUMBER[segmentNumber];
      if (!seg) return;
      setActiveGtkdExam({
        segmentNumber,
        config: {
          id: `gtkd-seg-${seg.code}-${Date.now()}`,
          title: seg.title,
          subtitle:
            gradingMode === 'instant'
              ? `${seg.rangeLabel} · Check đáp án từng câu kèm ghi chú ⚠`
              : `${seg.rangeLabel} · Nộp bài chấm điểm tự động`,
          questionIds: seg.questionIds,
          timeLimitSeconds:
            timeLimitMinutes !== null ? timeLimitMinutes * 60 : null,
          gradingMode,
          questionsPerPage: 5,
        },
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('gtkd');
      setActiveView('gtkd-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startGtkdFull245 = useCallback((gradingMode: GradingMode = 'instant') => {
    setActiveGtkdExam({
      config: {
        id: `gtkd-full-245-${Date.now()}`,
        title: 'Trọn bộ Giao tiếp kinh doanh (245 câu)',
        subtitle: 'Toàn bộ Câu 1–245 qua 4 nhóm tài liệu DUE (kèm Câu 56 trả lời ngắn)',
        questionIds: GTKD_ALL_QUESTIONS.map((q) => q.id),
        timeLimitSeconds: null,
        gradingMode,
        questionsPerPage: 10,
      },
    });
    setIsCurrentExamSubmitted(false);
    setFinishTriggerCount(0);
    setActiveSubject('gtkd');
    setActiveView('gtkd-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startGtkdGroupPractice = useCallback(
    (group: number, gradingMode: GradingMode = 'instant') => {
      const ids = GTKD_ALL_QUESTIONS.filter((q) => q.chapter === group).map(
        (q) => q.id
      );
      if (ids.length === 0) return;
      setActiveGtkdExam({
        config: {
          id: `gtkd-grp-${group}-${Date.now()}`,
          title: `Ôn tập Nhóm ${group} GTKD (${ids.length} câu)`,
          subtitle: `Toàn bộ ${ids.length} câu hỏi thuộc Nhóm ${group} trong bộ tài liệu tổng hợp`,
          questionIds: ids,
          timeLimitSeconds: null,
          gradingMode,
          questionsPerPage: 5,
        },
      });
      setIsCurrentExamSubmitted(false);
      setFinishTriggerCount(0);
      setActiveSubject('gtkd');
      setActiveView('gtkd-exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const startRetryGtkdWrong = useCallback((wrongIds: number[]) => {
    if (wrongIds.length === 0) return;
    setActiveGtkdExam({
      config: {
        id: `gtkd-retry-${Date.now()}`,
        title: `Ôn lại câu sai GTKD (${wrongIds.length} câu)`,
        subtitle: 'Chế độ kiểm tra đáp án tức thì từng câu',
        questionIds: wrongIds,
        timeLimitSeconds: null,
        gradingMode: 'instant',
        questionsPerPage: 5,
      },
    });
    setIsCurrentExamSubmitted(false);
    setFinishTriggerCount(0);
    setActiveSubject('gtkd');
    setActiveView('gtkd-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ==================== History Handlers ==================== */

  const handleMisExamSubmitted = useCallback(
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
        subjectId: 'mis2002',
        completedAt: new Date().toISOString(),
        ...payload,
      };
      setHistory(saveExamHistoryRecord(record));
    },
    []
  );

  const handleStaExamSubmitted = useCallback(
    (payload: {
      subjectId: 'sta2005';
      staExamNumber: number;
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

  const handleNmkdExamSubmitted = useCallback(
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
        subjectId: 'nmkd2026',
        nmkdExamNumber: activeNmkdExam?.examNumber,
        completedAt: new Date().toISOString(),
        ...payload,
      };
      setHistory(saveExamHistoryRecord(record));
    },
    [activeNmkdExam?.examNumber]
  );

  const handleGtkdExamSubmitted = useCallback(
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
        subjectId: 'gtkd',
        gtkdSegmentNumber: activeGtkdExam?.segmentNumber,
        completedAt: new Date().toISOString(),
        ...payload,
      };
      setHistory(saveExamHistoryRecord(record));
    },
    [activeGtkdExam?.segmentNumber]
  );

  const handleClearHistory = useCallback(() => {
    clearExamHistory();
    setHistory([]);
  }, []);

  const hasActiveUnsubmittedExam =
    ((activeView === 'mis-exam' && Boolean(activeMisExam)) ||
      (activeView === 'sta-exam' && Boolean(activeStaExam)) ||
      (activeView === 'nmkd-exam' && Boolean(activeNmkdExam)) ||
      (activeView === 'gtkd-exam' && Boolean(activeGtkdExam))) &&
    !isCurrentExamSubmitted;

  const activeStaPaper = activeStaExam
    ? STA_EXAM_BY_NUMBER[activeStaExam.examNumber]
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] text-[#1E293B] dark:text-[#E2E8F0] transition-colors">
      <Header
        activeView={activeView}
        activeSubject={activeSubject}
        hasActiveUnsubmittedExam={hasActiveUnsubmittedExam}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onNavigateView={navigateToView}
        onOpenBankForActiveSubject={() => {
          if (activeSubject === 'sta2005') {
            navigateToView('sta-bank');
          } else if (activeSubject === 'nmkd2026') {
            navigateToView('nmkd-bank');
          } else if (activeSubject === 'gtkd') {
            navigateToView('gtkd-bank');
          } else {
            navigateToView('mis-bank');
          }
        }}
        onQuickStartForActiveSubject={() => {
          if (activeSubject === 'sta2005') {
            startRandomStaExam();
          } else if (activeSubject === 'nmkd2026') {
            startNmkdRandomMock('submit', 30);
          } else if (activeSubject === 'gtkd') {
            startGtkdRandomMock('submit', 35);
          } else {
            startDueMockExam('submit', 15, selectedMisSet);
          }
        }}
        onRequestFinishExam={() => setFinishTriggerCount((c) => c + 1)}
      />

      <div className="flex-1">
        {activeView === 'hub' && (
          <SubjectHub
            history={history}
            onOpenSubject={(subject) => {
              if (subject === 'sta2005') navigateToView('sta-home');
              else if (subject === 'nmkd2026') navigateToView('nmkd-home');
              else if (subject === 'gtkd') navigateToView('gtkd-home');
              else navigateToView('mis-home');
            }}
            onQuickStartMisMock={() => startDueMockExam('submit', 15, 'standard')}
            onQuickStartMisHardMock={() => startDueMockExam('submit', 15, 'hard')}
            onQuickStartStaRandom={startRandomStaExam}
            onQuickStartNmkdMock={() => startNmkdRandomMock('submit', 30)}
            onQuickStartGtkdMock={() => startGtkdRandomMock('submit', 35)}
            onStartRetryMisWrong={startRetryMisWrong}
            onStartRetryNmkdWrong={startRetryNmkdWrong}
            onStartRetryGtkdWrong={startRetryGtkdWrong}
            onRetakeStaExam={(examNum) => startStaExam(examNum, 'submit', 60)}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeView === 'mis-home' && (
          <HomeDashboard
            history={history}
            selectedSet={selectedMisSet}
            onChangeSet={setSelectedMisSet}
            onBackToHub={() => navigateToView('hub')}
            onStartDueMock={startDueMockExam}
            onStartFullBank={startFullBankExam}
            onStartCustomExam={startCustomExam}
            onStartRetryWrong={startRetryMisWrong}
            onOpenQuestionBank={(set) => {
              setSelectedMisSet(set);
              navigateToView('mis-bank');
            }}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeView === 'mis-exam' && activeMisExam && (
          <ExamWorkspace
            config={activeMisExam}
            finishTriggerCount={finishTriggerCount}
            courseHeading={
              activeMisExamSet === 'hard'
                ? '[271] Hệ thống thông tin quản lý [MIS2002] — Bộ đề khó'
                : '[271] Hệ thống thông tin quản lý [MIS2002_51K33]'
            }
            onExitToHome={() => navigateToView('mis-home')}
            onStartRetryWrong={startRetryMisWrong}
            onStartNewMock={() =>
              startDueMockExam(activeMisExam.gradingMode, 15, activeMisExamSet)
            }
            onExamSubmitted={handleMisExamSubmitted}
          />
        )}

        {activeView === 'sta-home' && (
          <StaDashboard
            history={history}
            onBackToHub={() => navigateToView('hub')}
            onStartStaExam={startStaExam}
            onOpenStaBank={() => navigateToView('sta-bank')}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeView === 'sta-exam' && activeStaExam && activeStaPaper && (
          <StaExamWorkspace
            exam={activeStaPaper}
            gradingMode={activeStaExam.gradingMode}
            timeLimitSeconds={activeStaExam.timeLimitSeconds}
            finishTriggerCount={finishTriggerCount}
            onExitToSubjectHome={() => navigateToView('sta-home')}
            onStartExamByNumber={(examNum, mode) =>
              startStaExam(examNum, mode, mode === 'submit' ? 60 : null)
            }
            onExamSubmitted={handleStaExamSubmitted}
          />
        )}

        {activeView === 'nmkd-home' && (
          <NmkdDashboard
            history={history}
            onBackToHub={() => navigateToView('hub')}
            onStartOfficialExam={startNmkdOfficialExam}
            onStartRandomMock={startNmkdRandomMock}
            onStartFull300={startNmkdFull300}
            onStartChapterPractice={startNmkdChapterPractice}
            onStartRetryWrong={startRetryNmkdWrong}
            onOpenNmkdBank={() => navigateToView('nmkd-bank')}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeView === 'nmkd-exam' && activeNmkdExam && (
          <ExamWorkspace
            config={activeNmkdExam.config}
            finishTriggerCount={finishTriggerCount}
            questionBankById={NMKD_QUESTION_BY_ID}
            courseHeading="[MGT2002] Nhập môn kinh doanh [NMKD_2026]"
            newMockLabel="Trộn đề 30 câu mới"
            onExitToHome={() => navigateToView('nmkd-home')}
            onStartRetryWrong={startRetryNmkdWrong}
            onStartNewMock={() =>
              startNmkdRandomMock(
                activeNmkdExam.config.gradingMode,
                activeNmkdExam.config.gradingMode === 'submit' ? 30 : null
              )
            }
            onExamSubmitted={handleNmkdExamSubmitted}
          />
        )}

        {activeView === 'gtkd-home' && (
          <GtkdDashboard
            history={history}
            onBackToHub={() => navigateToView('hub')}
            onStartRandomMock={startGtkdRandomMock}
            onStartSegmentExam={startGtkdSegmentExam}
            onStartFull245={startGtkdFull245}
            onStartGroupPractice={startGtkdGroupPractice}
            onStartRetryWrong={startRetryGtkdWrong}
            onOpenGtkdBank={() => navigateToView('gtkd-bank')}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeView === 'gtkd-exam' && activeGtkdExam && (
          <ExamWorkspace
            config={activeGtkdExam.config}
            finishTriggerCount={finishTriggerCount}
            questionBankById={GTKD_QUESTION_BY_ID}
            courseHeading="[GTKD] Giao tiếp kinh doanh [DUE_Tổng_hợp_245_câu]"
            newMockLabel="Trộn đề 40 câu mới"
            onExitToHome={() => navigateToView('gtkd-home')}
            onStartRetryWrong={startRetryGtkdWrong}
            onStartNewMock={() =>
              startGtkdRandomMock(
                activeGtkdExam.config.gradingMode,
                activeGtkdExam.config.gradingMode === 'submit' ? 35 : null
              )
            }
            onExamSubmitted={handleGtkdExamSubmitted}
          />
        )}

        {(activeView === 'mis-bank' ||
          activeView === 'sta-bank' ||
          activeView === 'nmkd-bank' ||
          activeView === 'gtkd-bank') && (
          <UnifiedBankView
            activeSubject={
              activeView === 'sta-bank'
                ? 'sta2005'
                : activeView === 'nmkd-bank'
                  ? 'nmkd2026'
                  : activeView === 'gtkd-bank'
                    ? 'gtkd'
                    : 'mis2002'
            }
            initialMisSet={selectedMisSet}
            onSelectSubject={(subj) => {
              if (subj === 'sta2005') navigateToView('sta-bank');
              else if (subj === 'nmkd2026') navigateToView('nmkd-bank');
              else if (subj === 'gtkd') navigateToView('gtkd-bank');
              else navigateToView('mis-bank');
            }}
            onStartMisChapterPractice={startChapterPractice}
            onBackToStaHome={() => navigateToView('sta-home')}
            onStartStaExam={(examNum) => startStaExam(examNum, 'submit', 60)}
            onBackToNmkdHome={() => navigateToView('nmkd-home')}
            onStartNmkdOfficialExam={(examNum) =>
              startNmkdOfficialExam(examNum, 'submit', 30)
            }
            onStartNmkdChapterPractice={(ch) =>
              startNmkdChapterPractice(ch, 'instant')
            }
            onBackToGtkdHome={() => navigateToView('gtkd-home')}
            onStartGtkdGroupPractice={(grp) =>
              startGtkdGroupPractice(grp, 'instant')
            }
          />
        )}
      </div>

      {/* Signature DUE E-Study Bottom Accent Footer */}
      <footer className="mt-12">
        <div className="h-1 bg-[#C2410C] dark:bg-[#EA580C]" />
        <div className="bg-[#0B4275] dark:bg-[#0F1B2E] text-white/90">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span>
              DUE E-Study · MIS2002 · STA2005 · MGT2002 · GTKD
            </span>
            <span className="text-white/90 font-medium">
              Thực hiện bởi <strong className="text-white">Anh Hoàng 51K33</strong> · 280 câu MIS2002 · 18 đề STA2005 · 300 câu NMKD · 245 câu GTKD
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
