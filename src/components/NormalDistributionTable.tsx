import React, { useMemo, useState } from 'react';
import { Calculator, Search, Table2, X } from 'lucide-react';
import {
  STA_FORMULA_REFERENCE,
  STANDARD_NORMAL_TABLE,
  Z_TABLE_COLUMNS,
} from '../data/sta2005Exams';

interface NormalDistributionTableProps {
  compact?: boolean;
  onClose?: () => void;
  initialTab?: 'table' | 'formulas';
}

interface ZLookupResult {
  rawZ: number;
  absZ: number;
  isNegative: boolean;
  rowIndex: number | null;
  colIndex: number | null;
  inTableRange: boolean;
  phiAbs: number;
  phiZ: number;
  upperTail: number;
  twoSidedMiddle: number;
  roundedAbsLabel: string;
}

const COMMON_Z_VALUES = [
  { z: '1.28', label: '1,28 (90%)' },
  { z: '1.64', label: '1,64 (95% 1 phía)' },
  { z: '1.96', label: '1,96 (95%)' },
  { z: '2.33', label: '2,33 (99% 1 phía)' },
  { z: '2.58', label: '2,58 (99%)' },
];

function lookupZ(inputStr: string): ZLookupResult | null {
  const cleaned = inputStr.trim().replace(/,/g, '.');
  if (!cleaned || cleaned === '-' || cleaned === '.' || cleaned === '-.') return null;
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed)) return null;

  const isNegative = parsed < 0;
  const absZ = Math.abs(parsed);
  const roundedHundredths = Math.round(absZ * 100);
  const rowIndex = Math.floor(roundedHundredths / 10);
  const colIndex = roundedHundredths % 10;

  let phiAbs: number;
  let inTableRange = false;

  if (rowIndex >= 0 && rowIndex < STANDARD_NORMAL_TABLE.length && colIndex >= 0 && colIndex < 10) {
    inTableRange = true;
    phiAbs = Number(STANDARD_NORMAL_TABLE[rowIndex].values[colIndex]);
  } else {
    // Beyond 3.09: standard normal CDF is > 0.9990
    phiAbs = absZ >= 3.5 ? 0.9998 : 0.9995;
  }

  const phiZ = isNegative ? Math.max(0, 1 - phiAbs) : phiAbs;
  const upperTail = Math.max(0, 1 - phiZ);
  const twoSidedMiddle = Math.max(0, 2 * phiAbs - 1);

  return {
    rawZ: parsed,
    absZ,
    isNegative,
    rowIndex: inTableRange ? rowIndex : null,
    colIndex: inTableRange ? colIndex : null,
    inTableRange,
    phiAbs,
    phiZ,
    upperTail,
    twoSidedMiddle,
    roundedAbsLabel: (roundedHundredths / 100).toFixed(2),
  };
}

