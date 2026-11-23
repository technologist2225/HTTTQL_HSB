import { StaExamPaper } from '../types/exam';

/**
 * Exact Standard Normal Distribution Table N(0,1): Phi(z) = P(Z <= z)
 * Rows: z from 0.0 to 3.0 (step 0.1)
 * Columns: 0.00 to 0.09 (step 0.01)
 * Matches pages 3, 8, 13, ..., 88 of Bo_18_de_luyen_tap_STA2005_day_du.pdf verbatim.
 */
export const Z_TABLE_COLUMNS = [
  '0,00',
  '0,01',
  '0,02',
  '0,03',
  '0,04',
  '0,05',
  '0,06',
  '0,07',
  '0,08',
  '0,09',
] as const;

export interface ZTableRow {
  zRow: string;
  values: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}

export const STANDARD_NORMAL_TABLE: ZTableRow[] = [
  { zRow: '0.0', values: ['0.5000', '0.5040', '0.5080', '0.5120', '0.5160', '0.5199', '0.5239', '0.5279', '0.5319', '0.5359'] },
  { zRow: '0.1', values: ['0.5398', '0.5438', '0.5478', '0.5517', '0.5557', '0.5596', '0.5636', '0.5675', '0.5714', '0.5753'] },
  { zRow: '0.2', values: ['0.5793', '0.5832', '0.5871', '0.5910', '0.5948', '0.5987', '0.6026', '0.6064', '0.6103', '0.6141'] },
  { zRow: '0.3', values: ['0.6179', '0.6217', '0.6255', '0.6293', '0.6331', '0.6368', '0.6406', '0.6443', '0.6480', '0.6517'] },
  { zRow: '0.4', values: ['0.6554', '0.6591', '0.6628', '0.6664', '0.6700', '0.6736', '0.6772', '0.6808', '0.6844', '0.6879'] },
  { zRow: '0.5', values: ['0.6915', '0.6950', '0.6985', '0.7019', '0.7054', '0.7088', '0.7123', '0.7157', '0.7190', '0.7224'] },
  { zRow: '0.6', values: ['0.7257', '0.7291', '0.7324', '0.7357', '0.7389', '0.7422', '0.7454', '0.7486', '0.7517', '0.7549'] },
  { zRow: '0.7', values: ['0.7580', '0.7611', '0.7642', '0.7673', '0.7704', '0.7734', '0.7764', '0.7794', '0.7823', '0.7852'] },
  { zRow: '0.8', values: ['0.7881', '0.7910', '0.7939', '0.7967', '0.7995', '0.8023', '0.8051', '0.8078', '0.8106', '0.8133'] },
  { zRow: '0.9', values: ['0.8159', '0.8186', '0.8212', '0.8238', '0.8264', '0.8289', '0.8315', '0.8340', '0.8365', '0.8389'] },
  { zRow: '1.0', values: ['0.8413', '0.8438', '0.8461', '0.8485', '0.8508', '0.8531', '0.8554', '0.8577', '0.8599', '0.8621'] },
  { zRow: '1.1', values: ['0.8643', '0.8665', '0.8686', '0.8708', '0.8729', '0.8749', '0.8770', '0.8790', '0.8810', '0.8830'] },
  { zRow: '1.2', values: ['0.8849', '0.8869', '0.8888', '0.8907', '0.8925', '0.8944', '0.8962', '0.8980', '0.8997', '0.9015'] },
  { zRow: '1.3', values: ['0.9032', '0.9049', '0.9066', '0.9082', '0.9099', '0.9115', '0.9131', '0.9147', '0.9162', '0.9177'] },
  { zRow: '1.4', values: ['0.9192', '0.9207', '0.9222', '0.9236', '0.9251', '0.9265', '0.9279', '0.9292', '0.9306', '0.9319'] },
  { zRow: '1.5', values: ['0.9332', '0.9345', '0.9357', '0.9370', '0.9382', '0.9394', '0.9406', '0.9418', '0.9429', '0.9441'] },
  { zRow: '1.6', values: ['0.9452', '0.9463', '0.9474', '0.9484', '0.9495', '0.9505', '0.9515', '0.9525', '0.9535', '0.9545'] },
  { zRow: '1.7', values: ['0.9554', '0.9564', '0.9573', '0.9582', '0.9591', '0.9599', '0.9608', '0.9616', '0.9625', '0.9633'] },
  { zRow: '1.8', values: ['0.9641', '0.9649', '0.9656', '0.9664', '0.9671', '0.9678', '0.9686', '0.9693', '0.9699', '0.9706'] },
  { zRow: '1.9', values: ['0.9713', '0.9719', '0.9726', '0.9732', '0.9738', '0.9744', '0.9750', '0.9756', '0.9761', '0.9767'] },
  { zRow: '2.0', values: ['0.9772', '0.9778', '0.9783', '0.9788', '0.9793', '0.9798', '0.9803', '0.9808', '0.9812', '0.9817'] },
  { zRow: '2.1', values: ['0.9821', '0.9826', '0.9830', '0.9834', '0.9838', '0.9842', '0.9846', '0.9850', '0.9854', '0.9857'] },
  { zRow: '2.2', values: ['0.9861', '0.9864', '0.9868', '0.9871', '0.9875', '0.9878', '0.9881', '0.9884', '0.9887', '0.9890'] },
  { zRow: '2.3', values: ['0.9893', '0.9896', '0.9898', '0.9901', '0.9904', '0.9906', '0.9909', '0.9911', '0.9913', '0.9916'] },
  { zRow: '2.4', values: ['0.9918', '0.9920', '0.9922', '0.9925', '0.9927', '0.9929', '0.9931', '0.9932', '0.9934', '0.9936'] },
  { zRow: '2.5', values: ['0.9938', '0.9940', '0.9941', '0.9943', '0.9945', '0.9946', '0.9948', '0.9949', '0.9951', '0.9952'] },
  { zRow: '2.6', values: ['0.9953', '0.9955', '0.9956', '0.9957', '0.9959', '0.9960', '0.9961', '0.9962', '0.9963', '0.9964'] },
  { zRow: '2.7', values: ['0.9965', '0.9966', '0.9967', '0.9968', '0.9969', '0.9970', '0.9971', '0.9972', '0.9973', '0.9974'] },
  { zRow: '2.8', values: ['0.9974', '0.9975', '0.9976', '0.9977', '0.9977', '0.9978', '0.9979', '0.9979', '0.9980', '0.9981'] },
  { zRow: '2.9', values: ['0.9981', '0.9982', '0.9982', '0.9983', '0.9984', '0.9984', '0.9985', '0.9985', '0.9986', '0.9986'] },
  { zRow: '3.0', values: ['0.9987', '0.9987', '0.9987', '0.9988', '0.9988', '0.9989', '0.9989', '0.9989', '0.9990', '0.9990'] },
];

export const STA_FORMULA_REFERENCE = [
  {
    title: 'Phân phối mẫu & Thống kê cơ bản',
    formula: 'X̄ ~ N(μ, σ²/n) khi tổng thể chuẩn hoặc n đủ lớn;  Z = (X̄ − μ) / (σ/√n);  t = (X̄ − μ) / (s/√n);  χ² = (n−1)s² / σ²',
  },
  {
    title: 'Khoảng tin cậy cho trung bình μ',
    formula: 'Khi σ đã biết: X̄ ± z(α/2)·(σ/√n)   |   Khi σ chưa biết: X̄ ± t(α/2; n−1)·(s/√n)',
  },
  {
    title: 'Khoảng tin cậy & Kiểm định tỷ lệ p',
    formula: 'KTC cho p: p̂ ± z(α/2)·√(p̂(1−p̂)/n)   |   Kiểm định tỷ lệ: z = (p̂ − p₀) / √(p₀(1−p₀)/n)',
  },
  {
    title: 'Các mốc tới hạn chuẩn thường dùng',
    formula: 'z(0,10) = 1,282  ·  z(0,05) = 1,645  ·  z(0,025) = 1,960  ·  z(0,01) = 2,326  ·  z(0,005) = 2,576',
  },
];

/* ==================== Helpers to generate exact exams verbatim from PDF ==================== */

