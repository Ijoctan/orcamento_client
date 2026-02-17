import { api } from "@/core/api/axios";
import type { Medicao } from "../types/medicao.types";
import type { CriarMedicaoDTO } from "../types/medicao.dto";

export const medicaoService = {
  listar: async (orcamentoId: number): Promise<Medicao[]> => {
    const response = await api.get(`/orcamentos/${orcamentoId}/medicoes`);
    return response.data;
  },

  buscarPorId: async (
    orcamentoId: number,
    medicaoId: number
  ): Promise<Medicao> => {
    const response = await api.get(
      `/orcamentos/${orcamentoId}/medicoes/${medicaoId}`
    );
    return response.data;
  },
  
  criar: async (
    orcamentoId: number,
    dto: CriarMedicaoDTO
  ): Promise<Medicao> => {
    const response = await api.post(
      `/orcamentos/${orcamentoId}/medicoes`,
      dto
    );
    return response.data;
  },

  validar: async (
    orcamentoId: number,
    medicaoId: number
  ): Promise<Medicao> => {
    const response = await api.put(
      `/orcamentos/${orcamentoId}/medicoes/${medicaoId}/validar`
    );
    return response.data;
  },
};
