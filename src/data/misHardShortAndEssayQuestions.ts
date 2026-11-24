import { EssayQuestion, ShortAnswerQuestion } from '../types/exam';

/**
 * Bộ đề ôn tập Hệ thống thông tin quản lý (MIS2002) – BỘ 2 (MỨC ĐỘ KHÓ)
 * Phần II: 30 câu tự luận ngắn – điền khuyết (IDs 2101–2130, tương ứng Câu 101–130)
 */
export const HARD_SHORT_ANSWER_QUESTIONS: ShortAnswerQuestion[] = [
  {
    id: 2101,
    type: 'short',
    chapter: 1,
    segments: [
      'Công nghệ kết hợp dữ liệu từ nhiều nguồn để tìm mối quan hệ không rõ ràng giữa các cá nhân có viết tắt là ',
      '.',
    ],
    blanks: [
      {
        display: 'NORA',
        accepted: ['NORA', 'Nonobvious Relationship Awareness'],
      },
    ],
    officialAnswer: 'NORA (Nonobvious Relationship Awareness)',
    points: 2,
  },
  {
    id: 2102,
    type: 'short',
    chapter: 1,
    segments: [
      'Nguyên tắc “hành động không thể lặp lại nhiều lần thì không nên thực hiện lần nào” là Quy tắc thay đổi của ',
      '.',
    ],
    blanks: [
      {
        display: 'Descartes',
        accepted: ['Descartes', 'Rene Descartes', 'René Descartes'],
      },
    ],
    officialAnswer: 'Descartes',
    points: 2,
  },
  {
    id: 2103,
    type: 'short',
    chapter: 2,
    segments: [
      'Chi phí khách hàng phải chịu do mất thời gian và nguồn lực khi đổi nhà cung cấp gọi là chi phí ',
      '.',
    ],
    blanks: [
      {
        display: 'chuyển đổi',
        accepted: ['chuyển đổi', 'switching costs', 'switching cost', 'chi phí chuyển đổi'],
      },
    ],
    officialAnswer: 'Chuyển đổi (switching costs)',
    points: 2,
  },
  {
    id: 2104,
    type: 'short',
    chapter: 2,
    segments: [
      'Thuyết ',
      ' giải thích CNTT làm giảm chi phí tham gia thị trường nên doanh nghiệp có xu hướng thuê ngoài.',
    ],
    blanks: [
      {
        display: 'chi phí giao dịch',
        accepted: ['chi phí giao dịch', 'transaction cost', 'transaction cost theory'],
      },
    ],
    officialAnswer: 'Chi phí giao dịch',
    points: 2,
  },
  {
    id: 2105,
    type: 'short',
    chapter: 2,
    segments: [
      'Hoạt động hỗ trợ của chuỗi giá trị gồm: hạ tầng doanh nghiệp, ',
      ', công nghệ và mua sắm.',
    ],
    blanks: [
      {
        display: 'quản trị nguồn nhân lực',
        accepted: [
          'quản trị nguồn nhân lực',
          'nguồn nhân lực',
          'quản lý nguồn nhân lực',
          'nhân lực',
          'nhân sự',
          'quản trị nhân lực',
          'hrm',
        ],
      },
    ],
    officialAnswer: 'Quản trị nguồn nhân lực',
    points: 2,
  },
  {
    id: 2106,
    type: 'short',
    chapter: 2,
    segments: [
      'Mạng nội bộ dùng công nghệ Web chỉ dành cho nhân viên của doanh nghiệp gọi là ',
      '.',
    ],
    blanks: [
      {
        display: 'Intranet',
        accepted: ['Intranet', 'mạng intranet'],
      },
    ],
    officialAnswer: 'Intranet',
    points: 2,
  },
  {
    id: 2107,
    type: 'short',
    chapter: 2,
    segments: ['Báo cáo chỉ liệt kê các trường hợp sai lệch so với chuẩn gọi là báo cáo ', '.'],
    blanks: [
      {
        display: 'ngoại lệ',
        accepted: ['ngoại lệ', 'báo cáo ngoại lệ', 'exception', 'exception report'],
      },
    ],
    officialAnswer: 'Ngoại lệ',
    points: 2,
  },
  {
    id: 2108,
    type: 'short',
    chapter: 3,
    segments: [
      'Chiến lược chuyển đổi hệ thống có rủi ro thấp nhất nhưng chi phí cao nhất là chuyển đổi ',
      '.',
    ],
    blanks: [
      {
        display: 'song song',
        accepted: ['song song', 'chuyển đổi song song', 'parallel', 'parallel strategy'],
      },
    ],
    officialAnswer: 'Song song',
    points: 2,
  },
  {
    id: 2109,
    type: 'short',
    chapter: 3,
    segments: [
      'Kiểm thử cuối cùng gồm Alpha và Beta, xác nhận hệ thống sẵn sàng sử dụng, gọi là kiểm thử ',
      '.',
    ],
    blanks: [
      {
        display: 'chấp nhận',
        accepted: ['chấp nhận', 'kiểm thử chấp nhận', 'acceptance', 'acceptance testing'],
      },
    ],
    officialAnswer: 'Chấp nhận',
    points: 2,
  },
  {
    id: 2110,
    type: 'short',
    chapter: 3,
    segments: ['Trong BPM, bước ngay sau thiết kế quy trình mới là ', ' quy trình mới.'],
    blanks: [
      {
        display: 'triển khai',
        accepted: ['triển khai', 'thực hiện', 'triển khai thực hiện', 'implement'],
      },
    ],
    officialAnswer: 'Triển khai (thực hiện)',
    points: 2,
  },
  {
    id: 2111,
    type: 'short',
    chapter: 3,
    segments: [
      'Phương pháp phát triển chia dự án thành các chu kỳ ngắn, lặp lại và phản hồi liên tục gọi là phương pháp ',
      '.',
    ],
    blanks: [
      {
        display: 'Agile',
        accepted: ['Agile', 'linh hoạt', 'phát triển linh hoạt', 'agile linh hoạt'],
      },
    ],
    officialAnswer: 'Agile (linh hoạt)',
    points: 2,
  },
  {
    id: 2112,
    type: 'short',
    chapter: 3,
    segments: [
      'Hình thức phát triển cho phép người dùng tạo ứng dụng bằng giao diện kéo–thả mà không cần viết mã gọi là ',
      '.',
    ],
    blanks: [
      {
        display: 'No-code',
        accepted: ['no-code', 'nocode', 'no code', 'không mã'],
      },
    ],
    officialAnswer: 'No-code',
    points: 2,
  },
  {
    id: 2113,
    type: 'short',
    chapter: 4,
    segments: ['Trong CSDL quan hệ, mỗi hàng của bảng là một ', ', mỗi cột là một ', '.'],
    blanks: [
      {
        display: 'bản ghi (record)',
        accepted: ['bản ghi', 'record', 'bản ghi record', 'tuple'],
      },
      {
        display: 'trường (field)',
        accepted: ['trường', 'field', 'trường field', 'thuộc tính', 'attribute'],
      },
    ],
    officialAnswer: 'Bản ghi (record); trường (field)',
    points: 2,
  },
  {
    id: 2114,
    type: 'short',
    chapter: 4,
    segments: ['Công cụ phân tích dữ liệu đa chiều có tên viết tắt là ', '.'],
    blanks: [
      {
        display: 'OLAP',
        accepted: ['OLAP', 'Online Analytical Processing'],
      },
    ],
    officialAnswer: 'OLAP',
    points: 2,
  },
  {
    id: 2115,
    type: 'short',
    chapter: 4,
    segments: ['Hadoop gồm hệ thống tập tin phân tán HDFS và mô hình xử lý ', '.'],
    blanks: [
      {
        display: 'MapReduce',
        accepted: ['MapReduce', 'map reduce'],
      },
    ],
    officialAnswer: 'MapReduce',
    points: 2,
  },
  {
    id: 2116,
    type: 'short',
    chapter: 4,
    segments: ['Năm đặc điểm của dữ liệu lớn: Volume, Variety, Velocity, ', ', Value.'],
    blanks: [
      {
        display: 'Veracity',
        accepted: ['Veracity', 'độ tin cậy', 'tính xác thực'],
      },
    ],
    officialAnswer: 'Veracity',
    points: 2,
  },
  {
    id: 2117,
    type: 'short',
    chapter: 4,
    segments: [
      'Mô hình đám mây cung cấp nền tảng để phát triển và triển khai ứng dụng gọi là ',
      '.',
    ],
    blanks: [
      {
        display: 'PaaS',
        accepted: ['PaaS', 'Platform as a Service'],
      },
    ],
    officialAnswer: 'PaaS',
    points: 2,
  },
  {
    id: 2118,
    type: 'short',
    chapter: 4,
    segments: ['Hiện tượng mô hình AI đưa ra thông tin sai nhưng có vẻ thuyết phục gọi là ', '.'],
    blanks: [
      {
        display: 'Hallucination',
        accepted: ['Hallucination', 'ảo giác', 'ảo giác ai', 'hallucinations'],
      },
    ],
    officialAnswer: 'Hallucination (ảo giác)',
    points: 2,
  },
  {
    id: 2119,
    type: 'short',
    chapter: 5,
    segments: [
      'Hệ thống quản lý luồng sản phẩm qua trung tâm phân phối và kho hàng gọi là hệ thống ',
      ' chuỗi cung ứng.',
    ],
    blanks: [
      {
        display: 'thực thi',
        accepted: ['thực thi', 'execution', 'supply chain execution'],
      },
    ],
    officialAnswer: 'Thực thi',
    points: 2,
  },
  {
    id: 2120,
    type: 'short',
    chapter: 5,
    segments: ['Khối lượng hàng dự trữ để bù đắp sự bất ổn trong chuỗi cung ứng gọi là tồn kho ', '.'],
    blanks: [
      {
        display: 'an toàn',
        accepted: ['an toàn', 'tồn kho an toàn', 'safety stock'],
      },
    ],
    officialAnswer: 'An toàn',
    points: 2,
  },
  {
    id: 2121,
    type: 'short',
    chapter: 5,
    segments: [
      'Mô hình chuỗi cung ứng sản xuất dựa vào đơn đặt hàng thực tế là mô hình ',
      '.',
    ],
    blanks: [
      {
        display: 'kéo',
        accepted: ['kéo', 'mô hình kéo', 'pull', 'pull-based', 'pull based'],
      },
    ],
    officialAnswer: 'Kéo (Pull-based)',
    points: 2,
  },
  {
    id: 2122,
    type: 'short',
    chapter: 5,
    segments: [
      'Số lượng khách hàng ngừng sử dụng hoặc mua sản phẩm/dịch vụ của một công ty được đo bằng tỷ lệ ',
      '.',
    ],
    blanks: [
      {
        display: 'rời bỏ',
        accepted: ['rời bỏ', 'churn', 'churn rate', 'tỷ lệ rời bỏ'],
      },
    ],
    officialAnswer: 'Rời bỏ (churn rate)',
    points: 2,
  },
  {
    id: 2123,
    type: 'short',
    chapter: 5,
    segments: ['ERM là viết tắt của Employee ', ' Management.'],
    blanks: [
      {
        display: 'Relationship',
        accepted: ['Relationship'],
      },
    ],
    officialAnswer: 'Relationship',
    points: 2,
  },
  {
    id: 2124,
    type: 'short',
    chapter: 5,
    segments: [
      'Mọi phương thức tương tác giữa doanh nghiệp và khách hàng (điện thoại, e-mail, website, cửa hàng) gọi là ',
      ' khách hàng.',
    ],
    blanks: [
      {
        display: 'điểm tiếp xúc',
        accepted: ['điểm tiếp xúc', 'điểm chạm', 'touch point', 'touchpoint'],
      },
    ],
    officialAnswer: 'Điểm tiếp xúc',
    points: 2,
  },
  {
    id: 2125,
    type: 'short',
    chapter: 6,
    segments: [
      'Tính năng TMĐT cho phép giao tiếp hai chiều giữa doanh nghiệp và khách hàng là tính ',
      '.',
    ],
    blanks: [
      {
        display: 'tương tác',
        accepted: ['tương tác', 'tính tương tác', 'interactivity'],
      },
    ],
    officialAnswer: 'Tương tác',
    points: 2,
  },
  {
    id: 2126,
    type: 'short',
    chapter: 6,
    segments: [
      'Mô hình doanh thu thu phí định kỳ để truy cập nội dung/dịch vụ (như Netflix) gọi là doanh thu ',
      '.',
    ],
    blanks: [
      {
        display: 'đăng ký',
        accepted: ['đăng ký', 'subscription', 'thuê bao', 'đăng ký subscription'],
      },
    ],
    officialAnswer: 'Đăng ký (subscription)',
    points: 2,
  },
  {
    id: 2127,
    type: 'short',
    chapter: 6,
    segments: ['Sàn giao dịch B2B tập hợp nhiều người mua và bán gọi là ', ' (Net marketplace).'],
    blanks: [
      {
        display: 'sàn giao dịch B2B / chợ điện tử',
        accepted: [
          'sàn giao dịch b2b',
          'chợ điện tử',
          'sàn giao dịch điện tử',
          'thị trường mạng',
          'net marketplace',
          'sàn b2b',
        ],
      },
    ],
    officialAnswer: 'Sàn giao dịch B2B / Chợ điện tử',
    points: 2,
  },
  {
    id: 2128,
    type: 'short',
    chapter: 7,
    segments: [
      'Quyết định mà tiêu chuẩn, dữ liệu và thủ tục xử lý đều rõ ràng gọi là quyết định ',
      ' cấu trúc.',
    ],
    blanks: [
      {
        display: 'có',
        accepted: ['có', 'có cấu trúc', 'structured'],
      },
    ],
    officialAnswer: 'Có',
    points: 2,
  },
  {
    id: 2129,
    type: 'short',
    chapter: 7,
    segments: ['Vai trò “Xử lý khủng hoảng” của Mintzberg thuộc nhóm vai trò ', '.'],
    blanks: [
      {
        display: 'ra quyết định',
        accepted: ['ra quyết định', 'decisional', 'decisional roles', 'quyết định'],
      },
    ],
    officialAnswer: 'Ra quyết định (Decisional roles)',
    points: 2,
  },
  {
    id: 2130,
    type: 'short',
    chapter: 7,
    segments: [
      'Quản lý hiệu quả kinh doanh (BPM) chuyển chiến lược thành mục tiêu hoạt động và đo bằng các chỉ số hiệu suất chính, viết tắt là ',
      '.',
    ],
    blanks: [
      {
        display: 'KPI',
        accepted: ['KPI', 'KPIs', 'Key Performance Indicators', 'Key Performance Indicator'],
      },
    ],
    officialAnswer: 'KPI (Key Performance Indicators)',
    points: 2,
  },
];

