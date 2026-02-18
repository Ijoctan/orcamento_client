"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tipoOrcamentoService } from "@/modules/tipoOrcamento/services/tipoOrcamentoService";
import type { TipoOrcamento } from "@/modules/tipoOrcamento/types/tipoOrcamento.types";
import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";

export default function NovoOrcamento() {
  const router = useRouter();
  const [valorTotal, setValorTotal] = useState("");
  const [tipos, setTipos] = useState<TipoOrcamento[]>([]);
  const [tipoId, setTipoId] = useState<number | null>(null);

  useEffect(() => {
    async function carregarTipos() {
      const data = await tipoOrcamentoService.listar();
      setTipos(data.filter(t => t.ativo));
    }
    carregarTipos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await orcamentoService.criar({
      tipoOrcamentoId: tipoId ?? 1,
      valorTotal: Number(valorTotal),
    });

    router.push("/");
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Novo Orçamento</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Orçamento</label>
          <select
            value={tipoId ?? ""}
            onChange={(e) => setTipoId(Number(e.target.value))}
            required
          >
            <option value="">Selecione</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descricao}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Valor Total:</label>
          <input
            type="number"
            value={valorTotal}
            onChange={(e) => setValorTotal(e.target.value)}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </main>
  );
}
