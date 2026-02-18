"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateOrcamento } from "@/modules/orcamento/orcamentoThunks";
import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";
import { tipoOrcamentoService } from "@/modules/tipoOrcamento/services/tipoOrcamentoService";
import type { TipoOrcamento } from "@/modules/tipoOrcamento/types/tipoOrcamento.types";
import type { AppDispatch } from "@/core/store/store";

export default function EditOrcamentoPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [tipos, setTipos] = useState<TipoOrcamento[]>([]);
  const [tipoId, setTipoId] = useState<number | null>(null);
  const [valorTotal, setValorTotal] = useState<number>(0);

  useEffect(() => {
    async function carregar() {
      const [orcamentoData, tiposData] = await Promise.all([
        orcamentoService.buscarPorId(Number(id)),
        tipoOrcamentoService.listar(),
      ]);

      setTipos(tiposData.filter((t) => t.ativo));

      const t = (orcamentoData as any).tipoOrcamento;
      if (t && typeof t === "object") {
        setTipoId(Number(t.id ?? t.tipoOrcamentoId ?? null));
      } else if (typeof t === "number") {
        setTipoId(t);
      } else {
        setTipoId(null);
      }

      setValorTotal(orcamentoData.valorTotal);
    }

    carregar();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        updateOrcamento({
          id: Number(id),
          tipoOrcamentoId: tipoId ?? 1,
          valorTotal: Number(valorTotal),
        })
      ).unwrap();

      router.push(`/orcamentos/${id}`);
    } catch {

    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Editar Orçamento</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Orçamento:</label>
          <select
            value={tipoId ?? ""}
            onChange={(e) => setTipoId(Number(e.target.value))}
            required
          >
            <option value="">Selecione</option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.descricao}
              </option>
            ))}
          </select>
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
