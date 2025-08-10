/**
 * 당일 체결 내역
 */
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import type { Trade } from "@/services/types";

export const TradesTable: React.FC<{ trades: Trade[] }> = ({ trades }) => {
  // 일 선택 시, 해당 일의 체결 내역을 표로 표시
  return (
    <Card className="shadow-sm">
      <CardContent className="p-3">
        <div className="text-base font-semibold mb-2">당일 체결 내역</div>
        <div className="max-h-64 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th className="py-1">시간</th>
                <th className="py-1">사이드</th>
                <th className="py-1">가격</th>
                <th className="py-1">수량(SOL)</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-1">{new Date(t.time).toLocaleString()}</td>
                  <td
                    className={`py-1 font-medium ${
                      t.side === "BUY" ? "text-blue-600" : "text-red-600"
                    }`}
                  >
                    {t.side}
                  </td>
                  <td className="py-1">
                    {t.price.toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}
                  </td>
                  <td className="py-1">{t.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
