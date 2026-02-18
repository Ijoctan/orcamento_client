import { api } from "@/core/api/axios";
import type { TipoOrcamento } from "../types/tipoOrcamento.types";

export const tipoOrcamentoService = {
  listar: async (): Promise<TipoOrcamento[]> => {
    const response = await api.get("/tipo-orcamento");
    return response.data;
  },
};
