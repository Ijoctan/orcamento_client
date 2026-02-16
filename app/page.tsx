"use client";

import Link from "next/link";
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

      <Link href="/orcamentos/novo">
        <button>Criar Novo Orçamento</button>
      </Link>

      {loading && <p>Carregando...</p>}

      <ul>
        {lista.map((orcamento) => (
          <li key={orcamento.id}>
            <Link href={`/orcamentos/${orcamento.id}`}>
              {orcamento.numeroProtocolo} - {orcamento.tipoOrcamento} - R${orcamento.valorTotal}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