export const NormalDistributionTable: React.FC<NormalDistributionTableProps> = ({
  compact = false,
  onClose,
  initialTab = 'table',
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'formulas'>(initialTab);
  const [zInput, setZInput] = useState<string>('1.96');

  const lookup = useMemo(() => lookupZ(zInput), [zInput]);

  const handleSelectCell = (rowIdx: number, colIdx: number) => {
    const zVal = (rowIdx * 0.1 + colIdx * 0.01).toFixed(2);
    setZInput(zVal);
  };

  return (
    <div className="bg-white dark:bg-[#151F32] border border-[#D6DCE2] dark:border-[#2B3B54] rounded overflow-hidden flex flex-col">
      {/* Header bar */}
      <div className="px-4 py-3 bg-[#F3F5F7] dark:bg-[#182338] border-b border-[#D6DCE2] dark:border-[#2B3B54] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] truncate">
            Bảng phân phối chuẩn hóa N(0,1)
          </h3>
          <p className="text-xs text-[#475569] dark:text-[#94A3B8] font-mono">
            Φ(z) = P(Z ≤ z) · Tra trực tiếp khi làm bài
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center p-0.5 bg-[#E2E8F0] dark:bg-[#0F172A] rounded">
            <button
              type="button"
              onClick={() => setActiveTab('table')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                activeTab === 'table'
                  ? 'bg-white dark:bg-[#1E293B] text-[#0B4275] dark:text-[#38BDF8]'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              Bảng Φ(z)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('formulas')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                activeTab === 'formulas'
                  ? 'bg-white dark:bg-[#1E293B] text-[#0B4275] dark:text-[#38BDF8]'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Công thức
            </button>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng bảng tra chuẩn hóa"
              className="p-1.5 rounded text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#243249] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {activeTab === 'table' ? (
        <div className="flex flex-col flex-1 min-h-0">
          {/* Interactive Z-value lookup bar */}
          <div className="p-3.5 border-b border-[#E2E8F0] dark:border-[#243249] bg-[#F8FAFC] dark:bg-[#0F172A]/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <label
                htmlFor="sta-z-lookup-input"
                className="text-xs font-semibold text-[#334155] dark:text-[#CBD5E1] shrink-0"
              >
                Tra nhanh z =
              </label>
              <div className="relative flex-1 max-w-[200px]">
                <Search className="w-3.5 h-3.5 text-[#64748B] dark:text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="sta-z-lookup-input"
                  type="text"
                  inputMode="decimal"
                  value={zInput}
                  onChange={(e) => setZInput(e.target.value)}
                  placeholder="VD: 1.73 hoặc -1.28"
                  className="w-full pl-8 pr-2.5 py-1.5 text-sm font-mono tabular-nums rounded border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#0B4275] dark:focus:border-[#38BDF8]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px]">
                <span className="text-[#64748B] dark:text-[#94A3B8]">Mốc hay dùng:</span>
                {COMMON_Z_VALUES.map((item) => (
                  <button
                    key={item.z}
                    type="button"
                    onClick={() => setZInput(item.z)}
                    className={`font-mono tabular-nums transition-colors cursor-pointer ${
                      zInput.replace(',', '.') === item.z
                        ? 'text-[#C2410C] dark:text-[#FB923C] font-semibold underline'
                        : 'text-[#0B4275] dark:text-[#38BDF8] hover:underline'
                    }`}
                  >
                    {item.z}
                  </button>
                ))}
              </div>
            </div>

            {lookup && (
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="px-2.5 py-2 rounded bg-[#E7F3F5] dark:bg-[#122631] border border-[#B6D4DA] dark:border-[#244A5C]">
                  <div className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                    Φ({lookup.rawZ.toFixed(2)}) = P(Z ≤ z)
                  </div>
                  <div className="text-sm font-bold font-mono tabular-nums text-[#0B4275] dark:text-[#38BDF8]">
                    {lookup.phiZ.toFixed(4)}
                  </div>
                </div>
                <div className="px-2.5 py-2 rounded bg-white dark:bg-[#151F32] border border-[#E2E8F0] dark:border-[#243249]">
                  <div className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                    P(Z &gt; z) = 1 − Φ(z)
                  </div>
                  <div className="text-sm font-bold font-mono tabular-nums text-[#0F172A] dark:text-[#F8FAFC]">
                    {lookup.upperTail.toFixed(4)}
                  </div>
                </div>
                <div className="px-2.5 py-2 rounded bg-white dark:bg-[#151F32] border border-[#E2E8F0] dark:border-[#243249]">
                  <div className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                    P(|Z| ≤ {lookup.roundedAbsLabel})
                  </div>
                  <div className="text-sm font-bold font-mono tabular-nums text-[#C2410C] dark:text-[#FB923C]">
                    {lookup.twoSidedMiddle.toFixed(4)}
                  </div>
                </div>
              </div>
            )}

            {lookup?.isNegative && (
              <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] font-mono">
                Tính đối xứng: Φ(−{lookup.roundedAbsLabel}) = 1 − Φ({lookup.roundedAbsLabel}) = 1 −{' '}
                {lookup.phiAbs.toFixed(4)} = {lookup.phiZ.toFixed(4)}
              </p>
            )}
            {lookup && !lookup.inTableRange && (
              <p className="text-[11px] text-[#B45309] dark:text-[#FBBF24]">
                Giá trị |z| &gt; 3,09 vượt ngoài phạm vi bảng in (0,00 – 3,09); xác suất xấp xỉ{' '}
                {lookup.phiZ.toFixed(4)}.
              </p>
            )}
          </div>

          {/* Scrollable 0.0 - 3.0 Standard Normal Table */}
          <div
            className={`overflow-auto ${
              compact ? 'max-h-[460px]' : 'max-h-[560px]'
            }`}
          >
            <table className="w-full border-collapse text-right font-mono tabular-nums text-xs">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#0B4275] dark:bg-[#1E3A5F] text-white">
                  <th className="sticky left-0 z-20 bg-[#0B4275] dark:bg-[#1E3A5F] px-2.5 py-2 text-center font-bold border-r border-white/20">
                    z
                  </th>
                  {Z_TABLE_COLUMNS.map((col, colIdx) => {
                    const isColActive = lookup?.colIndex === colIdx;
                    return (
                      <th
                        key={col}
                        className={`px-2 py-2 font-semibold whitespace-nowrap transition-colors ${
                          isColActive
                            ? 'bg-[#C2410C] dark:bg-[#EA580C] text-white'
                            : ''
                        }`}
                      >
                        {col}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#243249]">
                {STANDARD_NORMAL_TABLE.map((row, rowIdx) => {
                  const isRowActive = lookup?.rowIndex === rowIdx;
                  return (
                    <tr
                      key={row.zRow}
                      className={
                        isRowActive
                          ? 'bg-[#FEF3C7]/60 dark:bg-[#78350F]/25'
                          : rowIdx % 2 === 0
                            ? 'bg-white dark:bg-[#151F32]'
                            : 'bg-[#F8FAFC] dark:bg-[#11192B]'
                      }
                    >
                      <td
                        className={`sticky left-0 z-10 px-2.5 py-1.5 text-center font-bold border-r border-[#D6DCE2] dark:border-[#2B3B54] ${
                          isRowActive
                            ? 'bg-[#C2410C] dark:bg-[#EA580C] text-white'
                            : 'bg-[#F3F5F7] dark:bg-[#182338] text-[#0F172A] dark:text-[#F8FAFC]'
                        }`}
                      >
                        {row.zRow}
                      </td>
                      {row.values.map((val, colIdx) => {
                        const isExactCell =
                          lookup?.rowIndex === rowIdx && lookup?.colIndex === colIdx;
                        const isColActive = lookup?.colIndex === colIdx;
                        return (
                          <td key={colIdx} className="p-0">
                            <button
                              type="button"
                              onClick={() => handleSelectCell(rowIdx, colIdx)}
                              title={`z = ${(rowIdx * 0.1 + colIdx * 0.01).toFixed(2)} → Φ(z) = ${val}`}
                              className={`w-full px-2 py-1.5 text-right transition-colors cursor-pointer ${
                                isExactCell
                                  ? 'bg-[#C2410C] dark:bg-[#EA580C] text-white font-bold'
                                  : isColActive || isRowActive
                                    ? 'bg-[#FEF3C7]/50 dark:bg-[#78350F]/20 text-[#0F172A] dark:text-[#F8FAFC] font-medium'
                                    : 'text-[#334155] dark:text-[#CBD5E1] hover:bg-[#E7F3F5] dark:hover:bg-[#1E3346]'
                              }`}
                            >
                              {val}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-3.5 py-2 bg-[#F8FAFC] dark:bg-[#0F172A] border-t border-[#E2E8F0] dark:border-[#243249] text-[11px] text-[#64748B] dark:text-[#94A3B8]">
            Nhấp vào bất kỳ ô số nào để xem ngay Φ(z), P(Z &gt; z) và P(|Z| ≤ z). Nguồn: Phụ lục đề thi STA2005 (DUE).
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-4 overflow-y-auto max-h-[540px]">
          <div className="space-y-3">
            {STA_FORMULA_REFERENCE.map((item) => (
              <div
                key={item.title}
                className="p-3.5 rounded bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#243249]"
              >
                <div className="text-xs font-bold text-[#0B4275] dark:text-[#38BDF8] mb-1">
                  {item.title}
                </div>
                <div className="text-xs sm:text-[13px] font-mono leading-relaxed text-[#0F172A] dark:text-[#F8FAFC]">
                  {item.formula}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded bg-[#E7F3F5] dark:bg-[#122631] border border-[#B6D4DA] dark:border-[#244A5C] space-y-1.5 text-xs text-[#334155] dark:text-[#CBD5E1]">
            <div className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              Quy tắc tra bảng chuẩn hóa nhanh
            </div>
            <p className="font-mono">• P(Z ≤ −a) = Φ(−a) = 1 − Φ(a)</p>
            <p className="font-mono">• P(Z &gt; a) = 1 − Φ(a)</p>
            <p className="font-mono">• P(a ≤ Z ≤ b) = Φ(b) − Φ(a)</p>
            <p className="font-mono">• X ~ N(μ, σ²) ⇒ Z = (X − μ) / σ ~ N(0, 1)</p>
          </div>
        </div>
      )}
    </div>
  );
};
