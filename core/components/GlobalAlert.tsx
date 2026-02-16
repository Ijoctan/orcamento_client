"use client";

import { useSelector } from "react-redux";
import AlertMessage from "./AlertMessage";
import type { RootState } from "@/core/store/store";

export default function GlobalAlert() {
  const message = useSelector((state: RootState) => state.orcamento.error);
  return <AlertMessage message={message} />;
}
