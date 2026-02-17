"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/core/store/store";

import { itemService } from "@/modules/item/services/itemService";
import { updateItem } from "@/modules/item/itemThunks";
import type { AtualizarItemDTO } from "@/modules/item/types/item.dto";

export default function EditarItemPage() {
  const params = useParams<{ id: string; itemId: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(params?.id);
  const itemId = Number(params?.itemId);
  
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [valorUnitario, setValorUnitario] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id || !params?.itemId) {
      setLoading(false);
      return;
    }
  
    const orcamentoIdParsed = Number(params.id);
    const itemIdParsed = Number(params.itemId);
  
    if (!Number.isFinite(orcamentoIdParsed) || !Number.isFinite(itemIdParsed)) {
      setLoading(false);
      return;
    }
  
    async function carregar() {
      try {
        const item = await itemService.buscarPorId(
          orcamentoIdParsed,
          itemIdParsed
        );
  
        setDescricao(item.descricao ?? "");
        setQuantidade(Number(item.quantidade ?? 0));
        setValorUnitario(Number(item.valorUnitario ?? 0));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    carregar();
  }, [params]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dto: AtualizarItemDTO = {
      itemId: itemId,
      descricao,
      quantidade,
      valorUnitario,
    };

    await dispatch(updateItem({ orcamentoId, dto })).unwrap();
    router.push(`/orcamentos/${orcamentoId}`);
  };

  if (loading) return <p>Carregando item...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Editar Item</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição</label>
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>

        <div>
          <label>Quantidade</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label>Valor Unitário</label>
          <input
            type="number"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit">Salvar</button>
        <button type="button" onClick={() => router.back()}>
          Cancelar
        </button>
      </form>
    </main>
  );
}
