"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrcamentos } from "@/modules/orcamento/orcamentoThunks";
import { RootState, AppDispatch } from "@/core/store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { lista, loading } = useSelector(
    (state: RootState) => state.orcamento
  );

  useEffect(() => {
    dispatch(fetchOrcamentos());
  }, [dispatch]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Orçamentos</h1>

      {loading && <p>Carregando...</p>}

      <ul>
        {lista.map((o) => (
          <li key={o.id}>
            {o.numeroProtocolo} - {o.tipoOrcamento} - R$ {o.valorTotal}
          </li>
        ))}
      </ul>
    </main>
  );
}
