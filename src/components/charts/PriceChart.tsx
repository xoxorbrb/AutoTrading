/**
 * 라인 차트 _ 매수/매도 마커
 *
 */
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  Brush,
} from "recharts";
import type { CandlePoint, Trade } from "@/services/types";

export const PriceChart: React.FC<{
  series: CandlePoint[];
  trades?: Trade[];
  height?: number;
  xFormatter?: (v: string) => string;
  title?: string;
}> = ({ series, trades = [], height = 420, xFormatter, title }) => {
  // 차트용 데이터 메모이제이션
  const data = useMemo(() => series?.map((p) => ({ ...p })), [series]);

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        {title && <div className="mb-2 text-lg font-semibold">{title}</div>}
        <div className="w-full" style={{ height }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={xFormatter}
                hide={data.length > 120}
              />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                formatter={(v: any) => [v, "종가"]}
                labelFormatter={(l) => new Date(l).toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="close"
                dot={false}
                strokeWidth={2}
              />
              {/* 매수/매도 지점 마커 (B/S 라벨) */}
              {trades?.map((t, i) => (
                <ReferenceDot
                  key={i}
                  x={t.time}
                  y={t.price}
                  r={6}
                  stroke="none"
                  fill={t.side === "BUY" ? "#0ea5e9" : "#ef4444"}
                  label={{
                    value: t.side === "BUY" ? "B" : "S",
                    position: "top",
                  }}
                />
              ))}
              {/* 데이터 길면 하단 브러시로 스크롤/줌 지원 */}
              {data.length > 120 && (
                <Brush height={24} travellerWidth={10} y={0} className="mt-2" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
