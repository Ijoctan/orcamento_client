"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";
import { useDispatch } from "react-redux";
import { finalizeOrcamento } from "@/modules/orcamento/orcamentoThunks";
import type { AppDispatch } from "@/core/store/store";
import { useRouter } from "next/navigation";

export default function DetalheOrcamento() {
  const { id } = useParams();
  const [orcamento, setOrcamento] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handleFinalizar = async () => {
    await dispatch(finalizeOrcamento(Number(id)));
  };
  const router = useRouter();

  useEffect(() => {
    async function carregar() {
      const data = await orcamentoService.buscarPorId(Number(id));
      setOrcamento(data);
    }

    carregar();
  }, [id]);

  if (!orcamento) return <p>Carregando...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Detalhe do Orçamento</h1>

      <p>Protocolo: {orcamento.numeroProtocolo}</p>
      <p>Tipo: {orcamento.tipoOrcamento}</p>
      <p>Valor Total: R${orcamento.valorTotal}</p>
      <p>Status: {orcamento.status}</p>
      <button onClick={handleFinalizar}>
        Finalizar Orçamento
      </button>
      <button onClick={() => router.push(`/orcamentos/${id}/editar`)}>
        Editar
      </button>
      <button onClick={() => router.push("/")}>
        Voltar
      </button>

    </main>
  );
}
