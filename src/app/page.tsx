"use client";

import { useEffect, useMemo, useState } from "react";
import { YearMonthDayPicker } from "@/components/pickers/YearMonthDayPicker";
import { PriceChart } from "@/components/charts/PriceChart";
import { TradesTable } from "@/components/trades/TradesTable";
import { StrategyBar } from "@/components/controls/StrategyBar"; // props가 selectedStrategy/onChange 버전인지 확인!
import type { YearData } from "@/services/types";
import { buildMockData } from "@/services/mock";

export default function Page() {
  // 선택 상태
  const [data, setData] = useState<YearData[]>([]);
  const [yearSel, setYearSel] = useState<string | null>(null);
  const [monthSel, setMonthSel] = useState<string | null>(null);
  const [daySel, setDaySel] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState("ema_rsi_vol");

  // 초기 mock 데이터 로드 (실데이터 붙일 땐 여기 교체)
  useEffect(() => {
    const d = buildMockData();
    setData(d);
    const lastYear = d[d.length - 1];
    setYearSel(lastYear?.year ?? null);
    setMonthSel(lastYear?.months[0]?.month ?? null);
    setDaySel(lastYear?.months[0]?.days[0]?.date ?? null);
  }, []);

  // 현재 선택된 구간 데이터
  const year = useMemo(
    () => data.find((y) => y.year === yearSel) || null,
    [data, yearSel]
  );
  const months = year?.months || [];
  const month = useMemo(
    () => months.find((m) => m.month === monthSel) || null,
    [months, monthSel]
  );
  const days = month?.days || [];
  const day = useMemo(
    () => days.find((d) => d.date === daySel) || null,
    [days, daySel]
  );

  // 선택 이벤트
  const onYear = (y: string) => {
    setYearSel(y);
    const yy = data.find((v) => v.year === y);
    setMonthSel(yy?.months[0]?.month ?? null);
    setDaySel(yy?.months[0]?.days[0]?.date ?? null);
  };
  const onMonth = (m: string) => {
    setMonthSel(m);
    const dd = year?.months.find((v) => v.month === m)?.days[0]?.date ?? null;
    setDaySel(dd);
  };
  const onDay = (d: string) => setDaySel(d);

  // 차트 바인딩
  const chartSeries = day
    ? day.series
    : month
    ? month.series
    : year?.series || [];
  const chartTrades = day ? day.trades : [];
  const chartTitle = day
    ? `${day.date} intraday`
    : month
    ? `${month.month} daily`
    : year
    ? `${year.year} daily`
    : "";
  const xFmt = day
    ? (iso: string) => new Date(iso).toLocaleTimeString()
    : month
    ? (d: string) => d.slice(5, 10)
    : (d: string) => d;

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-4">
      {/* 상단: 연/월/일 선택 + 각 구간 수익률 배지 */}
      <YearMonthDayPicker
        years={data}
        yearSel={yearSel}
        monthSel={monthSel}
        daySel={daySel}
        onYear={onYear}
        onMonth={onMonth}
        onDay={onDay}
      />

      {/* 중간: 선택 구간 그래프 (일 선택 시 매수/매도 마커 표시) */}
      <PriceChart
        series={chartSeries}
        trades={chartTrades}
        title={chartTitle}
        xFormatter={xFmt}
      />

      {/* 하단: 일 선택 시 체결표 */}
      {day && <TradesTable trades={day.trades} />}

      {/* 가장 아래: 전략 토글 */}
      <StrategyBar
        selectedStrategy={selectedStrategy}
        onChange={setSelectedStrategy}
      />
    </main>
  );
}