function makeTypeAExam(params: {
  examNumber: number;
  code: string;
  a: number;
  b: number;
  x1: string;
  x2: string;
  xGt: string;
  eX: string;
  mu: number;
  sigma: number;
  n2: number;
  se2: string;
  delta: number;
  z2: string;
  prob2: string;
  lo2: number;
  hi2: number;
  p0: string;
  n3: number;
  k3: number;
  pHat: string;
  se3: string;
  z3: string;
  p1: string;
  critPHat: string;
  beta: string;
  power: string;
  z3ActuallyRejects: boolean;
}): StaExamPaper {
  return {
    examNumber: params.examNumber,
    code: params.code,
    topicSummary: 'Phân phối đều · Trung bình mẫu N(μ, σ²/n) · Kiểm định tỷ lệ & Sai lầm loại II',
    timeLimitMinutes: 60,
    problems: [
      {
        number: 1,
        points: 2,
        stem: `Cho biến ngẫu nhiên liên tục X có phân phối đều trên đoạn [${params.a},${params.b}], với hàm mật độ f(x) = 1/5 trên đoạn này và bằng 0 ngoài đoạn.`,
        subParts: [
          'a. Vẽ đồ thị hàm mật độ xác suất của X.',
          `b. Tính P(${params.x1}<X<${params.x2}) và P(X>${params.xGt}).`,
          'c. Tính kỳ vọng E(X) và phương sai Var(X).',
        ],
        solution: `Vì X ~ U[${params.a},${params.b}], f(x) = 1/5. Đồ thị là hình chữ nhật cao 1/5 trên [${params.a},${params.b}]. P(${params.x1}<X<${params.x2}) = 1.75/5 = 0.35; P(X>${params.xGt}) = (${params.b}-${params.xGt})/5 = 0.70. E(X) = (${params.a}+${params.b})/2 = ${params.eX}; Var(X) = 5²/12 ≈ 2.08333.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-1a`,
            label: 'Ý a: Mô tả / vẽ đồ thị hàm mật độ f(x) = 1/5',
            points: 0.5,
            expected: `Hình chữ nhật cao 1/5 = 0.2 trên đoạn [${params.a}, ${params.b}], bằng 0 ngoài đoạn.`,
            keywords: ['1/5', '0.2', 'hinh chu nhat', `[${params.a},${params.b}]`],
          },
          {
            id: `sta-${params.examNumber}-1b`,
            label: `Ý b: Tính P(${params.x1}<X<${params.x2}) và P(X>${params.xGt})`,
            points: 0.75,
            expected: 'P = 1.75/5 = 0.35 và P = 3.5/5 = 0.70.',
            keywords: ['0.35', '1.75/5', '0.7', '3.5/5'],
          },
          {
            id: `sta-${params.examNumber}-1c`,
            label: 'Ý c: Tính E(X) và Var(X)',
            points: 0.75,
            expected: `E(X) = ${params.eX}; Var(X) = 25/12 ≈ 2.08333.`,
            keywords: [params.eX, '2.08', '25/12'],
          },
        ],
      },
      {
        number: 2,
        points: 3,
        stem: `Chi phí bảo hiểm ô tô hằng năm X tuân theo phân phối chuẩn với trung bình tổng thể μ=${params.mu} đô la và độ lệch chuẩn σ=${params.sigma} đô la. Chọn mẫu ngẫu nhiên đơn giản gồm n=${params.n2} khách hàng.`,
        subParts: [
          'a. Xác định phân phối của trung bình mẫu X-bar và nêu lý do.',
          `b. Tính P(X-bar nằm trong khoảng μ ± ${params.delta} đô la).`,
          'c. Minh họa xác suất ở câu b trên đồ thị phân phối chuẩn của X-bar.',
        ],
        solution: `Vì tổng thể chuẩn nên X-bar ~ N(${params.mu}, ${params.se2}²). Với z = ${params.delta}/${params.se2} = ${params.z2}, P(|X-bar - ${params.mu}| < ${params.delta}) = 2Φ(${params.z2}) - 1 ≈ ${params.prob2}. Đồ thị đánh dấu hai mốc ${params.lo2} và ${params.hi2}, phần diện tích ở giữa được tô.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-2a`,
            label: 'Ý a: Xác định phân phối của X-bar & nêu lý do',
            points: 1.0,
            expected: `Do tổng thể tuân theo phân phối chuẩn nên X-bar ~ N(${params.mu}; ${params.se2}²).`,
            keywords: [String(params.mu), params.se2.slice(0, 5), 'tong the chuan'],
          },
          {
            id: `sta-${params.examNumber}-2b`,
            label: `Ý b: Tính z và P(|X-bar - μ| < ${params.delta})`,
            points: 1.25,
            expected: `z = ${params.z2}, tra bảng chuẩn hóa được P ≈ ${params.prob2}.`,
            keywords: [params.z2.slice(0, 4), params.prob2.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-2c`,
            label: 'Ý c: Minh họa đồ thị chuẩn của X-bar',
            points: 0.75,
            expected: `Đường cong chuông tâm μ=${params.mu}, đánh dấu hai mốc ${params.lo2} và ${params.hi2}, tô phần giữa.`,
            keywords: [String(params.lo2), String(params.hi2), 'to phan giua', 'do thi'],
          },
        ],
      },
      {
        number: 3,
        points: 5,
        stem: `Một công ty tuyên bố tỷ lệ khách hàng hài lòng với dịch vụ là tối đa ${params.p0}. Khảo sát ${params.n3} khách hàng, có ${params.k3} người hài lòng.`,
        subParts: [
          'a. Tính ước lượng điểm p-hat và xác định phân phối xấp xỉ của p-hat.',
          'b. Kiểm định tuyên bố trên bằng phương pháp giá trị tới hạn ở mức ý nghĩa alpha=0,05. Lập H0, H1, tính thống kê và kết luận.',
          'c. Chọn một giá trị p1 lớn hơn p0 và tính xác suất sai lầm loại II tương ứng; nêu công thức sử dụng.',
          'd. Nhận xét về lực kiểm định tại p1 và giải thích ảnh hưởng của cỡ mẫu.',
        ],
        solution: `p-hat = ${params.k3}/${params.n3} = ${params.pHat}; p-hat xấp xỉ N(${params.p0}, ${params.se3}²) dưới H0. Giả thuyết H0: p ≤ ${params.p0} (p = ${params.p0}), H1: p > ${params.p0}. Thống kê z = (${params.pHat} - ${params.p0}) / ${params.se3} = ${params.z3}, giá trị tới hạn z(0,05) = 1.645. Chọn p1 = ${params.p1}; ngưỡng bác bỏ p-hat > ${params.critPHat}, nên β ≈ ${params.beta}, lực kiểm định 1 - β ≈ ${params.power}. Tăng n làm sai số chuẩn giảm, do đó lực kiểm định tăng khi p1 ≠ p0.`,
        mathNote: params.z3ActuallyRejects
          ? `Lưu ý đối chiếu: Vì z = ${params.z3} > 1.645 nên về mặt toán học là BÁC BỎ H0 ở mức α = 0,05 (file PDF gốc có lỗi đánh máy ghi nhầm z < 1.645).`
          : undefined,
        rubric: [
          {
            id: `sta-${params.examNumber}-3a`,
            label: 'Ý a: Tính p-hat và phân phối xấp xỉ dưới H0',
            points: 1.0,
            expected: `p-hat = ${params.pHat}; p-hat ≈ N(${params.p0}, ${params.se3}²).`,
            keywords: [params.pHat.slice(0, 5), params.se3.slice(0, 6)],
          },
          {
            id: `sta-${params.examNumber}-3b`,
            label: 'Ý b: Lập H0, H1, tính thống kê z và kết luận',
            points: 1.5,
            expected: `H0: p ≤ ${params.p0}, H1: p > ${params.p0}; z = ${params.z3}; so sánh với z(0,05) = 1.645.`,
            keywords: ['1.645', params.z3.slice(0, 4), 'h0', 'h1'],
          },
          {
            id: `sta-${params.examNumber}-3c`,
            label: `Ý c: Chọn p1 > ${params.p0} và tính sai lầm loại II (β)`,
            points: 1.5,
            expected: `VD chọn p1 = ${params.p1}: ngưỡng bác bỏ p-hat > ${params.critPHat} ⇒ β ≈ ${params.beta}.`,
            keywords: [params.critPHat.slice(0, 5), params.beta.slice(0, 5), 'beta'],
          },
          {
            id: `sta-${params.examNumber}-3d`,
            label: 'Ý d: Nhận xét lực kiểm định & ảnh hưởng cỡ mẫu n',
            points: 1.0,
            expected: `Lực kiểm định 1 − β ≈ ${params.power}. Tăng n làm sai số chuẩn giảm nên lực kiểm định tăng.`,
            keywords: [params.power.slice(0, 5), 'luc kiem dinh', 'sai so chuan'],
          },
        ],
      },
    ],
  };
}

function makeTypeBExam(params: {
  examNumber: number;
  code: string;
  xs: [number, number, number, number];
  eX: string;
  geVal: number;
  neVal: number;
  lambda: number;
  pEq3: string;
  pGe2: string;
  pSum5: string;
  n3: number;
  df: number;
  xBar: string;
  s: string;
  s2: string;
  me: string;
  ciLo: string;
  ciHi: string;
}): StaExamPaper {
  const [x0, x1, x2, x3] = params.xs;
  return {
    examNumber: params.examNumber,
    code: params.code,
    topicSummary: 'BNN rời rạc · Phân phối Poisson · Khoảng tin cậy cho μ (phân phối t)',
    timeLimitMinutes: 60,
    problems: [
      {
        number: 1,
        points: 2,
        stem: `Cho biến ngẫu nhiên rời rạc X có bảng phân phối: x = ${x0}, ${x1}, ${x2}, ${x3}; P(X=x) = 0,15; 0,25; 0,40; 0,20.`,
        subParts: [
          'a. Kiểm tra bảng có phải là bảng phân phối xác suất hay không.',
          'b. Lập hàm phân phối F(x) và vẽ dạng đồ thị hàm bậc thang.',
          `c. Tính E(X), Var(X), P(X lớn hơn hoặc bằng ${params.geVal}) và P(X khác ${params.neVal}).`,
        ],
        solution: `Tổng xác suất = 0,15 + 0,25 + 0,40 + 0,20 = 1 (các xác suất đều ≥ 0) nên hợp lệ. F(x) = 0 nếu x < ${x0}; = 0,15 nếu ${x0} ≤ x < ${x1}; = 0,40 nếu ${x1} ≤ x < ${x2}; = 0,80 nếu ${x2} ≤ x < ${x3}; = 1 nếu x ≥ ${x3}. E(X) = ${params.eX}; Var(X) = 0.9275 (≈ 0.927); P(X ≥ ${params.geVal}) = 0.60; P(X ≠ ${params.neVal}) = 0.75.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-1a`,
            label: 'Ý a: Kiểm tra điều kiện bảng phân phối xác suất',
            points: 0.5,
            expected: 'Mọi p_i ≥ 0 và Σp_i = 0,15 + 0,25 + 0,40 + 0,20 = 1 ⇒ hợp lệ.',
            keywords: ['hop le', 'bang 1', '=1', '= 1'],
          },
          {
            id: `sta-${params.examNumber}-1b`,
            label: 'Ý b: Lập hàm phân phối tích lũy F(x) & đồ thị bậc thang',
            points: 0.75,
            expected: `Các mức 0; 0,15; 0,40; 0,80; 1 tương ứng các khoảng chia tại ${x0}, ${x1}, ${x2}, ${x3}.`,
            keywords: ['0.15', '0.40', '0.80', 'bac thang'],
          },
          {
            id: `sta-${params.examNumber}-1c`,
            label: 'Ý c: Tính E(X), Var(X) và hai xác suất',
            points: 0.75,
            expected: `E(X) = ${params.eX}; Var(X) ≈ 0.9275; P(X ≥ ${params.geVal}) = 0.60; P(X ≠ ${params.neVal}) = 0.75.`,
            keywords: [params.eX, '0.927', '0.6', '0.75'],
          },
        ],
      },
      {
        number: 2,
        points: 3,
        stem: `Số cuộc gọi đến tổng đài trong một phút có phân phối Poisson với tham số lambda=${params.lambda}.`,
        subParts: [
          'a. Tính xác suất có đúng 3 cuộc gọi trong một phút.',
          'b. Tính xác suất có ít nhất 2 cuộc gọi.',
          'c. Giả sử các phút độc lập, tính xác suất trong 2 phút có tổng cộng đúng 5 cuộc gọi.',
        ],
        solution: `X ~ Poisson(${params.lambda}). P(X = 3) = e^(-${params.lambda})·${params.lambda}³/3! ≈ ${params.pEq3}. P(X ≥ 2) = 1 − P(0) − P(1) = 1 − e^(-${params.lambda})(1 + ${params.lambda}) ≈ ${params.pGe2}. Tổng số cuộc gọi S trong 2 phút có phân phối Poisson(2·${params.lambda} = ${params.lambda * 2}), nên P(S = 5) = e^(-${params.lambda * 2})·(${params.lambda * 2})⁵/5! ≈ ${params.pSum5}.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-2a`,
            label: 'Ý a: Tính P(X = 3)',
            points: 1.0,
            expected: `P(X = 3) ≈ ${params.pEq3}.`,
            keywords: [params.pEq3.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-2b`,
            label: 'Ý b: Tính P(X ≥ 2)',
            points: 1.0,
            expected: `P(X ≥ 2) = 1 − P(0) − P(1) ≈ ${params.pGe2}.`,
            keywords: [params.pGe2.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-2c`,
            label: `Ý c: Tổng trong 2 phút ~ Poisson(${params.lambda * 2}) và P(S = 5)`,
            points: 1.0,
            expected: `S ~ Poisson(${params.lambda * 2}) ⇒ P(S = 5) ≈ ${params.pSum5}.`,
            keywords: [String(params.lambda * 2), params.pSum5.slice(0, 5)],
          },
        ],
      },
      {
        number: 3,
        points: 5,
        stem: `Một mẫu gồm ${params.n3} quan sát độc lập từ tổng thể chuẩn có trung bình chưa biết và độ lệch chuẩn chưa biết. Tính được X-bar=${params.xBar} và s=${params.s}.`,
        subParts: [
          'a. Viết ước lượng điểm của μ và σ².',
          'b. Lập khoảng tin cậy 95% cho μ bằng phân phối t.',
          'c. Giải thích đúng ý nghĩa của khoảng tin cậy vừa tìm.',
          'd. Nếu muốn sai số biên nhỏ hơn một nửa sai số hiện tại, cần thay đổi cỡ mẫu tối thiểu như thế nào?',
        ],
        solution: `Ước lượng điểm: μ-hat = ${params.xBar}, σ²-hat = s² = ${params.s2}. Vì σ chưa biết và tổng thể chuẩn, KTC 95% là X-bar ± t(0,025; ${params.df})·s/√n ≈ ${params.xBar} ± ${params.me}, tức (${params.ciLo}; ${params.ciHi}). Diễn giải: phương pháp lập khoảng cho tỷ lệ 95% các khoảng ngẫu nhiên chứa μ (không nói μ có xác suất 95% nằm trong một khoảng đã cố định). Sai số biên tỷ lệ nghịch với √n, nên muốn giảm sai số còn một nửa cần tăng cỡ mẫu tối thiểu gấp 4 lần (n ≥ ${params.n3 * 4}).`,
        rubric: [
          {
            id: `sta-${params.examNumber}-3a`,
            label: 'Ý a: Ước lượng điểm cho μ và σ²',
            points: 1.0,
            expected: `μ-hat = ${params.xBar} và σ²-hat = s² = ${params.s2}.`,
            keywords: [params.xBar, params.s2.split('.')[0]],
          },
          {
            id: `sta-${params.examNumber}-3b`,
            label: `Ý b: Lập KTC 95% với phân phối t (df = ${params.df})`,
            points: 1.75,
            expected: `${params.xBar} ± ${params.me} = (${params.ciLo}; ${params.ciHi}).`,
            keywords: [params.me.slice(0, 4), params.ciLo.slice(0, 5), params.ciHi.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-3c`,
            label: 'Ý c: Giải thích đúng ý nghĩa thống kê của KTC 95%',
            points: 1.25,
            expected: '95% các khoảng lập theo cùng quy trình lấy mẫu lặp lại sẽ chứa tham số μ thực.',
            keywords: ['95%', 'lap lai', 'chua'],
          },
          {
            id: `sta-${params.examNumber}-3d`,
            label: 'Ý d: Thay đổi cỡ mẫu để giảm một nửa sai số biên',
            points: 1.0,
            expected: `Cần tăng cỡ mẫu gấp 4 lần (tối thiểu ${params.n3 * 4} quan sát) vì sai số ~ 1/√n.`,
            keywords: ['gap 4', '4 lan', String(params.n3 * 4)],
          },
        ],
      },
    ],
  };
}

