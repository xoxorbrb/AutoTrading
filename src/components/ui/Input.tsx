// 한글 주석: 기본 인풋
import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 ${
        props.className ?? ""
      }`}
    />
  );
}
