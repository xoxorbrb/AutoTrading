"use client";

import { useState } from "react";
import { StrategyBar } from "@/components/controls/StrategyBar";

export default function Page() {
  const [selectedStrategy, setSelectedStrategy] = useState("ema_rsi_vol");

  return (
    <main className="p-6">
      <StrategyBar
        selectedStrategy={selectedStrategy}
        onChange={setSelectedStrategy}
      />
    </main>
  );
}