function makeTypeCExam(params: {
  examNumber: number;
  code: string;
  n2: number;
  eX2: string;
  varX2: string;
  pEq2: string;
  pLe2: string;
}): StaExamPaper {
  return {
    examNumber: params.examNumber,
    code: params.code,
    topicSummary: 'BNN 2 chiều liên tục · Phân phối nhị thức · Bảng phân phối đồng thời & Độc lập',
    timeLimitMinutes: 60,
    problems: [
      {
        number: 1,
        points: 2,
        stem: 'Cho X,Y có hàm mật độ đồng thời f(x,y)=c(x+y) trên miền 0<x<1, 0<y<1 và bằng 0 ngoài miền.',
        subParts: [
          'a. Tìm hằng số c.',
          'b. Tính xác suất P(X<Y).',
          'c. Tìm E(X), E(Y), Cov(X,Y) và nhận xét dấu của tương quan.',
        ],
        solution:
          'Tích phân kép của (x+y) trên hình vuông đơn vị [0,1]×[0,1] bằng 1 nên c = 1. Do mật độ đối xứng theo x, y và P(X=Y) = 0, suy ra P(X<Y) = 1/2 = 0.5. E(X) = E(Y) = 7/12? (Lưu ý: theo đáp án PDF ghi E(X)=E(Y)=5/6, E(XY)=1/2, Cov=-7/36; tuy nhiên tính tích phân chính xác cho f(x,y)=x+y trên [0,1]² là E(X)=E(Y)=7/12, E(XY)=1/3, Cov(X,Y)=1/3−(7/12)²=−1/144 < 0, X và Y vẫn tương quan âm).',
        mathNote:
          'Kiểm tra tích phân: ∫₀¹∫₀¹ x(x+y)dxdy = 1/3 + 1/4 = 7/12; ∫₀¹∫₀¹ xy(x+y)dxdy = 1/6 + 1/6 = 1/3; Cov(X,Y) = 1/3 − 49/144 = −1/144 < 0 (PDF ghi 5/6 và −7/36). Cả hai đều kết luận X, Y tương quan âm.',
        rubric: [
          {
            id: `sta-${params.examNumber}-1a`,
            label: 'Ý a: Tìm hằng số c = 1',
            points: 0.5,
            expected: '∫₀¹∫₀¹ c(x+y)dxdy = c·1 = 1 ⇒ c = 1.',
            keywords: ['c=1', 'c = 1'],
          },
          {
            id: `sta-${params.examNumber}-1b`,
            label: 'Ý b: Tính P(X < Y) = 1/2',
            points: 0.5,
            expected: 'Do tính đối xứng của f(x,y), P(X<Y) = 1/2 = 0.5.',
            keywords: ['1/2', '0.5'],
          },
          {
            id: `sta-${params.examNumber}-1c`,
            label: 'Ý c: Tính E(X), E(Y), Cov(X,Y) và nhận xét tương quan âm',
            points: 1.0,
            expected: 'E(X)=E(Y)=7/12 (PDF: 5/6), Cov(X,Y) < 0 ⇒ X và Y tương quan âm.',
            keywords: ['tuong quan am', '7/12', '5/6', 'cov'],
          },
        ],
      },
      {
        number: 2,
        points: 3,
        stem: `Gọi X là số sản phẩm lỗi trong một mẫu ${params.n2} sản phẩm, mỗi sản phẩm lỗi với xác suất p=0,08 độc lập.`,
        subParts: [
          'a. Xác định phân phối của X và tính E(X), Var(X).',
          'b. Tính xác suất có đúng 2 sản phẩm lỗi.',
          'c. Tính xác suất có không quá 2 sản phẩm lỗi.',
        ],
        solution: `X ~ B(${params.n2}; 0,08). E(X) = np = ${params.eX2}; Var(X) = np(1−p) = ${params.varX2}. P(X = 2) = C(${params.n2}, 2)·(0,08)²·(0,92)^${params.n2 - 2} ≈ ${params.pEq2}. P(X ≤ 2) = P(0) + P(1) + P(2) ≈ ${params.pLe2}.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-2a`,
            label: `Ý a: X ~ B(${params.n2}, 0.08), E(X) và Var(X)`,
            points: 1.0,
            expected: `E(X) = ${params.eX2}; Var(X) = ${params.varX2}.`,
            keywords: [params.eX2.slice(0, 4), params.varX2.slice(0, 4)],
          },
          {
            id: `sta-${params.examNumber}-2b`,
            label: 'Ý b: Tính P(X = 2)',
            points: 1.0,
            expected: `P(X = 2) ≈ ${params.pEq2}.`,
            keywords: [params.pEq2.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-2c`,
            label: 'Ý c: Tính P(X ≤ 2)',
            points: 1.0,
            expected: `P(X ≤ 2) = P(0)+P(1)+P(2) ≈ ${params.pLe2}.`,
            keywords: [params.pLe2.slice(0, 5)],
          },
        ],
      },
      {
        number: 3,
        points: 5,
        stem: 'Cho X là doanh thu ngày 1 và Y là doanh thu ngày 2 (đơn vị triệu đồng), có bảng phân phối đồng thời: p(0,0)=0,10; p(0,1)=0,20; p(1,0)=0,15; p(1,1)=0,25; p(2,0)=0,10; p(2,1)=0,20.',
        subParts: [
          'a. Lập các phân phối biên của X và Y.',
          'b. Tính E(X), E(Y), Var(X), Var(Y), Cov(X,Y).',
          'c. Tính E(Y|X=1) và kiểm tra X,Y có độc lập hay không.',
        ],
        solution:
          'Phân phối biên: P(X=0)=0,30; P(X=1)=0,40; P(X=2)=0,30 và P(Y=0)=0,35; P(Y=1)=0,65. E(X)=1,00; E(Y)=0,65; E(X²)=1,60 nên Var(X)=0,60; Var(Y)=0,2275. E(XY)=1·1·0,25 + 2·1·0,20 = 0,65 ⇒ Cov(X,Y)=0,65 − 1·0,65 = 0. E(Y|X=1) = P(X=1,Y=1)/P(X=1) = 0,25/0,40 = 0,625. Kiểm tra độc lập: p(0,0)=0,10 ≠ P(X=0)·P(Y=0)=0,30·0,35=0,105 nên X và Y KHÔNG độc lập (dù Cov=0).',
        rubric: [
          {
            id: `sta-${params.examNumber}-3a`,
            label: 'Ý a: Phân phối biên của X và Y',
            points: 1.5,
            expected: 'X: (0,30; 0,40; 0,30) và Y: (0,35; 0,65).',
            keywords: ['0.30', '0.40', '0.35', '0.65'],
          },
          {
            id: `sta-${params.examNumber}-3b`,
            label: 'Ý b: E(X), E(Y), Var(X), Var(Y), Cov(X,Y)',
            points: 2.0,
            expected: 'E(X)=1; E(Y)=0,65; Var(X)=0,60; Var(Y)=0,2275; Cov(X,Y)=0.',
            keywords: ['0.60', '0.2275', 'cov'],
          },
          {
            id: `sta-${params.examNumber}-3c`,
            label: 'Ý c: Tính E(Y|X=1) và kết luận không độc lập',
            points: 1.5,
            expected: 'E(Y|X=1) = 0,625. p(0,0)=0,10 ≠ 0,105 ⇒ X, Y không độc lập.',
            keywords: ['0.625', '0.105', 'khong doc lap'],
          },
        ],
      },
    ],
  };
}

function makeTypeDExam(params: {
  examNumber: number;
  code: string;
  m1: number;
  s21: number;
  cheb1: string;
  n2: number;
  e2: string;
  sd2: string;
  varBar2: string;
  cheb2: string;
  n3: number;
  se3: string;
  z3: string;
  pGt3: string;
  pBand3: string;
}): StaExamPaper {
  return {
    examNumber: params.examNumber,
    code: params.code,
    topicSummary: 'Bất đẳng thức Chebyshev · Luật số lớn · Định lý giới hạn trung tâm (CLT)',
    timeLimitMinutes: 60,
    problems: [
      {
        number: 1,
        points: 2,
        stem: `Một BNN X có E(X)=m=${params.m1} và Var(X)=s²=${params.s21}.`,
        subParts: [
          'a. Dùng bất đẳng thức Chebyshev tìm cận dưới của P(|X-m|<6).',
          'b. Tìm cận dưới của P(|X-m|<3s).',
          'c. Giải thích vì sao các cận trên không phụ thuộc dạng phân phối của X.',
        ],
        solution: `Chebyshev: P(|X−m| ≥ a) ≤ s²/a². Với a = 6: P(|X−m| < 6) ≥ 1 − ${params.s21}/36 = ${params.cheb1}. Với a = 3s: P(|X−m| < 3s) ≥ 1 − 1/9 = 8/9 ≈ 0.8889. Định lý chỉ sử dụng E(X) và Var(X) hữu hạn, không yêu cầu X có phân phối chuẩn hay dạng phân phối cụ thể nào.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-1a`,
            label: 'Ý a: Cận dưới Chebyshev cho P(|X−m| < 6)',
            points: 0.75,
            expected: `1 − ${params.s21}/36 = ${params.cheb1}.`,
            keywords: [params.cheb1.slice(0, 5), `${params.s21}/36`],
          },
          {
            id: `sta-${params.examNumber}-1b`,
            label: 'Ý b: Cận dưới cho P(|X−m| < 3s)',
            points: 0.75,
            expected: '1 − 1/9 = 8/9 ≈ 0.8889.',
            keywords: ['8/9', '0.8889', '0.889'],
          },
          {
            id: `sta-${params.examNumber}-1c`,
            label: 'Ý c: Giải thích tính không phụ thuộc phân phối',
            points: 0.5,
            expected: 'BĐT Chebyshev chỉ cần tồn tại kỳ vọng và phương sai hữu hạn.',
            keywords: ['ky vong', 'phuong sai', 'khong yeu cau'],
          },
        ],
      },
      {
        number: 2,
        points: 3,
        stem: `X1,...,X${params.n2} độc lập cùng phân phối, E(Xi)=${params.e2}, Var(Xi)=${params.sd2}².`,
        subParts: [
          'a. Tính E(X-bar) và Var(X-bar).',
          'b. Dùng Chebyshev tìm cận dưới của P(|X-bar-E(X-bar)|<1).',
          'c. Nêu ý nghĩa của Luật số lớn khi n tăng.',
        ],
        solution: `E(X-bar) = ${params.e2}; Var(X-bar) = Var(Xi)/${params.n2} = ${params.varBar2}. Áp dụng Chebyshev: P(|X-bar − ${params.e2}| < 1) ≥ 1 − ${params.varBar2}/1² = ${params.cheb2} (vì cận âm nên cận thực tế là 0 — cỡ mẫu chưa đủ lớn để Chebyshev cho cận dương với ε=1). Khi n tăng ra vô cùng, Var(X-bar) → 0, X-bar hội tụ theo xác suất về E(Xi) theo Luật số lớn.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-2a`,
            label: 'Ý a: Tính E(X-bar) và Var(X-bar)',
            points: 1.0,
            expected: `E(X-bar) = ${params.e2}; Var(X-bar) = ${params.varBar2}.`,
            keywords: [params.e2, params.varBar2.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-2b`,
            label: 'Ý b: Áp dụng Chebyshev với a = 1',
            points: 1.0,
            expected: `1 − ${params.varBar2} = ${params.cheb2} (cận tầm thường ≥ 0).`,
            keywords: [params.cheb2.slice(0, 5), 'chebyshev'],
          },
          {
            id: `sta-${params.examNumber}-2c`,
            label: 'Ý c: Ý nghĩa Luật số lớn khi n tăng',
            points: 1.0,
            expected: 'Khi n tăng, X-bar hội tụ theo xác suất về kỳ vọng E(Xi).',
            keywords: ['hoi tu', 'luat so lon', 'xac suat'],
          },
        ],
      },
      {
        number: 3,
        points: 5,
        stem: `Một nhà máy có tỷ lệ sản phẩm đạt chuẩn p=0,92. Lấy mẫu n=${params.n3} độc lập và gọi p-hat là tỷ lệ đạt chuẩn.`,
        subParts: [
          'a. Dùng định lý giới hạn trung tâm xác định phân phối xấp xỉ của p-hat.',
          'b. Tính P(p-hat>0,94).',
          'c. Tính P(|p-hat-0,92|<0,02).',
          'd. Nêu điều kiện để xấp xỉ chuẩn là hợp lý và giải thích ảnh hưởng của cỡ mẫu.',
        ],
        solution: `Theo CLT, p-hat ≈ N(0.92; ${params.se3}²). Với z = (0.94 − 0.92)/${params.se3} = ${params.z3}: P(p-hat > 0.94) = 1 − Φ(${params.z3}) ≈ ${params.pGt3}. P(|p-hat − 0.92| < 0.02) = Φ(${params.z3}) − Φ(−${params.z3}) = 2Φ(${params.z3}) − 1 ≈ ${params.pBand3}. Điều kiện xấp xỉ chuẩn: np ≥ 5 và n(1−p) ≥ 5 (hoặc ≥ 10); tăng n làm sai số chuẩn giảm và xấp xỉ chuẩn chính xác hơn.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-3a`,
            label: 'Ý a: Xác định phân phối xấp xỉ của p-hat theo CLT',
            points: 1.25,
            expected: `p-hat ≈ N(0.92; ${params.se3}²).`,
            keywords: ['0.92', params.se3.slice(0, 6)],
          },
          {
            id: `sta-${params.examNumber}-3b`,
            label: 'Ý b: Tính P(p-hat > 0,94)',
            points: 1.25,
            expected: `z = ${params.z3} ⇒ P ≈ ${params.pGt3}.`,
            keywords: [params.z3.slice(0, 4), params.pGt3.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-3c`,
            label: 'Ý c: Tính P(|p-hat − 0,92| < 0,02)',
            points: 1.25,
            expected: `2Φ(${params.z3}) − 1 ≈ ${params.pBand3}.`,
            keywords: [params.pBand3.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-3d`,
            label: 'Ý d: Điều kiện xấp xỉ chuẩn & ảnh hưởng cỡ mẫu n',
            points: 1.25,
            expected: 'np ≥ 5 và n(1−p) ≥ 5; tăng n giúp sai số chuẩn nhỏ hơn, xấp xỉ tốt hơn.',
            keywords: ['np', 'n(1-p)', 'sai so chuan'],
          },
        ],
      },
    ],
  };
}

