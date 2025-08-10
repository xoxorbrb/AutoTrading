/**
 * +빨강/-파랑 수익률 뱃지
 */
import React from "react";
import { fmtPct } from "@/services/utils";

export const PctBadge: React.FC<{ value: number | null }> = ({ value }) => {
  // 등락률 값이 양수면 빨강, 음수면 파랑으로 표시
  if (value === null)
    return (
      <span className="px-2 py-0.5 rounded-full text-sm bg-gray-100 text-gray-500">
        --
      </span>
    );
  const positive = value >= 0;
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-sm font-medium ${
        positive ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
      }`}
    >
      {fmtPct(value)}
    </span>
  );
};
