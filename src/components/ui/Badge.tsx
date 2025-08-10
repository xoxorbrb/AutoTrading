// 한글 주석: 뱃지 (간단 버전)
import { ReactNode } from "react";

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${className}`}
    >
      {children}
    </span>
  );
}
