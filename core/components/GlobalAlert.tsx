"use client";

import AlertMessage from "./AlertMessage";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/core/store/store";
import { limparErro } from "@/modules/orcamento/orcamentoSlice";
import { limparErroItem } from "@/modules/item/itemSlice";
import { limparErroMedicao } from "@/modules/medicao/medicaoSlice";

export default function GlobalAlert() {
  const dispatch = useDispatch<AppDispatch>();

  const errors = useSelector((state: RootState) => ({
    orcamento: state.orcamento.error,
    item: state.item.error,
    medicao: state.medicao.error,
  }));

  const source = errors.orcamento ? "orcamento" : errors.item ? "item" : errors.medicao ? "medicao" : null;
  const message = source === "orcamento" ? errors.orcamento : source === "item" ? errors.item : source === "medicao" ? errors.medicao : null;

  const handleClose = () => {
    if (source === "orcamento") dispatch(limparErro());
    else if (source === "item") dispatch(limparErroItem());
    else if (source === "medicao") dispatch(limparErroMedicao());
  };

  return <AlertMessage message={message} onClose={handleClose} />;
}
