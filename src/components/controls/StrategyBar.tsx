/**
 * 전략 토글 (프리셋)
 */
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

export const StrategyBar: React.FC<{
  selectedStrategy: string;
  onChange: (v: string) => void;
}> = ({ selectedStrategy, onChange }) => {
  // 전략 프리셋 토글: 실제로는 백엔드 파라미터에 연결하여 백테스트/시그널 갱신
  return (
    <Card className="shadow-sm">
      <CardContent className="p-3 flex items-center justify-between gap-4">
        <div className="text-base font-semibold">전략 선택</div>
        <ToggleGroup
          type="single"
          value={selectedStrategy}
          onValueChange={(v) => v && onChange(v)}
        >
          <ToggleGroupItem
            value="ema_rsi_vol"
            current={selectedStrategy}
            onChange={onChange}
          >
            EMA + RSI + 거래량
          </ToggleGroupItem>
          <ToggleGroupItem
            value="ema_only"
            current={selectedStrategy}
            onChange={onChange}
          >
            EMA 크로스
          </ToggleGroupItem>
          <ToggleGroupItem
            value="rsi_mr"
            current={selectedStrategy}
            onChange={onChange}
          >
            RSI 역추세
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};
