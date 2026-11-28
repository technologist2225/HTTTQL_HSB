import { ExamQuestion, GtkdGroupInfo, GtkdSegmentSet } from '../types/exam';
import { shuffleArray } from './index';
import { GTKD_PART1_QUESTIONS } from './gtkdPart1';
import { GTKD_PART2_QUESTIONS } from './gtkdPart2';

export const GTKD_ALL_QUESTIONS: ExamQuestion[] = [
  ...GTKD_PART1_QUESTIONS,
  ...GTKD_PART2_QUESTIONS,
];

export const GTKD_QUESTION_BY_ID: Record<number, ExamQuestion> = Object.fromEntries(
  GTKD_ALL_QUESTIONS.map((q) => [q.id, q])
);

export const GTKD_GROUPS: GtkdGroupInfo[] = [
  {
    group: 1,
    title: 'Nhóm 1 – Trắc nghiệm Giao tiếp kinh doanh (File 1)',
    shortTitle: 'Nhóm 1: Tổng hợp File 1 (Câu 1–65)',
    sourceLabel: 'File “Trắc nghiệm giao tiếp kinh doanh – câu hỏi và đáp án”',
    rangeLabel: 'Câu 1 – 65',
  },
  {
    group: 2,
    title: 'Nhóm 2 – Bộ 70 câu đầu (Cuối kỳ)',
    shortTitle: 'Nhóm 2: Cuối kỳ – Bộ đầu (Câu 66–126)',
    sourceLabel: 'File “Cuoiki – trắc nghiệm giao tiếp kinh doanh” (bộ đầu)',
    rangeLabel: 'Câu 66 – 126',
  },
  {
    group: 3,
    title: 'Nhóm 3 – Đề kiểm tra môn Giao tiếp',
    shortTitle: 'Nhóm 3: Đề kiểm tra (Câu 127–174)',
    sourceLabel: 'File “Cuoiki” – phần “ĐỀ KIỂM TRA MÔN GIAO TIẾP”',
    rangeLabel: 'Câu 127 – 174',
  },
  {
    group: 4,
    title: 'Nhóm 4 – Các đề ôn tập phía sau',
    shortTitle: 'Nhóm 4: Đề ôn tập sau (Câu 175–245)',
    sourceLabel: 'File “Cuoiki” – các đề ôn tập phía sau',
    rangeLabel: 'Câu 175 – 245',
  },
];

export const GTKD_SEGMENT_SETS: GtkdSegmentSet[] = [
  {
    segmentNumber: 1,
    code: '01',
    title: 'Đề luyện số 01 (Câu 1 – 50)',
    rangeLabel: 'Câu 1 – 50 · 50 câu',
    questionIds: GTKD_ALL_QUESTIONS.slice(0, 50).map((q) => q.id),
  },
  {
    segmentNumber: 2,
    code: '02',
    title: 'Đề luyện số 02 (Câu 51 – 100)',
    rangeLabel: 'Câu 51 – 100 · 50 câu',
    questionIds: GTKD_ALL_QUESTIONS.slice(50, 100).map((q) => q.id),
  },
  {
    segmentNumber: 3,
    code: '03',
    title: 'Đề luyện số 03 (Câu 101 – 150)',
    rangeLabel: 'Câu 101 – 150 · 50 câu',
    questionIds: GTKD_ALL_QUESTIONS.slice(100, 150).map((q) => q.id),
  },
  {
    segmentNumber: 4,
    code: '04',
    title: 'Đề luyện số 04 (Câu 151 – 200)',
    rangeLabel: 'Câu 151 – 200 · 50 câu',
    questionIds: GTKD_ALL_QUESTIONS.slice(150, 200).map((q) => q.id),
  },
  {
    segmentNumber: 5,
    code: '05',
    title: 'Đề luyện số 05 (Câu 201 – 245)',
    rangeLabel: 'Câu 201 – 245 · 45 câu',
    questionIds: GTKD_ALL_QUESTIONS.slice(200, 245).map((q) => q.id),
  },
];

export const GTKD_SEGMENT_BY_NUMBER: Record<number, GtkdSegmentSet> = Object.fromEntries(
  GTKD_SEGMENT_SETS.map((s) => [s.segmentNumber, s])
);

