import { api } from "@/core/api/axios";

export interface Orcamento {
  id: number;
  numeroProtocolo: string;
  tipoOrcamento: string;
  valorTotal: number;
  status: string;
}

export const orcamentoService = {
  listar: async (): Promise<Orcamento[]> => {
    const response = await api.get("/orcamentos");
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Orcamento> => {
    const response = await api.get(`/orcamentos/${id}`);
    return response.data;
  },

  criar: async (data: {
    tipoOrcamento: string;
    valorTotal: number;
  }): Promise<Orcamento> => {
    const response = await api.post("/orcamentos", data);
    return response.data;
  },

  editar: async (
    id: number,
    data: { tipoOrcamento: string; valorTotal: number }
  ): Promise<Orcamento> => {
    const response = await api.put(`/orcamentos/${id}`, data);
    return response.data;
  },

  finalizar: async (id: number): Promise<Orcamento> => {
    const response = await api.put(`/orcamentos/${id}/finalizar`);
    return response.data;
  },
};
