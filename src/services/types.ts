// services/types.ts  (공용 타입 정의)

export interface CandlePoint {
  // 개별 시점의 종가 데이터
  time: string; // ISO 또는 YYYY-MM-DD
  close: number; // 종가
}

export interface Trade {
  // 체결 내역(매수/매도)
  time: string; // ISO 시간
  side: "BUY" | "SELL"; // 사이드
  price: number; // 체결가
  qty: number; // 수량(SOL)
}

export interface DayData {
  // 일 단위 데이터(인트라데이)
  date: string; // YYYY-MM-DD
  series: CandlePoint[]; // 1시간 또는 15분봉 등 인트라데이
  trades: Trade[]; // 해당 일의 체결 내역
}

export interface MonthData {
  // 월 단위 데이터
  month: string; // YYYY-MM
  series: CandlePoint[]; // 일 종가 시계열
  days: DayData[]; // 자식 일 데이터
}

export interface YearData {
  // 연 단위 데이터
  year: string; // YYYY
  series: CandlePoint[]; // 일 종가 시계열(간단화)
  months: MonthData[]; // 자식 월 데이터
}