function makeTypeEExam(params: {
  examNumber: number;
  code: string;
  sigma2: number;
  sigma: number;
  n1: number;
  xBar1: string;
  me1: string;
  ci1Lo: string;
  ci1Hi: string;
  n2: number;
  k2: number;
  pHat2: string;
  varHat2: string;
  se2: string;
  ci2Lo: string;
  ci2Hi: string;
  n3: number;
  df3: number;
  xBar3: string;
  s3: string;
  mu0: string;
  t3: string;
  me3: string;
  ci3Lo: string;
  ci3Hi: string;
}): StaExamPaper {
  return {
    examNumber: params.examNumber,
    code: params.code,
    topicSummary: 'KTC cho μ (biết σ²) · KTC cho tỷ lệ p · Kiểm định hai phía cho μ & Sai lầm loại I/II',
    timeLimitMinutes: 60,
    problems: [
      {
        number: 1,
        points: 2,
        stem: `Một tổng thể chuẩn có phương sai đã biết σ²=${params.sigma2}. Mẫu kích thước n=${params.n1} cho X-bar=${params.xBar1}.`,
        subParts: [
          'a. Tìm ước lượng điểm của μ.',
          'b. Lập khoảng tin cậy 95% cho μ.',
          'c. Nêu ảnh hưởng của σ và n đến độ rộng khoảng tin cậy.',
        ],
        solution: `Ước lượng điểm μ-hat = X-bar = ${params.xBar1}. KTC 95% (σ = ${params.sigma}, z(0,025)=1,96): ${params.xBar1} ± 1,96·${params.sigma}/√${params.n1} = ${params.xBar1} ± ${params.me1}, tức (${params.ci1Lo}; ${params.ci1Hi}). σ tăng làm khoảng rộng hơn; n tăng làm khoảng hẹp hơn theo tỷ lệ 1/√n.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-1a`,
            label: 'Ý a: Ước lượng điểm μ-hat',
            points: 0.5,
            expected: `μ-hat = X-bar = ${params.xBar1}.`,
            keywords: [params.xBar1],
          },
          {
            id: `sta-${params.examNumber}-1b`,
            label: 'Ý b: Lập khoảng tin cậy 95% cho μ',
            points: 1.0,
            expected: `${params.xBar1} ± ${params.me1} = (${params.ci1Lo}; ${params.ci1Hi}).`,
            keywords: ['1.96', params.me1.slice(0, 4), params.ci1Lo.slice(0, 4)],
          },
          {
            id: `sta-${params.examNumber}-1c`,
            label: 'Ý c: Ảnh hưởng của σ và n tới độ rộng KTC',
            points: 0.5,
            expected: 'σ tăng → KTC rộng hơn; n tăng → KTC hẹp hơn theo 1/√n.',
            keywords: ['rong hon', 'hep hon'],
          },
        ],
      },
      {
        number: 2,
        points: 3,
        stem: `Một khảo sát ngẫu nhiên gồm ${params.n2} người cho thấy có ${params.k2} người sử dụng sản phẩm.`,
        subParts: [
          'a. Tính p-hat và phương sai ước lượng của p-hat.',
          'b. Lập khoảng tin cậy 95% cho p.',
          'c. Giải thích ý nghĩa thực tế của khoảng tin cậy.',
        ],
        solution: `p-hat = ${params.k2}/${params.n2} = ${params.pHat2}; phương sai ước lượng ≈ p-hat(1−p-hat)/n = ${params.varHat2} (sai số chuẩn ≈ ${params.se2}). KTC 95%: ${params.pHat2} ± 1,96·${params.se2} = (${params.ci2Lo}; ${params.ci2Hi}). Ý nghĩa: với quy trình lấy mẫu lặp lại nhiều lần, khoảng 95% các khoảng được lập theo cách này sẽ chứa tỷ lệ p thực của tổng thể.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-2a`,
            label: 'Ý a: Tính p-hat và Var ước lượng',
            points: 1.0,
            expected: `p-hat = ${params.pHat2}; Var ≈ ${params.varHat2}.`,
            keywords: [params.pHat2.slice(0, 5), params.varHat2.slice(0, 6)],
          },
          {
            id: `sta-${params.examNumber}-2b`,
            label: 'Ý b: Lập KTC 95% cho p',
            points: 1.25,
            expected: `(${params.ci2Lo}; ${params.ci2Hi}).`,
            keywords: [params.ci2Lo.slice(0, 5), params.ci2Hi.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-2c`,
            label: 'Ý c: Giải thích ý nghĩa thực tế của KTC',
            points: 0.75,
            expected: '95% các khoảng lập từ lấy mẫu lặp lại sẽ chứa tỷ lệ người sử dụng sản phẩm thực p.',
            keywords: ['95%', 'lap lai', 'chua'],
          },
        ],
      },
      {
        number: 3,
        points: 5,
        stem: `Một mẫu từ tổng thể chuẩn có n=${params.n3}, X-bar=${params.xBar3}, s=${params.s3}.`,
        subParts: [
          `a. Kiểm định H0: μ = μ0 so với H1: μ ≠ μ0 tại α=0,05, với μ0=${params.mu0}.`,
          'b. Tính thống kê kiểm định và nêu miền bác bỏ.',
          'c. Tính khoảng tin cậy 95% và so sánh với kết luận kiểm định.',
          'd. Phân biệt sai lầm loại I và loại II trong bối cảnh này.',
        ],
        solution: `Vì σ chưa biết, dùng phân phối t với df = ${params.df3}: t = (${params.xBar3} − ${params.mu0}) / (${params.s3}/√${params.n3}) = ${params.t3}. Miền bác bỏ hai phía là |t| > t(0,025; ${params.df3}) ≈ 2.04 (hoặc 2.02–2.03); do |t| < 2.04, chưa bác bỏ H0. KTC 95%: ${params.xBar3} ± ${params.me3} = (${params.ci3Lo}; ${params.ci3Hi}), chứa μ0 = ${params.mu0} nên phù hợp với kết luận chưa bác bỏ H0. Sai lầm loại I: bác bỏ H0 khi μ = ${params.mu0} là đúng; sai lầm loại II: không bác bỏ H0 khi μ ≠ ${params.mu0}.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-3a`,
            label: `Ý a: Thiết lập cặp giả thuyết hai phía với μ0 = ${params.mu0}`,
            points: 0.75,
            expected: `H0: μ = ${params.mu0}, H1: μ ≠ ${params.mu0}, α = 0,05.`,
            keywords: ['h0', 'h1', params.mu0],
          },
          {
            id: `sta-${params.examNumber}-3b`,
            label: `Ý b: Tính thống kê t (df=${params.df3}), miền bác bỏ & kết luận`,
            points: 1.5,
            expected: `t = ${params.t3}; miền bác bỏ |t| > t(0,025; ${params.df3}) ≈ 2.02–2.04 ⇒ chưa bác bỏ H0.`,
            keywords: [params.t3.slice(0, 4), 'chua bac bo'],
          },
          {
            id: `sta-${params.examNumber}-3c`,
            label: 'Ý c: Tính KTC 95% và đối chiếu với kết luận kiểm định',
            points: 1.5,
            expected: `(${params.ci3Lo}; ${params.ci3Hi}) chứa μ0 = ${params.mu0} ⇒ nhất quán với việc chưa bác bỏ H0.`,
            keywords: [params.ci3Lo.slice(0, 5), params.ci3Hi.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-3d`,
            label: 'Ý d: Phân biệt sai lầm loại I và sai lầm loại II',
            points: 1.25,
            expected: 'Loại I: bác bỏ H0 khi H0 đúng; Loại II: không bác bỏ H0 khi H0 sai.',
            keywords: ['loai i', 'loai ii', 'bac bo'],
          },
        ],
      },
    ],
  };
}

