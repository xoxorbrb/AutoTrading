export function percentChange(
  series: { close: number }[] | undefined | null
): number | null {
  // 첫/마지막 종가 기준으로 등락률(%) 계산
  if (!series || series.length < 2) return null;
  const first = series[0].close;
  const last = series[series.length - 1].close;
  if (first === 0) return null;
  return ((last - first) / first) * 100;
}

export function fmtPct(n: number | null): string {
  // +3.08% / -1.25% 형태로 문자열 변환
  if (n === null) return "--";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}
