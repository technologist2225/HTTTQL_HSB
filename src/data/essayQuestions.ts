import { EssayQuestion } from '../types/exam';

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: 131,
    type: 'essay',
    chapter: 1,
    prompt:
      'Trình bày 3 hoạt động cơ bản của một Hệ thống thông tin (Đầu vào, Xử lý, Đầu ra) và giải thích cách Hệ thống xử lý giao dịch (TPS) thực hiện 3 hoạt động này trong quy trình thanh toán thu ngân tại quầy siêu thị.',
    modelAnswerBullets: [
      'Ba hoạt động cơ bản: Đầu vào – thu thập dữ liệu thô từ bên trong và bên ngoài tổ chức; Xử lý – chuyển đổi dữ liệu thô thành hình thức có ý nghĩa; Đầu ra – phân phối thông tin đã xử lý đến người hoặc hoạt động sử dụng nó. (Ngoài ra còn có Phản hồi: kết quả đầu ra được trả về để đánh giá, điều chỉnh đầu vào.)',
      'TPS tại quầy thu ngân siêu thị: Đầu vào – quét mã vạch, ghi nhận mã hàng, số lượng, đơn giá, hình thức thanh toán. Xử lý – tra giá, áp dụng khuyến mãi/thuế, tính tổng tiền, cập nhật tồn kho và doanh thu, ghi giao dịch vào cơ sở dữ liệu. Đầu ra – in hóa đơn/biên lai cho khách, báo cáo bán hàng, cảnh báo hàng sắp hết; dữ liệu tổng hợp chuyển sang MIS.',
      'Phản hồi: đối chiếu cuối ca, điều chỉnh giá, bổ sung hàng khi tồn kho thấp.',
    ],
    rubric: [
      {
        id: '131-1',
        label: 'Trình bày 3 hoạt động cơ bản (Đầu vào, Xử lý, Đầu ra)',
        detail: 'Đầu vào (thu thập dữ liệu thô), Xử lý (chuyển đổi thành thông tin có ý nghĩa), Đầu ra (phân phối thông tin đến người dùng).',
        keywords: ['đầu vào', 'xử lý', 'đầu ra', 'dữ liệu thô', 'có ý nghĩa'],
      },
      {
        id: '131-2',
        label: 'TPS tại siêu thị – Đầu vào',
        detail: 'Quét mã vạch, ghi nhận mã hàng, số lượng, đơn giá, hình thức thanh toán.',
        keywords: ['mã vạch', 'số lượng', 'đơn giá', 'mã hàng', 'thanh toán'],
      },
      {
        id: '131-3',
        label: 'TPS tại siêu thị – Xử lý',
        detail: 'Tra giá, áp dụng khuyến mãi/thuế, tính tổng tiền, cập nhật tồn kho & doanh thu, ghi CSDL.',
        keywords: ['tổng tiền', 'tồn kho', 'khuyến mãi', 'thuế', 'cập nhật', 'cơ sở dữ liệu'],
      },
      {
        id: '131-4',
        label: 'TPS tại siêu thị – Đầu ra & Phản hồi',
        detail: 'In hóa đơn/biên lai, báo cáo bán hàng, chuyển dữ liệu sang MIS; phản hồi đối chiếu cuối ca, bổ sung hàng.',
        keywords: ['hóa đơn', 'biên lai', 'báo cáo', 'phản hồi', 'mis', 'bổ sung hàng'],
      },
    ],
    points: 4,
  },
  {
    id: 132,
    type: 'essay',
    chapter: 1,
    prompt:
      'Trình bày sáu mục tiêu kinh doanh chiến lược mà hệ thống thông tin quản lý hỗ trợ. Với mỗi mục tiêu, nêu một ví dụ minh họa.',
    modelAnswerBullets: [
      'Tối ưu hóa hoạt động kinh doanh – Walmart liên kết nhà cung cấp để bổ sung hàng cho từng cửa hàng.',
      'Sản phẩm, dịch vụ, mô hình kinh doanh mới – Apple chuyển phân phối âm nhạc sang iPod/iTunes.',
      'Thân thiện với khách hàng và nhà cung cấp – khách sạn cao cấp theo dõi sở thích khách; JCPenney liên kết dữ liệu bán hàng với nhà cung cấp.',
      'Cải thiện việc ra quyết định – bảng điều khiển (dashboard) thời gian thực của Verizon.',
      'Lợi thế cạnh tranh – phản hồi khách hàng/nhà cung cấp theo thời gian thực (Apple, Walmart, UPS).',
      'Sự sống còn – đầu tư hệ thống để tuân thủ yêu cầu lưu trữ hồ sơ của chính phủ, đào tạo nhân viên về công nghệ.',
    ],
    rubric: [
      {
        id: '132-1',
        label: 'Tối ưu hóa hoạt động kinh doanh + ví dụ',
        detail: 'VD: Hệ thống liên kết bán lẻ của Walmart nối nhà cung cấp với cửa hàng.',
        keywords: ['tối ưu', 'vận hành', 'walmart'],
      },
      {
        id: '132-2',
        label: 'Sản phẩm, dịch vụ và mô hình kinh doanh mới + ví dụ',
        detail: 'VD: Apple iPod/iTunes chuyển đổi mô hình phân phối âm nhạc.',
        keywords: ['sản phẩm', 'mô hình kinh doanh mới', 'apple', 'itunes', 'ipod'],
      },
      {
        id: '132-3',
        label: 'Thân thiện với khách hàng và nhà cung cấp + ví dụ',
        detail: 'VD: Khách sạn theo dõi sở thích khách, JCPenney liên kết dữ liệu bán hàng với nhà cung cấp.',
        keywords: ['thân thiện', 'khách hàng', 'nhà cung cấp', 'jcpenney', 'khách sạn'],
      },
      {
        id: '132-4',
        label: 'Cải thiện việc ra quyết định + ví dụ',
        detail: 'VD: Dashboard thời gian thực của Verizon.',
        keywords: ['ra quyết định', 'verizon', 'dashboard', 'bảng điều khiển'],
      },
      {
        id: '132-5',
        label: 'Lợi thế cạnh tranh & Sự sống còn + ví dụ',
        detail: 'Lợi thế cạnh tranh (Apple, Walmart, UPS); Sự sống còn (tuân thủ yêu cầu lưu trữ hồ sơ của chính phủ).',
        keywords: ['lợi thế cạnh tranh', 'sự sống còn', 'sống còn', 'chính phủ', 'ups'],
      },
    ],
    points: 4,
  },
  {
    id: 133,
    type: 'essay',
    chapter: 2,
    prompt:
      'Phân biệt TPS, MIS, DSS và ESS về: đối tượng quản lý phục vụ, loại quyết định hỗ trợ và ví dụ minh họa.',
    modelAnswerBullets: [
      'TPS: quản lý cấp tác nghiệp; quyết định có cấu trúc; thực hiện và ghi nhận giao dịch hằng ngày (xử lý đơn hàng, trả lương).',
      'MIS: quản lý cấp trung; báo cáo tình hình hiện tại, tóm tắt dựa trên dữ liệu TPS, phân tích sơ bộ (báo cáo doanh số hằng năm, báo cáo ngoại lệ).',
      'DSS: quản lý cấp trung/chiến thuật; quyết định bán cấu trúc và phi cấu trúc, không thường xuyên; dùng mô hình và công cụ phân tích, dữ liệu trong và ngoài (what-if, độ nhạy, OLAP).',
      'ESS: quản lý cấp cao/chiến lược; quyết định phi cấu trúc, không thường xuyên; tổng hợp dữ liệu từ MIS, DSS và bên ngoài, thể hiện bằng dashboard, thẻ điểm.',
    ],
    rubric: [
      {
        id: '133-1',
        label: 'TPS (Hệ thống xử lý giao dịch)',
        detail: 'Quản lý cấp tác nghiệp; quyết định có cấu trúc; ghi nhận giao dịch hằng ngày (xử lý đơn hàng, trả lương).',
        keywords: ['tps', 'tác nghiệp', 'có cấu trúc', 'giao dịch', 'trả lương', 'đơn hàng'],
      },
      {
        id: '133-2',
        label: 'MIS (Hệ thống thông tin quản lý)',
        detail: 'Quản lý cấp trung; báo cáo tình hình hiện tại dựa trên dữ liệu TPS (báo cáo doanh số, báo cáo ngoại lệ).',
        keywords: ['mis', 'cấp trung', 'báo cáo', 'doanh số', 'ngoại lệ'],
      },
      {
        id: '133-3',
        label: 'DSS (Hệ thống hỗ trợ ra quyết định)',
        detail: 'Quản lý cấp trung/chiến thuật; quyết định bán cấu trúc/phi cấu trúc; mô hình phân tích (what-if, độ nhạy, OLAP).',
        keywords: ['dss', 'bán cấu trúc', 'what-if', 'độ nhạy', 'olap', 'mô hình'],
      },
      {
        id: '133-4',
        label: 'ESS (Hệ thống hỗ trợ điều hành)',
        detail: 'Quản lý cấp cao/chiến lược; quyết định phi cấu trúc; tổng hợp MIS/DSS & dữ liệu bên ngoài qua dashboard, thẻ điểm.',
        keywords: ['ess', 'cấp cao', 'phi cấu trúc', 'dashboard', 'thẻ điểm', 'bên ngoài'],
      },
    ],
    points: 4,
  },
  {
    id: 134,
    type: 'essay',
    chapter: 2,
    prompt:
      'Phân tích mô hình 5 lực lượng cạnh tranh của Michael Porter và trình bày bốn chiến lược chung mà doanh nghiệp có thể dùng CNTT để đối phó với các lực lượng này.',
    modelAnswerBullets: [
      'Năm lực lượng: đối thủ cạnh tranh truyền thống; đối thủ mới gia nhập; sản phẩm/dịch vụ thay thế; khách hàng; nhà cung cấp. Internet làm tăng sức ép (dễ so sánh giá, dễ gia nhập, tăng quyền thương lượng của khách hàng).',
      'Bốn chiến lược chung dùng CNTT: (1) Dẫn đầu chi phí thấp – Walmart; (2) Khác biệt hóa sản phẩm – Apple, Google, Nike; (3) Tập trung vào phân khúc thị trường – Hilton; (4) Tăng cường quan hệ với khách hàng và nhà cung cấp, tăng chi phí chuyển đổi – Netflix, Amazon.',
    ],
    rubric: [
      {
        id: '134-1',
        label: 'Trình bày đủ 5 lực lượng cạnh tranh của Porter',
        detail: 'Đối thủ truyền thống, đối thủ mới gia nhập, sản phẩm/dịch vụ thay thế, khách hàng, nhà cung cấp.',
        keywords: ['đối thủ', 'mới gia nhập', 'thay thế', 'khách hàng', 'nhà cung cấp'],
      },
      {
        id: '134-2',
        label: 'Phân tích tác động của Internet đến 5 lực lượng',
        detail: 'Dễ so sánh giá, rào cản gia nhập giảm, tăng quyền thương lượng của khách hàng.',
        keywords: ['internet', 'so sánh giá', 'thương lượng', 'sức ép'],
      },
      {
        id: '134-3',
        label: 'Chiến lược (1) Dẫn đầu chi phí thấp & (2) Khác biệt hóa sản phẩm',
        detail: 'Dẫn đầu chi phí thấp (Walmart); Khác biệt hóa sản phẩm (Apple, Google, Nike).',
        keywords: ['chi phí thấp', 'walmart', 'khác biệt hóa', 'apple', 'nike'],
      },
      {
        id: '134-4',
        label: 'Chiến lược (3) Tập trung phân khúc & (4) Tăng cường quan hệ KH/NCC',
        detail: 'Tập trung phân khúc (Hilton); Tăng cường quan hệ KH/NCC và chi phí chuyển đổi (Netflix, Amazon).',
        keywords: ['phân khúc', 'hilton', 'chuyển đổi', 'netflix', 'amazon'],
      },
    ],
    points: 4,
  },
  {
    id: 135,
    type: 'essay',
    chapter: 3,
    prompt:
      'Trình bày các giai đoạn của vòng đời phát triển hệ thống thông tin. Giai đoạn nào tốn kém nhất và vì sao?',
    modelAnswerBullets: [
      'Sáu giai đoạn: Phân tích hệ thống → Thiết kế hệ thống → Lập trình → Kiểm thử (đơn vị, hệ thống, chấp nhận) → Chuyển đổi (song song, trực tiếp, thí điểm, theo giai đoạn) → Vận hành và bảo trì.',
      'Giai đoạn tốn kém nhất: vận hành và bảo trì, vì phải sửa lỗi, thay đổi phần cứng/phần mềm/dữ liệu/báo cáo và cải tiến theo yêu cầu người dùng (khoảng 20% gỡ lỗi khẩn cấp, 20% thay đổi kỹ thuật, 60% cải tiến người dùng, tài liệu, mã hóa lại).',
    ],
    rubric: [
      {
        id: '135-1',
        label: 'Liệt kê đúng thứ tự 6 giai đoạn',
        detail: 'Phân tích → Thiết kế → Lập trình → Kiểm thử → Chuyển đổi → Vận hành và bảo trì.',
        keywords: ['phân tích', 'thiết kế', 'lập trình', 'kiểm thử', 'chuyển đổi', 'vận hành'],
      },
      {
        id: '135-2',
        label: 'Nêu rõ các loại Kiểm thử & Chiến lược Chuyển đổi',
        detail: 'Kiểm thử (đơn vị, hệ thống, chấp nhận); Chuyển đổi (song song, trực tiếp, thí điểm, theo giai đoạn).',
        keywords: ['đơn vị', 'chấp nhận', 'song song', 'trực tiếp', 'thí điểm'],
      },
      {
        id: '135-3',
        label: 'Chỉ ra giai đoạn tốn kém nhất: Vận hành và bảo trì',
        detail: 'Xác định chính xác giai đoạn vận hành và bảo trì là tốn kém chi phí và thời gian nhất.',
        keywords: ['bảo trì', 'tốn kém nhất'],
      },
      {
        id: '135-4',
        label: 'Giải thích lý do (tỷ lệ 20% – 20% – 60%)',
        detail: 'Sửa lỗi khẩn cấp (~20%), thay đổi kỹ thuật (~20%), cải tiến theo yêu cầu người dùng/tài liệu/mã hóa lại (~60%).',
        keywords: ['sửa lỗi', 'cải tiến', '20%', '60%', 'người dùng'],
      },
    ],
    points: 4,
  },
  {
    id: 136,
    type: 'essay',
    chapter: 4,
    prompt:
      'Nêu các vấn đề của môi trường quản lý dữ liệu theo tập tin truyền thống. Hệ quản trị cơ sở dữ liệu (DBMS) giải quyết các vấn đề đó như thế nào?',
    modelAnswerBullets: [
      'Vấn đề của môi trường tập tin truyền thống: dữ liệu thừa; không nhất quán dữ liệu; phụ thuộc giữa chương trình và dữ liệu; thiếu linh hoạt; bảo mật kém; thiếu chia sẻ và sẵn có dữ liệu.',
      'DBMS giải quyết: tập trung dữ liệu và kiểm soát sự dư thừa; loại bỏ sự không nhất quán; tách chương trình khỏi dữ liệu (tách khung nhìn luận lý và vật lý); cho phép quản lý dữ liệu trung tâm; tăng bảo mật; cung cấp ngôn ngữ truy vấn (SQL), từ điển dữ liệu, công cụ báo cáo.',
    ],
    rubric: [
      {
        id: '136-1',
        label: 'Các vấn đề về dữ liệu (dư thừa, không nhất quán)',
        detail: 'Dữ liệu thừa (data redundancy) và không nhất quán dữ liệu (data inconsistency).',
        keywords: ['dữ liệu thừa', 'dư thừa', 'không nhất quán'],
      },
      {
        id: '136-2',
        label: 'Các vấn đề vận hành (phụ thuộc chương trình, thiếu linh hoạt, bảo mật kém, thiếu chia sẻ)',
        detail: 'Phụ thuộc chương trình – dữ liệu, thiếu linh hoạt, bảo mật kém, thiếu chia sẻ & sẵn có dữ liệu.',
        keywords: ['phụ thuộc', 'thiếu linh hoạt', 'bảo mật kém', 'chia sẻ'],
      },
      {
        id: '136-3',
        label: 'DBMS tập trung hóa, tách khung nhìn luận lý/vật lý',
        detail: 'Tập trung dữ liệu, kiểm soát dư thừa/không nhất quán, tách chương trình khỏi dữ liệu (khung nhìn luận lý & vật lý).',
        keywords: ['tập trung', 'tách', 'luận lý', 'vật lý', 'dbms'],
      },
      {
        id: '136-4',
        label: 'Các công cụ DBMS cung cấp (SQL, từ điển dữ liệu, bảo mật)',
        detail: 'Tăng bảo mật, cung cấp SQL, từ điển dữ liệu (data dictionary) và công cụ báo cáo.',
        keywords: ['sql', 'từ điển dữ liệu', 'bảo mật', 'truy vấn', 'báo cáo'],
      },
    ],
    points: 4,
  },
  {
    id: 137,
    type: 'essay',
    chapter: 4,
    prompt:
      'Phân tích cơ hội (ứng dụng) và các thách thức, rủi ro đạo đức khi doanh nghiệp triển khai trí tuệ nhân tạo (AI). Thế nào là “AI có trách nhiệm”?',
    modelAnswerBullets: [
      'Cơ hội: tự động hóa quy trình; hỗ trợ ra quyết định dựa trên dữ liệu; phân tích xu hướng, dự báo nhu cầu; cá nhân hóa trải nghiệm khách hàng; tạo sản phẩm, dịch vụ, mô hình mới; nâng cao hiệu quả và năng lực cạnh tranh (AI trong từng hoạt động chuỗi giá trị).',
      'Thách thức/rủi ro: hallucination; thiếu minh bạch; thiên vị (bias); an toàn thông tin; ảnh hưởng việc làm; tiêu thụ năng lượng; thông tin sai lệch; quyền riêng tư; quyền sở hữu trí tuệ và web scraping.',
      'AI có trách nhiệm: thiết kế, phát triển, sử dụng AI an toàn, minh bạch, công bằng, tôn trọng quyền riêng tư, tuân thủ pháp luật; doanh nghiệp xây dựng nguyên tắc quản trị AI, tăng trách nhiệm giải trình, tạo giá trị bền vững. AI chỉ hiệu quả khi có dữ liệu chất lượng, hạ tầng phù hợp, nhân lực, tích hợp vào quy trình và cam kết của lãnh đạo.',
    ],
    rubric: [
      {
        id: '137-1',
        label: 'Cơ hội / ứng dụng của AI trong doanh nghiệp',
        detail: 'Tự động hóa quy trình, ra quyết định dựa trên dữ liệu, dự báo nhu cầu, cá nhân hóa trải nghiệm khách hàng, tạo mô hình mới.',
        keywords: ['tự động hóa', 'dự báo', 'cá nhân hóa', 'ra quyết định', 'chuỗi giá trị'],
      },
      {
        id: '137-2',
        label: 'Thách thức và rủi ro đạo đức của AI',
        detail: 'Hallucination, thiếu minh bạch, thiên vị (bias), an toàn thông tin, việc làm, năng lượng, quyền riêng tư, sở hữu trí tuệ.',
        keywords: ['hallucination', 'ảo giác', 'thiên vị', 'bias', 'quyền riêng tư', 'sở hữu trí tuệ', 'năng lượng', 'việc làm'],
      },
      {
        id: '137-3',
        label: 'Khái niệm “AI có trách nhiệm”',
        detail: 'Thiết kế, phát triển, sử dụng AI an toàn, minh bạch, công bằng, tôn trọng quyền riêng tư, tuân thủ pháp luật và trách nhiệm giải trình.',
        keywords: ['minh bạch', 'công bằng', 'an toàn', 'pháp luật', 'giải trình', 'bền vững'],
      },
      {
        id: '137-4',
        label: 'Điều kiện để AI hiệu quả trong doanh nghiệp',
        detail: 'Dữ liệu chất lượng, hạ tầng phù hợp, nhân lực, tích hợp vào quy trình và cam kết của lãnh đạo.',
        keywords: ['dữ liệu chất lượng', 'hạ tầng', 'nhân lực', 'lãnh đạo'],
      },
    ],
    points: 4,
  },
  {
    id: 138,
    type: 'essay',
    chapter: 5,
    prompt:
      'Trình bày khái niệm và giá trị kinh doanh của ERP, SCM và CRM. Nêu các thách thức doanh nghiệp gặp phải khi triển khai các ứng dụng doanh nghiệp.',
    modelAnswerBullets: [
      'ERP: các module tích hợp dùng chung một CSDL trung tâm. Giá trị: tăng hiệu quả hoạt động; thông tin chuẩn hỗ trợ ra quyết định; phản ứng nhanh với khách hàng; công cụ phân tích hiệu suất toàn doanh nghiệp.',
      'SCM: quản lý mạng lưới tổ chức và quy trình mua nguyên liệu, chuyển thành thành phẩm, phân phối. Giá trị: phù hợp cung cầu; giảm tồn kho; cải thiện giao hàng; rút ngắn thời gian ra thị trường; dùng tài sản hiệu quả; tăng doanh số. Liên quan: JIT, tồn kho an toàn, hiệu ứng Bullwhip, mô hình đẩy/kéo.',
      'CRM: thu thập, hợp nhất, phân tích dữ liệu khách hàng và phân phối đến các điểm tiếp xúc. Giá trị: tăng hài lòng; giảm chi phí tiếp thị, thu hút và giữ chân; tăng doanh thu; giảm tỷ lệ rời bỏ.',
      'Thách thức: tốn kém, thời gian triển khai dài, thay đổi công nghệ và quy trình, chi phí chuyển đổi cao và phụ thuộc nhà cung cấp, yêu cầu chuẩn hóa/làm sạch dữ liệu cao.',
    ],
    rubric: [
      {
        id: '138-1',
        label: 'ERP: Khái niệm & Giá trị kinh doanh',
        detail: 'Module tích hợp dùng chung 1 CSDL trung tâm; tăng hiệu quả, thông tin chuẩn, phản ứng nhanh, phân tích toàn DN.',
        keywords: ['erp', 'module', 'cơ sở dữ liệu trung tâm', 'csdl trung tâm', 'hiệu quả'],
      },
      {
        id: '138-2',
        label: 'SCM: Khái niệm & Giá trị kinh doanh',
        detail: 'Quản lý mạng lưới mua nguyên liệu–sản xuất–phân phối; phù hợp cung cầu, giảm tồn kho, cải thiện giao hàng (JIT, Bullwhip, đẩy/kéo).',
        keywords: ['scm', 'chuỗi cung ứng', 'tồn kho', 'cung cầu', 'jit', 'bullwhip'],
      },
      {
        id: '138-3',
        label: 'CRM: Khái niệm & Giá trị kinh doanh',
        detail: 'Thu thập, hợp nhất, phân tích dữ liệu KH đến các điểm tiếp xúc; tăng hài lòng, giữ chân KH, giảm tỷ lệ rời bỏ.',
        keywords: ['crm', 'điểm tiếp xúc', 'hài lòng', 'giữ chân', 'rời bỏ'],
      },
      {
        id: '138-4',
        label: 'Thách thức khi triển khai ứng dụng doanh nghiệp',
        detail: 'Tốn kém, thời gian triển khai dài, thay đổi quy trình, chi phí chuyển đổi cao/phụ thuộc NCC, yêu cầu chuẩn hóa & làm sạch dữ liệu.',
        keywords: ['tốn kém', 'triển khai dài', 'thay đổi quy trình', 'chuyển đổi', 'làm sạch dữ liệu', 'chuẩn hóa'],
      },
    ],
    points: 4,
  },
  {
    id: 139,
    type: 'essay',
    chapter: 6,
    prompt:
      'Trình bày các mô hình doanh thu chính của thương mại điện tử (kèm ví dụ) và so sánh thị trường số với thị trường truyền thống.',
    modelAnswerBullets: [
      'Mô hình doanh thu: quảng cáo (Google, Facebook); bán hàng (Amazon); đăng ký (Netflix); freemium (Google apps); phí giao dịch (eBay, Shopee); liên kết (affiliate).',
      'Thị trường số so với truyền thống: bất cân xứng thông tin giảm (so với cao); chi phí tìm kiếm thấp (so với cao); chi phí giao dịch thấp; định giá linh hoạt và phân biệt giá chi phí thấp, tức thời; phân khúc thị trường dễ hơn; hiệu ứng mạng mạnh; loại bỏ trung gian dễ xảy ra; chi phí chuyển đổi cao hoặc thấp tùy sản phẩm; có thể trì hoãn sự hài lòng.',
    ],
    rubric: [
      {
        id: '139-1',
        label: 'Các mô hình doanh thu TMĐT (kèm ví dụ)',
        detail: 'Quảng cáo (Google, Facebook), bán hàng (Amazon), đăng ký (Netflix), freemium (Google Apps), phí giao dịch (eBay, Shopee), liên kết (Affiliate).',
        keywords: ['quảng cáo', 'bán hàng', 'đăng ký', 'freemium', 'phí giao dịch', 'liên kết', 'affiliate'],
      },
      {
        id: '139-2',
        label: 'So sánh thông tin & chi phí (bất cân xứng, tìm kiếm, giao dịch)',
        detail: 'Thị trường số có bất cân xứng thông tin giảm, chi phí tìm kiếm và chi phí giao dịch thấp hơn thị trường truyền thống.',
        keywords: ['bất cân xứng', 'chi phí tìm kiếm', 'chi phí giao dịch'],
      },
      {
        id: '139-3',
        label: 'So sánh định giá & phân khúc thị trường',
        detail: 'Định giá linh hoạt/tức thời, chi phí thay đổi danh mục thấp, phân khúc thị trường dễ hơn.',
        keywords: ['định giá', 'phân biệt giá', 'phân khúc'],
      },
      {
        id: '139-4',
        label: 'Hiệu ứng mạng, loại bỏ trung gian & trì hoãn sự hài lòng',
        detail: 'Hiệu ứng mạng mạnh, loại bỏ trung gian dễ xảy ra, chi phí chuyển đổi tùy sản phẩm, có thể trì hoãn sự hài lòng.',
        keywords: ['hiệu ứng mạng', 'loại bỏ trung gian', 'trì hoãn'],
      },
    ],
    points: 4,
  },
  {
    id: 140,
    type: 'essay',
    chapter: 7,
    prompt:
      'Phân biệt các loại quyết định (có cấu trúc, bán cấu trúc, phi cấu trúc) và trình bày quy trình ra quyết định 4 giai đoạn của Simon. Hệ thống MIS, DSS, ESS và BI hỗ trợ các cấp quản trị ra quyết định như thế nào?',
    modelAnswerBullets: [
      'Loại quyết định: có cấu trúc (tiêu chuẩn, dữ liệu, thủ tục rõ ràng – cấp tác nghiệp: bổ sung hàng tồn kho); bán cấu trúc (một phần rõ ràng – cấp trung: lập ngân sách phòng ban); phi cấu trúc (không rõ ràng – cấp cao: gia nhập/rút khỏi thị trường).',
      'Quy trình Simon: Nhận thức (xác định vấn đề) → Thiết kế (tìm giải pháp khả thi) → Lựa chọn (chọn giải pháp tốt nhất) → Thực hiện (triển khai, theo dõi, điều chỉnh).',
      'Hỗ trợ theo cấp: MIS – báo cáo thường kỳ, báo cáo ngoại lệ cho cấp trung và tác nghiệp; DSS – phân tích phức tạp, what-if, độ nhạy, OLAP cho quyết định bán cấu trúc; ESS – dashboard, thẻ điểm cân bằng (Tài chính, Khách hàng, Quy trình nội bộ, Học tập và phát triển), KPI cho cấp cao; BI/BA – hạ tầng và công cụ phân tích (báo cáo, dashboard, truy vấn ad hoc, drill down, dự báo, dữ liệu lớn) cung cấp thông tin thời gian thực cho mọi cấp.',
    ],
    rubric: [
      {
        id: '140-1',
        label: 'Phân biệt 3 loại quyết định (kèm cấp quản lý & ví dụ)',
        detail: 'Có cấu trúc (cấp tác nghiệp: bổ sung tồn kho); Bán cấu trúc (cấp trung: lập ngân sách); Phi cấu trúc (cấp cao: gia nhập/rút khỏi thị trường).',
        keywords: ['có cấu trúc', 'bán cấu trúc', 'phi cấu trúc', 'tồn kho', 'ngân sách', 'thị trường'],
      },
      {
        id: '140-2',
        label: 'Quy trình 4 giai đoạn của Herbert Simon',
        detail: 'Nhận thức (Intelligence) → Thiết kế (Design) → Lựa chọn (Choice) → Thực hiện (Implementation).',
        keywords: ['nhận thức', 'thiết kế', 'lựa chọn', 'thực hiện', 'simon'],
      },
      {
        id: '140-3',
        label: 'Hỗ trợ của MIS và DSS',
        detail: 'MIS: báo cáo thường kỳ, ngoại lệ; DSS: phân tích phức tạp, what-if, độ nhạy, OLAP cho quyết định bán cấu trúc.',
        keywords: ['mis', 'báo cáo ngoại lệ', 'dss', 'what-if', 'độ nhạy', 'olap'],
      },
      {
        id: '140-4',
        label: 'Hỗ trợ của ESS và BI/BA',
        detail: 'ESS: dashboard, thẻ điểm cân bằng (4 khía cạnh), KPI; BI/BA: truy vấn ad hoc, drill down, dự báo, dữ liệu lớn thời gian thực.',
        keywords: ['ess', 'thẻ điểm cân bằng', 'kpi', 'bi', 'ad hoc', 'drill down'],
      },
    ],
    points: 4,
  },
];
