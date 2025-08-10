/**
 * 연/월/일 선택 + 수익률 배지
 *
 */
import React from "react";
import { CalendarDays } from "lucide-react";
import type { YearData } from "@/services/types";
import { percentChange } from "@/services/utils";
import { PctBadge } from "@/components/common/PctBadge";

// 단일 Pill 버튼 컴포넌트 (활성/비활성 스타일)
const Pill: React.FC<{
  active?: boolean;
  onClick?: () => void;
  label: string;
  pct: number | null;
}> = ({ active, onClick, label, pct }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition ${
        active
          ? "bg-black/90 text-white border-black"
          : "bg-white hover:bg-black/5 border-black/10"
      }`}
    >
      <span className="font-medium">{label}</span>
      <PctBadge value={pct} />
    </button>
  );
};

export const YearMonthDayPicker: React.FC<{
  years: YearData[];
  yearSel?: string | null;
  monthSel?: string | null; // YYYY-MM
  daySel?: string | null; // YYYY-MM-DD
  onYear: (y: string) => void;
  onMonth: (m: string) => void;
  onDay: (d: string) => void;
}> = ({ years, yearSel, monthSel, daySel, onYear, onMonth, onDay }) => {
  // 선택된 연/월 데이터를 찾고, 각 레벨의 등락률을 계산
  const year = years.find((y) => y.year === yearSel) || null;
  const months = year?.months || [];
  const month = months.find((m) => m.month === monthSel) || null;
  const days = month?.days || [];

  return (
    <div className="grid gap-3">
      {/* 연도 선택 행 */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 mr-2 text-sm opacity-70">
          <CalendarDays className="w-4 h-4" />
          연도
        </div>
        {years.map((y) => (
          <Pill
            key={y.year}
            label={y.year}
            pct={percentChange(y.series)}
            active={y.year === yearSel}
            onClick={() => onYear(y.year)}
          />
        ))}
      </div>

      {/* 월 선택 행 */}
      {year && (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 mr-2 text-sm opacity-70">
            월
          </div>
          {months.map((m) => (
            <Pill
              key={m.month}
              label={m.month.slice(5)}
              pct={percentChange(m.series)}
              active={m.month === monthSel}
              onClick={() => onMonth(m.month)}
            />
          ))}
        </div>
      )}

      {/* 일 선택 행 */}
      {month && (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 mr-2 text-sm opacity-70">
            일
          </div>
          {days.map((d) => (
            <Pill
              key={d.date}
              label={d.date.slice(8)}
              pct={percentChange(d.series)}
              active={d.date === daySel}
              onClick={() => onDay(d.date)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
