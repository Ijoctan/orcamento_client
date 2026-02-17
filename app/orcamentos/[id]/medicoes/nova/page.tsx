"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/core/store/store";
import { fetchItensPorOrcamento } from "@/modules/item/itemThunks";
import { createMedicao } from "@/modules/medicao/medicaoThunks";

export default function NovaMedicaoPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(id);

  const itens = useSelector((state: RootState) => state.item.lista);

  const [observacao, setObservacao] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    if (!Number.isFinite(orcamentoId)) return;
    dispatch(fetchItensPorOrcamento(orcamentoId));
  }, [dispatch, orcamentoId]);

  const handleQuantidadeChange = (itemId: number, valor: number) => {
    setItensSelecionados((prev) => ({
      ...prev,
      [itemId]: valor,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itensParaEnviar = Object.entries(itensSelecionados)
      .filter(([_, quantidade]) => quantidade > 0)
      .map(([itemId, quantidade]) => ({
        itemOrcamentoId: Number(itemId),
        quantidadeMedida: quantidade,
      }));

    if (itensParaEnviar.length === 0) {
      alert("Selecione ao menos um item com quantidade válida.");
      return;
    }

    await dispatch(
      createMedicao({
        orcamentoId,
        dto: {
          observacao,
          itens: itensParaEnviar,
        },
      })
    ).unwrap();

    router.push(`/orcamentos/${orcamentoId}`);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Nova Medição</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Observação</label>
          <input
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </div>

        <h3>Itens disponíveis</h3>

        {itens.map((item) => (
          <div key={item.id} style={{ marginBottom: 12 }}>
            <strong>{item.descricao}</strong>  
            <div>
              Quantidade restante:{" "}
              {item.quantidade - item.quantidadeAcumulada}
            </div>

            <input
              type="number"
              min={0}
              max={item.quantidade - item.quantidadeAcumulada}
              placeholder="Quantidade medida"
              onChange={(e) =>
                handleQuantidadeChange(
                  item.id,
                  Number(e.target.value)
                )
              }
            />
          </div>
        ))}

        <button type="submit">Criar Medição</button>
        <button type="button" onClick={() => router.back()}>
          Cancelar
        </button>
      </form>
    </main>
  );
}