/**
 * Bộ đề ôn tập Hệ thống thông tin quản lý (MIS2002) – BỘ 2 (MỨC ĐỘ KHÓ)
 * Phần III: 10 câu tự luận (IDs 2131–2140, tương ứng Câu 131–140)
 */
export const HARD_ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: 2131,
    type: 'essay',
    chapter: 5,
    prompt:
      'Một chuỗi bán lẻ có 50 cửa hàng gặp ba vấn đề: tồn kho lúc dư lúc thiếu, dữ liệu khách hàng phân tán ở nhiều hệ thống, báo cáo tổng hợp chậm. Hãy đề xuất các hệ thống ứng dụng (ERP, SCM, CRM, BI) phù hợp, giải thích mỗi hệ thống giải quyết vấn đề nào và nêu các thách thức khi triển khai.',
    modelAnswerBullets: [
      'Tồn kho lúc dư lúc thiếu → SCM (lập kế hoạch nhu cầu, tối ưu nguồn cung, thiết lập mức tồn kho; thực thi luồng hàng qua kho/trung tâm phân phối; chia sẻ dữ liệu nhu cầu thật để giảm Bullwhip; mô hình kéo/JIT, tồn kho an toàn hợp lý).',
      'Dữ liệu khách hàng phân tán → CRM (tích hợp dữ liệu từ các điểm tiếp xúc, CRM vận hành cho bán hàng/dịch vụ/tiếp thị, CRM phân tích để tính CLTV, giảm tỷ lệ rời bỏ).',
      'Quy trình rời rạc giữa các phòng ban → ERP (module tích hợp, một CSDL trung tâm, quy trình chuẩn theo thực hành tốt nhất).',
      'Báo cáo chậm → BI/BA (dashboard, báo cáo tham số hóa, truy vấn ad hoc, drill down, dự báo) dựa trên kho dữ liệu.',
      'Thách thức: chi phí cao, thời gian triển khai dài, thay đổi quy trình và công nghệ, chi phí chuyển đổi/phụ thuộc nhà cung cấp, yêu cầu chuẩn hóa và làm sạch dữ liệu, kháng cự thay đổi, cần đào tạo.',
    ],
    rubric: [
      {
        id: 'h131-1',
        label: 'SCM giải quyết vấn đề tồn kho',
        detail: 'Lập kế hoạch & thực thi chuỗi cung ứng, chia sẻ nhu cầu thực giảm Bullwhip, mô hình kéo/JIT, tồn kho an toàn.',
        keywords: ['scm', 'bullwhip', 'jit', 'tồn kho an toàn', 'mô hình kéo'],
      },
      {
        id: 'h131-2',
        label: 'CRM giải quyết dữ liệu khách hàng phân tán',
        detail: 'Tích hợp điểm tiếp xúc, CRM vận hành và CRM phân tích (CLTV, giảm rời bỏ).',
        keywords: ['crm', 'điểm tiếp xúc', 'cltv', 'vận hành', 'phân tích'],
      },
      {
        id: 'h131-3',
        label: 'ERP tích hợp quy trình & CSDL trung tâm',
        detail: 'Dùng một CSDL duy nhất giữa các phòng ban theo thực hành tốt nhất.',
        keywords: ['erp', 'csdl', 'cơ sở dữ liệu', 'tích hợp', 'quy trình'],
      },
      {
        id: 'h131-4',
        label: 'BI/BA giải quyết báo cáo chậm',
        detail: 'Dashboard, báo cáo tham số hóa, ad hoc, drill down, dự báo từ kho dữ liệu.',
        keywords: ['bi', 'dashboard', 'drill down', 'kho dữ liệu', 'ad hoc'],
      },
      {
        id: 'h131-5',
        label: 'Thách thức triển khai',
        detail: 'Chi phí cao, thời gian dài, làm sạch dữ liệu, phụ thuộc nhà cung cấp, kháng cự thay đổi, đào tạo.',
        keywords: ['chi phí', 'làm sạch', 'kháng cự', 'đào tạo', 'phụ thuộc'],
      },
    ],
    points: 4,
  },
  {
    id: 2132,
    type: 'essay',
    chapter: 3,
    prompt:
      'Phân biệt bốn hình thức thay đổi tổ chức do CNTT (tự động hóa, hợp lý hóa quy trình, tái thiết kế quy trình, chuyển đổi mô hình). Với cùng một doanh nghiệp (ví dụ một ngân hàng), hãy nêu ví dụ cho từng hình thức và so sánh mức độ rủi ro.',
    modelAnswerBullets: [
      'Tự động hóa: thay công việc thủ công bằng máy tính (nhập hồ sơ vay trên hệ thống thay cho sổ giấy) – rủi ro thấp nhất.',
      'Hợp lý hóa quy trình: tinh gọn thủ tục, loại bỏ nút thắt sau tự động hóa (rút 5 cấp duyệt còn 2); gắn với TQM, Six Sigma.',
      'Tái thiết kế quy trình: phân tích, đơn giản hóa và thiết kế lại luồng công việc (xử lý hồ sơ vay trực tuyến từ đầu đến cuối, loại bỏ các bước lặp).',
      'Chuyển đổi mô hình: thay đổi bản chất doanh nghiệp (ngân hàng số hoàn toàn, không chi nhánh) – rủi ro cao nhất, lợi ích tiềm năng lớn nhất.',
      'Rủi ro tăng dần theo thứ tự: tự động hóa → hợp lý hóa → tái thiết kế → chuyển đổi mô hình.',
    ],
    rubric: [
      {
        id: 'h132-1',
        label: 'Tự động hóa + ví dụ ngân hàng',
        detail: 'Thay công việc thủ công bằng máy tính (VD: nhập hồ sơ vay trên hệ thống).',
        keywords: ['tự động hóa', 'thủ công', 'hồ sơ'],
      },
      {
        id: 'h132-2',
        label: 'Hợp lý hóa quy trình + ví dụ',
        detail: 'Tinh gọn thủ tục, loại bỏ nút thắt cổ chai (rút cấp duyệt), gắn TQM/Six Sigma.',
        keywords: ['hợp lý hóa', 'nút thắt', 'tqm', 'six sigma', 'tinh gọn'],
      },
      {
        id: 'h132-3',
        label: 'Tái thiết kế quy trình (BPR) + ví dụ',
        detail: 'Thiết kế lại toàn bộ luồng công việc, loại bỏ bước lặp (xử lý hồ sơ vay trực tuyến đầu-cuối).',
        keywords: ['tái thiết kế', 'luồng công việc', 'bước lặp', 'trực tuyến'],
      },
      {
        id: 'h132-4',
        label: 'Chuyển đổi mô hình + so sánh rủi ro',
        detail: 'Thay đổi bản chất doanh nghiệp (ngân hàng số hoàn toàn); rủi ro và lợi ích tăng dần từ tự động hóa → chuyển đổi mô hình.',
        keywords: ['chuyển đổi mô hình', 'ngân hàng số', 'rủi ro', 'lợi ích'],
      },
    ],
    points: 4,
  },
  {
    id: 2133,
    type: 'essay',
    chapter: 2,
    prompt:
      'Một startup giao đồ ăn muốn cạnh tranh với đối thủ lớn. Hãy phân tích 5 lực lượng cạnh tranh của Porter đối với startup này, đề xuất chiến lược dùng CNTT và nêu mô hình doanh thu thương mại điện tử phù hợp.',
    modelAnswerBullets: [
      '5 lực lượng: đối thủ truyền thống (đối thủ lớn); đối thủ mới (rào cản gia nhập thấp); sản phẩm/dịch vụ thay thế (tự nấu, nền tảng khác); khách hàng (dễ so sánh giá, quyền thương lượng cao); nhà cung cấp (nhà hàng, tài xế).',
      'Chiến lược CNTT: dẫn đầu chi phí thấp (tối ưu lộ trình, tự động hóa); khác biệt hóa (ứng dụng tiện lợi, gợi ý cá nhân hóa); tập trung phân khúc (khu vực, nhóm khách riêng); tăng cường quan hệ với khách hàng/nhà cung cấp và chi phí chuyển đổi (điểm thưởng, dữ liệu sở thích).',
      'Mô hình doanh thu: phí giao dịch/hoa hồng, quảng cáo, đăng ký (gói miễn phí giao hàng), freemium.',
    ],
    rubric: [
      {
        id: 'h133-1',
        label: 'Phân tích đủ 5 lực lượng cạnh tranh của Porter',
        detail: 'Đối thủ hiện tại, đối thủ mới, sản phẩm thay thế, quyền lực khách hàng, quyền lực nhà cung cấp (nhà hàng/tài xế).',
        keywords: ['đối thủ', 'thay thế', 'khách hàng', 'nhà cung cấp', 'tài xế'],
      },
      {
        id: 'h133-2',
        label: 'Đề xuất 4 chiến lược cạnh tranh bằng CNTT',
        detail: 'Chi phí thấp (tối ưu lộ trình), khác biệt hóa (cá nhân hóa), tập trung phân khúc, tăng quan hệ & chi phí chuyển đổi.',
        keywords: ['chi phí thấp', 'khác biệt hóa', 'phân khúc', 'chuyển đổi', 'cá nhân hóa'],
      },
      {
        id: 'h133-3',
        label: 'Mô hình doanh thu TMĐT phù hợp',
        detail: 'Phí giao dịch/hoa hồng, quảng cáo, đăng ký gói freeship, freemium.',
        keywords: ['hoa hồng', 'phí giao dịch', 'quảng cáo', 'đăng ký', 'freemium'],
      },
    ],
    points: 4,
  },
  {
    id: 2134,
    type: 'essay',
    chapter: 7,
    prompt:
      'Công ty X cân nhắc mở rộng sang bán hàng trực tuyến. Hãy vận dụng quy trình ra quyết định 4 giai đoạn của Herbert Simon vào tình huống này và nêu hệ thống thông tin hỗ trợ từng giai đoạn.',
    modelAnswerBullets: [
      'Nhận thức: xác định vấn đề/cơ hội (doanh số cửa hàng giảm, khách chuyển sang mua trực tuyến) – dùng MIS, BI, dashboard, phân tích dữ liệu khách hàng.',
      'Thiết kế: nêu các giải pháp khả thi (tự xây website, bán qua sàn, thuê ngoài, kết hợp) – dùng DSS, phân tích what-if, độ nhạy.',
      'Lựa chọn: đánh giá chi phí, lợi ích, rủi ro và chọn giải pháp tối ưu – DSS, mô hình tài chính; GDSS nếu quyết định nhóm.',
      'Thực hiện: triển khai, theo dõi kết quả bằng KPI/dashboard, điều chỉnh – MIS, ESS, BI; có vòng phản hồi quay lại các giai đoạn trước.',
    ],
    rubric: [
      {
        id: 'h134-1',
        label: 'Giai đoạn 1: Nhận thức (Intelligence)',
        detail: 'Phát hiện vấn đề/cơ hội (doanh số giảm, xu hướng mua online) với MIS, BI, dashboard.',
        keywords: ['nhận thức', 'mis', 'bi', 'dashboard', 'cơ hội'],
      },
      {
        id: 'h134-2',
        label: 'Giai đoạn 2: Thiết kế (Design)',
        detail: 'Xây dựng phương án (tự xây web, bán qua sàn, kết hợp) với DSS, what-if, độ nhạy.',
        keywords: ['thiết kế', 'dss', 'what-if', 'độ nhạy', 'phương án'],
      },
      {
        id: 'h134-3',
        label: 'Giai đoạn 3: Lựa chọn (Choice)',
        detail: 'Đánh giá chi phí–lợi ích–rủi ro, chọn phương án tối ưu bằng DSS, mô hình tài chính, GDSS.',
        keywords: ['lựa chọn', 'chi phí', 'gdss', 'tối ưu', 'rủi ro'],
      },
      {
        id: 'h134-4',
        label: 'Giai đoạn 4: Thực hiện (Implementation)',
        detail: 'Triển khai, giám sát bằng KPI/ESS/MIS/BI và vòng phản hồi điều chỉnh.',
        keywords: ['thực hiện', 'kpi', 'ess', 'phản hồi', 'điều chỉnh'],
      },
    ],
    points: 4,
  },
  {
    id: 2135,
    type: 'essay',
    chapter: 7,
    prompt:
      'Hãy thiết kế Thẻ điểm cân bằng (Balanced Scorecard) cho một công ty giao đồ ăn: nêu 4 khía cạnh và ít nhất 2 chỉ số hiệu suất chính (KPI) cho mỗi khía cạnh; giải thích vì sao ESS/dashboard phù hợp với quản lý cấp cao.',
    modelAnswerBullets: [
      'Tài chính: doanh thu, lợi nhuận trên đơn hàng, dòng tiền.',
      'Khách hàng: mức độ hài lòng, tỷ lệ giữ chân/rời bỏ, thời gian giao hàng.',
      'Quy trình kinh doanh nội bộ: thời gian xử lý đơn, tỷ lệ giao thành công, tỷ lệ sự cố.',
      'Học tập và phát triển: tỷ lệ nghỉ việc của tài xế/nhân viên, giờ đào tạo, tỷ lệ cải tiến.',
      'ESS/dashboard phù hợp vì giúp quản lý cấp cao tập trung vào thông tin hiệu suất quan trọng, tích hợp dữ liệu nội bộ và bên ngoài, trực quan, cho phép xem chi tiết (drill down) và liên hệ KPI với chiến lược (BPM).',
    ],
    rubric: [
      {
        id: 'h135-1',
        label: 'Khía cạnh Tài chính (≥ 2 KPI)',
        detail: 'Doanh thu, lợi nhuận trên đơn hàng, dòng tiền.',
        keywords: ['tài chính', 'doanh thu', 'lợi nhuận', 'dòng tiền'],
      },
      {
        id: 'h135-2',
        label: 'Khía cạnh Khách hàng (≥ 2 KPI)',
        detail: 'Mức độ hài lòng, tỷ lệ giữ chân/rời bỏ, thời gian giao hàng.',
        keywords: ['khách hàng', 'hài lòng', 'giữ chân', 'rời bỏ', 'thời gian giao'],
      },
      {
        id: 'h135-3',
        label: 'Khía cạnh Quy trình nội bộ (≥ 2 KPI)',
        detail: 'Thời gian xử lý đơn, tỷ lệ giao thành công, tỷ lệ sự cố.',
        keywords: ['quy trình', 'xử lý đơn', 'thành công', 'sự cố'],
      },
      {
        id: 'h135-4',
        label: 'Khía cạnh Học tập & phát triển (≥ 2 KPI)',
        detail: 'Tỷ lệ nghỉ việc tài xế/nhân viên, giờ đào tạo, tỷ lệ cải tiến.',
        keywords: ['học tập', 'phát triển', 'đào tạo', 'nghỉ việc', 'cải tiến'],
      },
      {
        id: 'h135-5',
        label: 'Giải thích vì sao ESS/dashboard phù hợp cấp cao',
        detail: 'Tập trung KPI quan trọng, tích hợp nội bộ & bên ngoài, trực quan, drill down, gắn BPM với chiến lược.',
        keywords: ['ess', 'dashboard', 'drill down', 'bpm', 'bên ngoài'],
      },
    ],
    points: 4,
  },
  {
    id: 2136,
    type: 'essay',
    chapter: 5,
    prompt:
      'Phân tích mô hình chuỗi cung ứng đẩy và kéo, hiệu ứng Bullwhip (nguyên nhân, hậu quả) và các giải pháp công nghệ/quản lý để giảm hiệu ứng này; nêu vai trò của tồn kho an toàn và JIT.',
    modelAnswerBullets: [
      'Mô hình đẩy: sản xuất/kiểm kê theo dự báo; dễ dư thừa hoặc thiếu hàng. Mô hình kéo: sản xuất theo đơn hàng thực, tự động bổ sung hàng.',
      'Bullwhip: thông tin về nhu cầu bị khuếch đại khi truyền ngược lên chuỗi (nhà bán lẻ → nhà phân phối → nhà sản xuất → nhà cung cấp) do dự báo riêng lẻ, đặt hàng theo lô, đầu cơ; hậu quả: tồn kho thừa/thiếu, chi phí cao, giảm dịch vụ.',
      'Giải pháp: chia sẻ dữ liệu nhu cầu thực theo thời gian thực qua SCM/Internet; dự báo hợp tác; chuyển sang mô hình kéo; rút ngắn thời gian đặt hàng.',
      'Tồn kho an toàn: vùng đệm cho bất ổn chuỗi (nhưng làm tăng chi phí); JIT: giảm tối đa chi phí dự trữ nhưng đòi hỏi phối hợp chặt chẽ.',
    ],
    rubric: [
      {
        id: 'h136-1',
        label: 'So sánh mô hình đẩy (Push) và kéo (Pull)',
        detail: 'Đẩy theo dự báo (dễ thừa/thiếu); Kéo theo đơn hàng thực tế.',
        keywords: ['mô hình đẩy', 'mô hình kéo', 'dự báo', 'đơn hàng'],
      },
      {
        id: 'h136-2',
        label: 'Hiệu ứng Bullwhip (khái niệm, nguyên nhân, hậu quả)',
        detail: 'Nhu cầu bị khuếch đại ngược lên chuỗi do dự báo riêng lẻ/đặt theo lô; gây tồn kho thừa thiếu, chi phí cao.',
        keywords: ['bullwhip', 'khuếch đại', 'ngược', 'chi phí', 'dự báo'],
      },
      {
        id: 'h136-3',
        label: 'Giải pháp công nghệ & quản lý giảm Bullwhip',
        detail: 'Chia sẻ dữ liệu nhu cầu thời gian thực qua SCM/Internet, dự báo hợp tác, mô hình kéo, rút ngắn thời gian đặt hàng.',
        keywords: ['chia sẻ', 'thời gian thực', 'scm', 'internet', 'hợp tác'],
      },
      {
        id: 'h136-4',
        label: 'Vai trò tồn kho an toàn và JIT',
        detail: 'Tồn kho an toàn làm vùng đệm bất ổn (tăng chi phí); JIT giảm chi phí dự trữ nhưng cần phối hợp chặt.',
        keywords: ['tồn kho an toàn', 'vùng đệm', 'jit', 'phối hợp'],
      },
    ],
    points: 4,
  },
  {
    id: 2137,
    type: 'essay',
    chapter: 4,
    prompt:
      'Giải thích vai trò của kho dữ liệu, data mart, OLAP, khai phá dữ liệu và dữ liệu lớn trong hỗ trợ ra quyết định; nêu vai trò của quản trị dữ liệu (data governance) và chất lượng dữ liệu.',
    modelAnswerBullets: [
      'Kho dữ liệu: hợp nhất dữ liệu hiện tại và lịch sử từ nhiều nguồn cho phân tích; data mart: tập con theo chủ đề/phòng ban.',
      'OLAP: phân tích nhiều chiều (pivot); khai phá dữ liệu: phát hiện mẫu và quan hệ ẩn, dự đoán; dữ liệu lớn (5Vs) với Hadoop/MapReduce, NoSQL, điện toán trong bộ nhớ: xử lý khối lượng, tốc độ, đa dạng lớn.',
      'Data governance: chính sách, quy trình quản lý dữ liệu như tài nguyên; chất lượng dữ liệu (chính xác, nhất quán, đầy đủ, kịp thời) quyết định chất lượng quyết định; làm sạch dữ liệu, chuẩn hóa.',
    ],
    rubric: [
      {
        id: 'h137-1',
        label: 'Kho dữ liệu (Data warehouse) & Data mart',
        detail: 'Hợp nhất dữ liệu hiện tại/lịch sử; data mart là tập con phục vụ chủ đề/phòng ban.',
        keywords: ['kho dữ liệu', 'data mart', 'lịch sử', 'tập con'],
      },
      {
        id: 'h137-2',
        label: 'OLAP & Khai phá dữ liệu (Data mining)',
        detail: 'OLAP phân tích đa chiều (pivot); Data mining phát hiện mẫu ẩn & dự đoán.',
        keywords: ['olap', 'đa chiều', 'khai phá', 'mẫu', 'dự đoán'],
      },
      {
        id: 'h137-3',
        label: 'Dữ liệu lớn (Big Data 5Vs) & công nghệ xử lý',
        detail: 'Hadoop/MapReduce, NoSQL, điện toán trong bộ nhớ xử lý khối lượng, tốc độ, đa dạng lớn.',
        keywords: ['5vs', 'hadoop', 'mapreduce', 'nosql', 'bộ nhớ'],
      },
      {
        id: 'h137-4',
        label: 'Quản trị dữ liệu & Chất lượng dữ liệu',
        detail: 'Data governance (chính sách, quy trình), làm sạch & chuẩn hóa đảm bảo chính xác, nhất quán, đầy đủ, kịp thời.',
        keywords: ['data governance', 'quản trị dữ liệu', 'làm sạch', 'chất lượng', 'nhất quán'],
      },
    ],
    points: 4,
  },
  {
    id: 2138,
    type: 'essay',
    chapter: 4,
    prompt:
      'Một ngân hàng muốn dùng AI để chấm điểm tín dụng. Hãy phân tích cơ hội, các rủi ro/thách thức (thiên vị, thiếu minh bạch, hallucination, quyền riêng tư…) và đề xuất khung triển khai “AI có trách nhiệm”.',
    modelAnswerBullets: [
      'Cơ hội: chấm điểm nhanh, nhất quán, dự đoán rủi ro tốt hơn, cá nhân hóa sản phẩm, giảm chi phí, mở rộng khách hàng.',
      'Rủi ro: thiên vị do dữ liệu huấn luyện; thiếu minh bạch/khó giải thích; hallucination khi dùng AI sinh tạo; quyền riêng tư và an toàn dữ liệu; phụ thuộc vào chất lượng dữ liệu; tác động lên việc làm.',
      'AI có trách nhiệm: nguyên tắc công bằng, minh bạch, giải trình, an toàn bảo mật, tôn trọng quyền riêng tư, tuân thủ pháp luật; quản trị dữ liệu; kiểm tra thiên vị; con người giám sát quyết định quan trọng; đào tạo nhân viên.',
    ],
    rubric: [
      {
        id: 'h138-1',
        label: 'Phân tích cơ hội ứng dụng AI chấm điểm tín dụng',
        detail: 'Chấm điểm nhanh, nhất quán, dự đoán rủi ro tốt hơn, cá nhân hóa, giảm chi phí.',
        keywords: ['nhanh', 'nhất quán', 'dự đoán rủi ro', 'cá nhân hóa', 'chi phí'],
      },
      {
        id: 'h138-2',
        label: 'Phân tích rủi ro & thách thức',
        detail: 'Thiên vị dữ liệu, thiếu minh bạch, hallucination, quyền riêng tư, chất lượng dữ liệu, việc làm.',
        keywords: ['thiên vị', 'minh bạch', 'hallucination', 'quyền riêng tư', 'bảo mật'],
      },
      {
        id: 'h138-3',
        label: 'Khung triển khai “AI có trách nhiệm”',
        detail: 'Công bằng, giải trình, kiểm tra thiên vị, quản trị dữ liệu, con người giám sát (human-in-the-loop), tuân thủ pháp luật & đào tạo.',
        keywords: ['trách nhiệm', 'công bằng', 'giải trình', 'giám sát', 'pháp luật'],
      },
    ],
    points: 4,
  },
  {
    id: 2139,
    type: 'essay',
    chapter: 6,
    prompt:
      'Phân biệt thị trường số và thị trường truyền thống; trình bày các tính năng độc đáo của thương mại điện tử và các mô hình doanh thu chính (kèm ví dụ).',
    modelAnswerBullets: [
      'Thị trường số: bất cân xứng thông tin giảm, chi phí tìm kiếm và giao dịch thấp, định giá linh hoạt/động, phân khúc dễ, hiệu ứng mạng, loại bỏ trung gian; hàng hóa số có chi phí cận biên bằng 0.',
      'Tính năng độc đáo của TMĐT: sự rộng khắp; phạm vi toàn cầu; tiêu chuẩn chung; sự phong phú; tính tương tác; mật độ thông tin; cá nhân hóa/tùy chỉnh; công nghệ xã hội.',
      'Mô hình doanh thu: quảng cáo (Google), bán hàng (Amazon), đăng ký (Netflix), freemium, phí giao dịch (eBay), liên kết (affiliate).',
    ],
    rubric: [
      {
        id: 'h139-1',
        label: 'Phân biệt thị trường số & thị trường truyền thống',
        detail: 'Giảm bất cân xứng thông tin, chi phí tìm kiếm/giao dịch thấp, định giá động, hiệu ứng mạng, loại bỏ trung gian, chi phí cận biên hàng hóa số ≈ 0.',
        keywords: ['bất cân xứng', 'định giá động', 'trung gian', 'cận biên', 'hiệu ứng mạng'],
      },
      {
        id: 'h139-2',
        label: '8 tính năng độc đáo của TMĐT',
        detail: 'Rộng khắp, toàn cầu, tiêu chuẩn chung, phong phú, tương tác, mật độ thông tin, cá nhân hóa/tùy chỉnh, công nghệ xã hội.',
        keywords: ['rộng khắp', 'toàn cầu', 'tiêu chuẩn chung', 'phong phú', 'tương tác', 'mật độ'],
      },
      {
        id: 'h139-3',
        label: 'Các mô hình doanh thu chính kèm ví dụ',
        detail: 'Quảng cáo (Google), bán hàng (Amazon), đăng ký (Netflix), freemium, phí giao dịch (eBay), liên kết (affiliate).',
        keywords: ['quảng cáo', 'bán hàng', 'đăng ký', 'freemium', 'phí giao dịch', 'affiliate'],
      },
    ],
    points: 4,
  },
  {
    id: 2140,
    type: 'essay',
    chapter: 7,
    prompt:
      'Phân tích ba lý do khiến đầu tư CNTT không luôn cải thiện chất lượng quyết định (chất lượng thông tin, bộ lọc quản lý, quán tính tổ chức và chính trị) và đề xuất giải pháp cho từng lý do.',
    modelAnswerBullets: [
      'Chất lượng thông tin: thông tin phải chính xác, toàn vẹn, nhất quán, đầy đủ, hiệu lực, kịp thời, dễ tiếp cận – giải pháp: quản trị và làm sạch dữ liệu, chuẩn hóa, kiểm soát chất lượng.',
      'Bộ lọc quản lý: nhà quản lý tiếp nhận thông tin qua các bộ lọc, dễ nhận thức sai vấn đề – giải pháp: đa dạng nguồn thông tin, dùng dashboard/BI khách quan, đào tạo tư duy dựa trên dữ liệu.',
      'Quán tính tổ chức và chính trị: lực cản đối với thay đổi lớn; quyết định thường là cân bằng giữa các nhóm lợi ích – giải pháp: lãnh đạo ủng hộ, truyền thông, thúc đẩy sự tham gia của các bên liên quan, quản lý thay đổi, dùng GDSS để minh bạch và ẩn danh ý kiến.',
    ],
    rubric: [
      {
        id: 'h140-1',
        label: 'Lý do 1: Chất lượng thông tin + giải pháp',
        detail: 'Chính xác, toàn vẹn, nhất quán, đầy đủ, kịp thời; giải pháp: quản trị, làm sạch, chuẩn hóa dữ liệu.',
        keywords: ['chất lượng thông tin', 'chính xác', 'làm sạch', 'chuẩn hóa', 'kịp thời'],
      },
      {
        id: 'h140-2',
        label: 'Lý do 2: Bộ lọc quản lý + giải pháp',
        detail: 'Nhà quản lý dễ nhận thức sai qua bộ lọc chủ quan; giải pháp: đa dạng nguồn, dashboard/BI khách quan, tư duy dữ liệu.',
        keywords: ['bộ lọc', 'khách quan', 'dashboard', 'bi', 'nguồn thông tin'],
      },
      {
        id: 'h140-3',
        label: 'Lý do 3: Quán tính tổ chức & chính trị + giải pháp',
        detail: 'Lực cản thay đổi, cân bằng nhóm lợi ích; giải pháp: lãnh đạo ủng hộ, truyền thông, quản lý thay đổi, GDSS minh bạch/ẩn danh.',
        keywords: ['quán tính', 'chính trị', 'nhóm lợi ích', 'gdss', 'quản lý thay đổi'],
      },
    ],
    points: 4,
  },
];
