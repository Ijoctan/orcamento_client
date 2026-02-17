"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/core/store/store";
import { CriarItemDTO } from "@/modules/item/types/item.dto";

import { createItem } from "@/modules/item/itemThunks";

export default function NovoItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(id);

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [valorUnitario, setValorUnitario] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        
  const dto: CriarItemDTO = {
        orcamentoId,
        descricao,
        quantidade,
        valorUnitario,
      };

    try {
      await dispatch(
        createItem({
          orcamentoId,
          dto
        })
      ).unwrap();

      router.push(`/orcamentos/${orcamentoId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Novo Item</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição</label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
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
