"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateOrcamento } from "@/modules/orcamento/orcamentoThunks";
import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";
import type { AppDispatch } from "@/core/store/store";

export default function EditOrcamentoPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [tipo, setTipo] = useState("");
  const [valorTotal, setValorTotal] = useState<number>(0);

  useEffect(() => {
    async function carregar() {
      const data = await orcamentoService.buscarPorId(Number(id));
      setTipo(data.tipoOrcamento);
      setValorTotal(data.valorTotal);
    }
    carregar();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await dispatch(
        updateOrcamento({
            id: Number(id),
            tipoOrcamento: tipo,
            valorTotal: Number(valorTotal),
        })
        ).unwrap();

        router.push(`/orcamentos/${id}`);
    } catch { }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Editar Orçamento</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo:</label>
          <input
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </div>

        <div>
          <label>Valor Total:</label>
          <input
            type="number"
            value={valorTotal}
            onChange={(e) => setValorTotal(Number(e.target.value))}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </main>
  );
}
