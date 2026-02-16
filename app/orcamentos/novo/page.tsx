"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";

export default function NovoOrcamento() {
  const router = useRouter();
  const [tipoOrcamento, setTipoOrcamento] = useState("");
  const [valorTotal, setValorTotal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await orcamentoService.criar({
      tipoOrcamento,
      valorTotal: Number(valorTotal),
    });

    router.push("/");
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Novo Orçamento</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo:</label>
          <input
            value={tipoOrcamento}
            onChange={(e) => setTipoOrcamento(e.target.value)}
          />
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
