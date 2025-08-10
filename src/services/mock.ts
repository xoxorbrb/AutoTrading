import type { CandlePoint, DayData, MonthData, YearData, Trade } from "./types";
//Mock 데이터 생성: 실제 API 연동 전 임시용
function generateSeries(
  start: Date,
  points: number,
  stepDays = 1,
  base = 100,
  vol = 0.03
): CandlePoint[] {
  // 단순 랜덤 워크 기반의 일간 종가 시계열 생성 (데모용)
  const arr: CandlePoint[] = [];
  let price = base;
  for (let i = 0; i < points; i++) {
    const r = (Math.random() - 0.5) * 2 * vol; // 변동성
    price = Math.max(1, price * (1 + r));
    const d = new Date(start);
    d.setDate(d.getDate() + i * stepDays);
    arr.push({
      time: d.toISOString().slice(0, 10),
      close: Number(price.toFixed(2)),
    });
  }
  return arr;
}

function generateIntradaySeries(
  dateStr: string,
  intervals = 24,
  base = 110,
  vol = 0.01
): CandlePoint[] {
  // 인트라데이(시간봉) 시계열 생성 (데모용)
  const arr: CandlePoint[] = [];
  let price = base;
  const baseDate = new Date(dateStr + "T00:00:00");
  for (let i = 0; i < intervals; i++) {
    const r = (Math.random() - 0.5) * 2 * vol;
    price = Math.max(1, price * (1 + r));
    const d = new Date(baseDate);
    d.setHours(d.getHours() + i);
    arr.push({ time: d.toISOString(), close: Number(price.toFixed(2)) });
  }
  return arr;
}

export function buildMockData(): YearData[] {
  // 최근 2개년 데이터를 생성하고, 월/일 구조를 구성
  const now = new Date();
  const y1 = now.getFullYear().toString();
  const y0 = (now.getFullYear() - 1).toString();

  const years: YearData[] = [];
  for (const y of [y0, y1]) {
    const start = new Date(`${y}-01-01T00:00:00`);
    const yearSeries = generateSeries(
      start,
      365,
      1,
      100 + (y === y1 ? 15 : 0),
      0.025
    );

    const months: MonthData[] = [];
    for (let m = 1; m <= 12; m++) {
      const mm = String(m).padStart(2, "0");
      const monthStart = new Date(`${y}-${mm}-01T00:00:00`);
      const daysInMonth = new Date(Number(y), m, 0).getDate();
      const monthSeries = generateSeries(
        monthStart,
        daysInMonth,
        1,
        100 + m,
        0.03
      );

      const days: DayData[] = [];
      for (let d = 1; d <= Math.min(daysInMonth, 10); d++) {
        // 데모 무게 줄이기 위해 10일 제한
        const dd = String(d).padStart(2, "0");
        const date = `${y}-${mm}-${dd}`;
        const base = 100 + m + d;
        const intraday = generateIntradaySeries(date, 24, base, 0.01);
        // 임의의 체결 3개 생성 (매수/매도 교차)
        const trades: Trade[] = [];
        for (let k = 0; k < 3; k++) {
          const idx = Math.max(
            1,
            Math.floor(Math.random() * (intraday.length - 2))
          );
          const tp = intraday[idx];
          trades.push({
            time: tp.time,
            side: k % 2 === 0 ? "BUY" : "SELL",
            price: tp.close,
            qty: Math.round(1 + Math.random() * 3),
          });
        }
        days.push({ date, series: intraday, trades });
      }

      months.push({ month: `${y}-${mm}`, series: monthSeries, days });
    }

    years.push({ year: y, series: yearSeries, months });
  }
  return years;
}