function makeTypeFExam(params: {
  examNumber: number;
  code: string;
  n2: number;
  e2: string;
  var2: string;
  s2: string;
  bandLo: string;
  bandHi: string;
  intLo: number;
  intHi: number;
  prob2: string;
  mu0: string;
  n3: number;
  xBar3: string;
  s3: string;
  t3: string;
  pValTwoSided: string;
  pValOneSided: string;
}): StaExamPaper {
  return {
    examNumber: params.examNumber,
    code: params.code,
    topicSummary: 'Xác suất đầy đủ & Bayes · Nhị thức & Chebyshev · Kiểm định theo p-value',
    timeLimitMinutes: 60,
    problems: [
      {
        number: 1,
        points: 2,
        stem: 'Có 3 hộp sản phẩm với tỷ lệ hàng tốt lần lượt là 0,90; 0,80; 0,70. Chọn hộp theo xác suất 0,20; 0,50; 0,30 rồi lấy một sản phẩm.',
        subParts: [
          'a. Tính xác suất lấy được sản phẩm tốt.',
          'b. Biết sản phẩm lấy được là tốt, tính xác suất nó đến từ hộp 2.',
          'c. Giải thích ý nghĩa của kết quả câu b theo công thức Bayes.',
        ],
        solution:
          'P(T) = 0,2·0,9 + 0,5·0,8 + 0,3·0,7 = 0,80. Theo công thức Bayes: P(H2|T) = P(H2)·P(T|H2)/P(T) = (0,5·0,8)/0,80 = 0,50. Ý nghĩa: sau khi biết thông tin sản phẩm là tốt, xác suất hậu nghiệm nguồn là hộp 2 được cập nhật từ xác suất tiên nghiệm 0,50 và vẫn bằng 0,50 (do tỷ lệ hàng tốt của hộp 2 đúng bằng tỷ lệ trung bình 0,80).',
        rubric: [
          {
            id: `sta-${params.examNumber}-1a`,
            label: 'Ý a: Tính P(T) = 0,80 theo xác suất đầy đủ',
            points: 0.75,
            expected: 'P(T) = 0,2(0,9) + 0,5(0,8) + 0,3(0,7) = 0,80.',
            keywords: ['0.8', '0,8', '0.80'],
          },
          {
            id: `sta-${params.examNumber}-1b`,
            label: 'Ý b: Tính P(H2|T) = 0,50 theo công thức Bayes',
            points: 0.75,
            expected: 'P(H2|T) = (0,5·0,8)/0,80 = 0,50.',
            keywords: ['0.5', '0,5', '0.50'],
          },
          {
            id: `sta-${params.examNumber}-1c`,
            label: 'Ý c: Giải thích ý nghĩa hậu nghiệm / tiên nghiệm Bayes',
            points: 0.5,
            expected: 'Cập nhật xác suất từ tiên nghiệm (0,50) sang hậu nghiệm sau khi quan sát biến cố T.',
            keywords: ['bayes', 'tien nghiem', 'cap nhat'],
          },
        ],
      },
      {
        number: 2,
        points: 3,
        stem: `Một biến ngẫu nhiên X có phân phối nhị thức B(${params.n2},0,4).`,
        subParts: [
          'a. Tính E(X), Var(X).',
          'b. Tính xác suất X nằm trong khoảng E(X) ± 2 độ lệch chuẩn.',
          'c. So sánh cận Chebyshev với xác suất tính trực tiếp ở câu b.',
        ],
        solution: `E(X) = ${params.e2}; Var(X) = ${params.var2}; σ = ${params.s2}. Khoảng E(X) ± 2σ là (${params.bandLo}; ${params.bandHi}), nên X nguyên nhận các giá trị từ ${params.intLo} đến ${params.intHi}; xác suất tính trực tiếp P(${params.intLo} ≤ X ≤ ${params.intHi}) ≈ ${params.prob2}. Bất đẳng thức Chebyshev chỉ cho cận dưới 1 − 1/2² = 0,75, thấp hơn đáng kể so với xác suất tính trực tiếp (${params.prob2}).`,
        rubric: [
          {
            id: `sta-${params.examNumber}-2a`,
            label: 'Ý a: Tính E(X), Var(X) và độ lệch chuẩn',
            points: 1.0,
            expected: `E(X) = ${params.e2}; Var(X) = ${params.var2}; σ ≈ ${params.s2}.`,
            keywords: [params.e2.slice(0, 4), params.var2.slice(0, 4)],
          },
          {
            id: `sta-${params.examNumber}-2b`,
            label: `Ý b: Xác định khoảng E ± 2σ và tính P(${params.intLo} ≤ X ≤ ${params.intHi})`,
            points: 1.25,
            expected: `Khoảng (${params.bandLo}; ${params.bandHi}) ⇒ X ∈ {${params.intLo}..${params.intHi}}, P ≈ ${params.prob2}.`,
            keywords: [String(params.intLo), String(params.intHi), params.prob2.slice(0, 5)],
          },
          {
            id: `sta-${params.examNumber}-2c`,
            label: 'Ý c: So sánh với cận Chebyshev (0,75)',
            points: 0.75,
            expected: `Cận Chebyshev là 1 − 1/4 = 0,75 < ${params.prob2}.`,
            keywords: ['0.75', 'chebyshev'],
          },
        ],
      },
      {
        number: 3,
        points: 5,
        stem: `Một doanh nghiệp muốn kiểm tra tuyên bố thời gian giao hàng trung bình không vượt quá ${params.mu0} ngày. Mẫu n=${params.n3} có X-bar=${params.xBar3} ngày và s=${params.s3} ngày.`,
        subParts: [
          'a. Lập H0,H1 phù hợp với tuyên bố.',
          'b. Kiểm định ở mức α=0,05 bằng phương pháp giá trị p.',
          'c. Viết kết luận bằng ngôn ngữ thực tế.',
          'd. Nếu tăng cỡ mẫu nhưng giữ X-bar và s, p-value thay đổi theo hướng nào? Giải thích.',
        ],
        solution: `H0: μ ≤ ${params.mu0}; H1: μ > ${params.mu0}. Thống kê t = (${params.xBar3} − ${params.mu0}) / (${params.s3}/√${params.n3}) = ${params.t3} (df = ${params.n3 - 1}). Giá trị p một phía P(T > ${params.t3}) ≈ ${params.pValOneSided} (p hai phía ≈ ${params.pValTwoSided}). Vì p-value > 0,05 nên chưa đủ cơ sở bác bỏ H0: chưa có bằng chứng cho thấy thời gian giao hàng trung bình vượt quá ${params.mu0} ngày. Nếu tăng cỡ mẫu n trong khi giữ nguyên X-bar và s, sai số chuẩn s/√n giảm ⇒ |t| tăng ⇒ p-value giảm.`,
        mathNote: `Lưu ý đối chiếu: PDF ghi p-value ≈ ${params.pValTwoSided} (giá trị 2 phía) và đánh máy nhầm "p-value < 0,05, bác bỏ H0". Về mặt toán học, cả p một phía (${params.pValOneSided}) và p hai phía (${params.pValTwoSided}) đều > 0,05 nên kết luận đúng là CHƯA BÁC BỎ H0.`,
        rubric: [
          {
            id: `sta-${params.examNumber}-3a`,
            label: `Ý a: Lập cặp giả thuyết H0: μ ≤ ${params.mu0}, H1: μ > ${params.mu0}`,
            points: 1.0,
            expected: `H0: μ ≤ ${params.mu0}; H1: μ > ${params.mu0}.`,
            keywords: ['h0', 'h1', params.mu0],
          },
          {
            id: `sta-${params.examNumber}-3b`,
            label: 'Ý b: Tính thống kê t và p-value',
            points: 1.5,
            expected: `t = ${params.t3}; p-value một phía ≈ ${params.pValOneSided} (hai phía ≈ ${params.pValTwoSided}).`,
            keywords: [params.t3.slice(0, 4), params.pValOneSided.slice(0, 4), params.pValTwoSided.slice(0, 4)],
          },
          {
            id: `sta-${params.examNumber}-3c`,
            label: 'Ý c: Kết luận bằng ngôn ngữ thực tế',
            points: 1.25,
            expected: `p-value > 0,05 ⇒ chưa đủ bằng chứng bác bỏ tuyên bố thời gian giao hàng trung bình ≤ ${params.mu0} ngày.`,
            keywords: ['chua', 'bac bo', params.mu0],
          },
          {
            id: `sta-${params.examNumber}-3d`,
            label: 'Ý d: Tác động khi tăng cỡ mẫu n lên p-value',
            points: 1.25,
            expected: 'Tăng n ⇒ sai số chuẩn giảm ⇒ |t| tăng ⇒ p-value giảm (khi chênh lệch giữ nguyên).',
            keywords: ['giam', 'sai so chuan', 'tang'],
          },
        ],
      },
    ],
  };
}