export interface GtkdConflictNote {
  questionNum: number;
  questionId: number;
  selectedKey: string;
  detail: string;
}

/**
 * 12 câu có dấu ⚠ (file gốc đánh dấu mâu thuẫn hoặc đáp án cần lưu ý) từ trang 50.
 */
export const GTKD_CONFLICT_NOTES: GtkdConflictNote[] = [
  {
    questionNum: 2,
    questionId: 3002,
    selectedKey: 'C',
    detail:
      'File 1 tô “truyền thông tin nhanh chóng” (C), file 2 tô “thông tin thường không hoàn chỉnh” (A). Cả hai đều là đặc điểm của tin đồn.',
  },
  {
    questionNum: 11,
    questionId: 3011,
    selectedKey: 'C',
    detail:
      'File gốc tô C, nhưng xét logic, phát biểu “không đúng” nhiều khả năng là D (các công ty đều áp dụng một quy trình chuẩn).',
  },
  {
    questionNum: 45,
    questionId: 3045,
    selectedKey: 'B',
    detail:
      'File 1 tô “trông giống như do một cá nhân chuẩn bị” (B), file 2 tô “người điều phối đảm bảo bình đẳng thời gian” (C). Chọn B vì khớp với nguyên tắc tính gắn kết của nhóm.',
  },
  {
    questionNum: 55,
    questionId: 3055,
    selectedKey: 'B',
    detail:
      'File 1 tô A (phân tích độc giả), đề ôn khác tô “đánh giá hiệu quả bài thuyết trình” (B). Chọn B.',
  },
  {
    questionNum: 67,
    questionId: 3067,
    selectedKey: 'D',
    detail:
      'File gốc tô D (tạo ấn tượng nhất quán, chuyên nghiệp), nhưng mục đích của từ khoá trong résumé điện tử thường là C (để hệ thống lọc résumé tự động chọn).',
  },
  {
    questionNum: 104,
    questionId: 3104,
    selectedKey: 'D',
    detail: 'File gốc có chỗ tô B, nhưng B là phát biểu sai; đáp án hợp lý là D.',
  },
  {
    questionNum: 112,
    questionId: 3112,
    selectedKey: 'B',
    detail:
      'File gốc tô B (có mũi tên chỉ sang C trong file), nên cần kiểm tra hoặc hỏi lại giảng viên.',
  },
  {
    questionNum: 122,
    questionId: 3122,
    selectedKey: 'D',
    detail:
      'File gốc tô D; sách giáo trình thường cho rằng lỗi nghiêm trọng nhất là lỗi chính tả/đánh máy.',
  },
  {
    questionNum: 132,
    questionId: 3132,
    selectedKey: 'C',
    detail:
      'File gốc tô C (làm chậm dòng chảy thông tin); đáp án thường gặp là B (chia sẻ thông tin với nhân viên).',
  },
  {
    questionNum: 140,
    questionId: 3140,
    selectedKey: 'A',
    detail: 'File gốc tô A; đáp án có thể là D (loại bỏ các động từ và danh từ ẩn).',
  },
  {
    questionNum: 169,
    questionId: 3169,
    selectedKey: 'D',
    detail:
      'File gốc tô A (người nhận giải thích giống người gửi), mệnh đề này không phải rào cản; chọn D.',
  },
  {
    questionNum: 187,
    questionId: 3187,
    selectedKey: 'B',
    detail: 'File gốc tô C (không hợp lý), chọn B.',
  },
];

/**
 * Bốc đề thi thử GTKD ngẫu nhiên cân đối từ cả 4 nhóm (mặc định 40 câu: 10 câu × 4 nhóm, chỉ lấy câu trắc nghiệm A–D).
 */
export function buildRandomGtkdMockIds(perGroup = 10): number[] {
  const result: number[] = [];
  for (let g = 1; g <= 4; g++) {
    const pool = GTKD_ALL_QUESTIONS.filter(
      (q) => q.chapter === g && q.type === 'mcq'
    );
    const chosen = shuffleArray(pool).slice(0, perGroup);
    result.push(...chosen.map((q) => q.id));
  }
  return result;
}
