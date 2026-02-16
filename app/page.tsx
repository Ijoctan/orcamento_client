"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { setOrcamentos } from "@/modules/orcamento/orcamentoSlice";

export default function Home() {
  const dispatch = useDispatch();
  const orcamentos = useSelector(
    (state: RootState) => state.orcamento.lista
  );

  return (
    <main style={{ padding: "20px" }}>
      <h1>Sistema de Orçamentos</h1>

      <button
        onClick={() =>
          dispatch(
            setOrcamentos([
              {
                id: 1,
                numeroProtocolo: "1/2026-02",
                tipoOrcamento: "Reforma",
                valorTotal: 1000,
                status: "ABERTO",
              },
            ])
          )
        }
      >
        Testar Redux
      </button>

      <pre>{JSON.stringify(orcamentos, null, 2)}</pre>
    </main>
  );
}