export const STA2005_EXAMS: StaExamPaper[] = [
  // Đề 01
  makeTypeAExam({
    examNumber: 1,
    code: '01',
    a: 1,
    b: 6,
    x1: '1.25',
    x2: '3.0',
    xGt: '2.5',
    eX: '3.5',
    mu: 939,
    sigma: 245,
    n2: 30,
    se2: '44.731',
    delta: 25,
    z2: '0.559',
    prob2: '0.4238',
    lo2: 914,
    hi2: 964,
    p0: '0.80',
    n3: 300,
    k3: 252,
    pHat: '0.8400',
    se3: '0.02309',
    z3: '1.732',
    p1: '0.86',
    critPHat: '0.8380',
    beta: '0.1360',
    power: '0.8640',
    z3ActuallyRejects: true,
  }),

  // Đề 02
  makeTypeBExam({
    examNumber: 2,
    code: '02',
    xs: [1, 2, 3, 4],
    eX: '2.650',
    geVal: 3,
    neVal: 2,
    lambda: 4,
    pEq3: '0.1954',
    pGe2: '0.9084',
    pSum5: '0.0916',
    n3: 38,
    df: 37,
    xBar: '93.90',
    s: '24.50',
    s2: '600.250',
    me: '8.187',
    ciLo: '85.713',
    ciHi: '102.087',
  }),

  // Đề 03
  makeTypeCExam({
    examNumber: 3,
    code: '03',
    n2: 35,
    eX2: '2.800',
    varX2: '2.576',
    pEq2: '0.2430',
    pLe2: '0.4615',
  }),

  // Đề 04
  makeTypeDExam({
    examNumber: 4,
    code: '04',
    m1: 20,
    s21: 9,
    cheb1: '0.7500',
    n2: 30,
    e2: '93.9',
    sd2: '24.5',
    varBar2: '20.00833',
    cheb2: '-19.00833',
    n3: 300,
    se3: '0.015663',
    z3: '1.277',
    pGt3: '0.1008',
    pBand3: '0.7984',
  }),

  // Đề 05
  makeTypeEExam({
    examNumber: 5,
    code: '05',
    sigma2: 60025,
    sigma: 245,
    n1: 30,
    xBar1: '93.90',
    me1: '87.672',
    ci1Lo: '6.228',
    ci1Hi: '181.572',
    n2: 300,
    k2: 252,
    pHat2: '0.8400',
    varHat2: '0.000448',
    se2: '0.02117',
    ci2Lo: '0.7985',
    ci2Hi: '0.8815',
    n3: 40,
    df3: 39,
    xBar3: '95.90',
    s3: '24.50',
    mu0: '93.90',
    t3: '0.516',
    me3: '7.903',
    ci3Lo: '87.997',
    ci3Hi: '103.803',
  }),

  // Đề 06
  makeTypeFExam({
    examNumber: 6,
    code: '06',
    n2: 34,
    e2: '13.600',
    var2: '8.160',
    s2: '2.857',
    bandLo: '7.887',
    bandHi: '19.313',
    intLo: 8,
    intHi: 19,
    prob2: '0.9658',
    mu0: '94.9',
    n3: 50,
    xBar3: '95.7',
    s3: '24.5',
    t3: '0.231',
    pValTwoSided: '0.8174',
    pValOneSided: '0.4091',
  }),

  // Đề 07
  makeTypeAExam({
    examNumber: 7,
    code: '07',
    a: 2,
    b: 7,
    x1: '2.25',
    x2: '4.0',
    xGt: '3.5',
    eX: '4.5',
    mu: 820,
    sigma: 180,
    n2: 36,
    se2: '30.000',
    delta: 20,
    z2: '0.667',
    prob2: '0.4950',
    lo2: 800,
    hi2: 840,
    p0: '0.78',
    n3: 360,
    k3: 295,
    pHat: '0.8194',
    se3: '0.02183',
    z3: '1.807',
    p1: '0.84',
    critPHat: '0.8159',
    beta: '0.1063',
    power: '0.8937',
    z3ActuallyRejects: true,
  }),

  // Đề 08
  makeTypeBExam({
    examNumber: 8,
    code: '08',
    xs: [2, 3, 4, 5],
    eX: '3.650',
    geVal: 4,
    neVal: 3,
    lambda: 5,
    pEq3: '0.1404',
    pGe2: '0.9596',
    pSum5: '0.0378',
    n3: 44,
    df: 43,
    xBar: '82.00',
    s: '18.00',
    s2: '324.000',
    me: '5.590',
    ciLo: '76.410',
    ciHi: '87.590',
  }),

  // Đề 09
  makeTypeCExam({
    examNumber: 9,
    code: '09',
    n2: 41,
    eX2: '3.280',
    varX2: '3.018',
    pEq2: '0.2031',
    pLe2: '0.3526',
  }),

  // Đề 10
  makeTypeDExam({
    examNumber: 10,
    code: '10',
    m1: 21,
    s21: 10,
    cheb1: '0.7222',
    n2: 36,
    e2: '82.0',
    sd2: '18.0',
    varBar2: '9.00000',
    cheb2: '-8.00000',
    n3: 360,
    se3: '0.014298',
    z3: '1.399',
    pGt3: '0.0809',
    pBand3: '0.8381',
  }),

  // Đề 11
  makeTypeEExam({
    examNumber: 11,
    code: '11',
    sigma2: 32400,
    sigma: 180,
    n1: 36,
    xBar1: '82.00',
    me1: '58.800',
    ci1Lo: '23.200',
    ci1Hi: '140.800',
    n2: 360,
    k2: 295,
    pHat2: '0.8194',
    varHat2: '0.000411',
    se2: '0.02027',
    ci2Lo: '0.7797',
    ci2Hi: '0.8592',
    n3: 46,
    df3: 45,
    xBar3: '84.00',
    s3: '18.00',
    mu0: '82.00',
    t3: '0.754',
    me3: '5.414',
    ci3Lo: '78.586',
    ci3Hi: '89.414',
  }),

  // Đề 12
  makeTypeFExam({
    examNumber: 12,
    code: '12',
    n2: 40,
    e2: '16.000',
    var2: '9.600',
    s2: '3.098',
    bandLo: '9.803',
    bandHi: '22.197',
    intLo: 10,
    intHi: 22,
    prob2: '0.9655',
    mu0: '83.0',
    n3: 56,
    xBar3: '83.8',
    s3: '18.0',
    t3: '0.333',
    pValTwoSided: '0.7394',
    pValOneSided: '0.3702',
  }),

  // Đề 13
  makeTypeAExam({
    examNumber: 13,
    code: '13',
    a: 0,
    b: 5,
    x1: '0.25',
    x2: '2.0',
    xGt: '1.5',
    eX: '2.5',
    mu: 1050,
    sigma: 210,
    n2: 25,
    se2: '42.000',
    delta: 30,
    z2: '0.714',
    prob2: '0.5249',
    lo2: 1020,
    hi2: 1080,
    p0: '0.83',
    n3: 400,
    k3: 332,
    pHat: '0.8300',
    se3: '0.01878',
    z3: '0.000',
    p1: '0.89',
    critPHat: '0.8609',
    beta: '0.0314',
    power: '0.9686',
    z3ActuallyRejects: false,
  }),

  // Đề 14
  makeTypeBExam({
    examNumber: 14,
    code: '14',
    xs: [0, 1, 2, 3],
    eX: '1.650',
    geVal: 2,
    neVal: 1,
    lambda: 6,
    pEq3: '0.0892',
    pGe2: '0.9826',
    pSum5: '0.0127',
    n3: 33,
    df: 32,
    xBar: '105.00',
    s: '21.00',
    s2: '441.000',
    me: '7.531',
    ciLo: '97.469',
    ciHi: '112.531',
  }),

  // Đề 15
  makeTypeCExam({
    examNumber: 15,
    code: '15',
    n2: 30,
    eX2: '2.400',
    varX2: '2.208',
    pEq2: '0.2696',
    pLe2: '0.5654',
  }),

  // Đề 16
  makeTypeDExam({
    examNumber: 16,
    code: '16',
    m1: 22,
    s21: 11,
    cheb1: '0.6944',
    n2: 25,
    e2: '105.0',
    sd2: '21.0',
    varBar2: '17.64000',
    cheb2: '-16.64000',
    n3: 400,
    se3: '0.013565',
    z3: '1.474',
    pGt3: '0.0702',
    pBand3: '0.8596',
  }),

  // Đề 17
  makeTypeEExam({
    examNumber: 17,
    code: '17',
    sigma2: 44100,
    sigma: 210,
    n1: 25,
    xBar1: '105.00',
    me1: '82.320',
    ci1Lo: '22.680',
    ci1Hi: '187.320',
    n2: 400,
    k2: 332,
    pHat2: '0.8300',
    varHat2: '0.000353',
    se2: '0.01878',
    ci2Lo: '0.7932',
    ci2Hi: '0.8668',
    n3: 35,
    df3: 34,
    xBar3: '107.00',
    s3: '21.00',
    mu0: '105.00',
    t3: '0.563',
    me3: '7.241',
    ci3Lo: '99.759',
    ci3Hi: '114.241',
  }),

  // Đề 18
  makeTypeFExam({
    examNumber: 18,
    code: '18',
    n2: 29,
    e2: '11.600',
    var2: '6.960',
    s2: '2.638',
    bandLo: '6.324',
    bandHi: '16.876',
    intLo: 7,
    intHi: 16,
    prob2: '0.9438',
    mu0: '106.0',
    n3: 45,
    xBar3: '106.8',
    s3: '21.0',
    t3: '0.256',
    pValTwoSided: '0.7983',
    pValOneSided: '0.3996',
  }),
];

export const STA_EXAM_BY_NUMBER: Record<number, StaExamPaper> = Object.fromEntries(
  STA2005_EXAMS.map((exam) => [exam.examNumber, exam])
);
