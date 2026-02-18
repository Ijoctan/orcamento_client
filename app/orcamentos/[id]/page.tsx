"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";
import { finalizeOrcamento } from "@/modules/orcamento/orcamentoThunks";
import { fetchItensPorOrcamento, deleteItem } from "@/modules/item/itemThunks";
import { fetchMedicoesPorOrcamento,validarMedicao, } from "@/modules/medicao/medicaoThunks";

import type { AppDispatch, RootState } from "@/core/store/store";

export default function DetalheOrcamento() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(id);

  const itens = useSelector((state: RootState) => state.item.lista);
  const loadingItens = useSelector((state: RootState) => state.item.loading);

  const medicoes = useSelector((state: RootState) => state.medicao.lista);
  const loadingMedicoes = useSelector((state: RootState) => state.medicao.loading);

  const [orcamento, setOrcamento] = useState<any>(null);
  const [loadingOrcamento, setLoadingOrcamento] = useState(true);

  useEffect(() => {
    if (!Number.isFinite(orcamentoId)) return;

    async function carregarOrcamento() {
      try {
        const data = await orcamentoService.buscarPorId(orcamentoId);
        setOrcamento(data);
      } finally {
        setLoadingOrcamento(false);
      }
    }

    carregarOrcamento();
  }, [orcamentoId]);

  useEffect(() => {
    if (!Number.isFinite(orcamentoId)) return;
    dispatch(fetchItensPorOrcamento(orcamentoId));
  }, [dispatch, orcamentoId]);

  useEffect(() => {
    if (!Number.isFinite(orcamentoId)) return;
    dispatch(fetchMedicoesPorOrcamento(orcamentoId));
  }, [dispatch, orcamentoId]);
  
  const handleFinalizar = async () => {
    await dispatch(finalizeOrcamento(orcamentoId)).unwrap();
  };
  
  if (loadingOrcamento) return <p>Carregando orçamento...</p>;
  if (!orcamento) return <p>Orçamento não encontrado</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Detalhe do Orçamento</h1>

      <section style={{ marginBottom: 24 }}>
        <p><strong>Protocolo:</strong> {orcamento.numeroProtocolo}</p>
        <p>
          <strong>Tipo:</strong>{" "}
          {orcamento.tipoOrcamento?.descricao}
        </p>
        <p><strong>Valor Total:</strong> R$ {orcamento.valorTotal}</p>
        <p><strong>Data Criação:</strong> {orcamento.dataCriacao}</p>
        <p><strong>Status:</strong> {orcamento.status}</p>
      </section>

      <section>
        <h2>Itens</h2>

        {loadingItens ? (
          <p>Carregando itens...</p>
        ) : itens.length === 0 ? (
          <p>Nenhum item cadastrado</p>
        ) : (
          <ul>
            {itens.map((item) => (
              <li key={item.id}>
                {item.descricao} — Qtd: {item.quantidade} — 
                Un R$: {item.valorUnitario} — 
                Total R$: {item.valorTotal} — 
                Qtd. acumulada: {item.quantidadeAcumulada} —  
                <button onClick={() => router.push(`/orcamentos/${orcamentoId}/itens/${item.id}/editar`)}>
                  Editar
                </button>
                <button
                  onClick={async () => {
                    const ok = confirm("Deseja realmente excluir este item?");
                    if (!ok) return;

                    await dispatch(deleteItem({ orcamentoId, itemId: item.id })).unwrap();
                  }}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>           
        )}
        <button onClick={() => router.push(`/orcamentos/${orcamentoId}/itens/novo`)}>
          Nova Medição
        </button>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Medições</h2>

        {loadingMedicoes ? (
          <p>Carregando medições...</p>
        ) : medicoes.length === 0 ? (
          <p>Nenhuma medição cadastrada</p>
        ) : (
          <ul>
            {medicoes.map((medicao) => (
              <li key={medicao.id}>
                Nº {medicao.numeroMedicao} — 
                Data: {medicao.dataMedicao} — 
                Total: R$ {medicao.valorTotal} — 
                Status: {medicao.status}

                <button
                  onClick={() =>
                    router.push(`/orcamentos/${orcamentoId}/medicoes/${medicao.id}`)
                  }
                >
                  Detalhar
                </button>
                {medicao.status === "ABERTA" && (
                  <button
                    onClick={async () => {
                      const ok = confirm("Deseja realmente validar esta medição?");
                      if (!ok) return;

                      try {
                        await dispatch(validarMedicao({ orcamentoId, medicaoId: medicao.id })).unwrap();

                        await Promise.all([
                          dispatch(fetchMedicoesPorOrcamento(orcamentoId)),
                          dispatch(fetchItensPorOrcamento(orcamentoId)),
                        ]);
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Validar Medição
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() =>
            router.push(`/orcamentos/${orcamentoId}/medicoes/nova`)
          }
        >
          Nova Medição
        </button>
      </section>

      <section style={{ marginTop: 24 }}>
        <button onClick={handleFinalizar}>
          Finalizar Orçamento
        </button>

        <button onClick={() => router.push(`/orcamentos/${orcamentoId}/editar`)}>
          Editar Orçamento
        </button>

        <button onClick={() => router.push("/")}>
          Voltar
        </button>
      </section>
    </main>
  );
}
