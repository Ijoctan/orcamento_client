import { api } from "@/core/api/axios";
import { handleApiError } from "@/core/utils/handleApiError";
import type { Orcamento } from "../types/orcamento.types";
import type {
  CreateOrcamentoRequest,
  UpdateOrcamentoRequest,
} from "../types/orcamento.request";

export const orcamentoService = {
  async listar(): Promise<Orcamento[]> {
    try {
      const response = await api.get<Orcamento[]>("/orcamentos");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async buscarPorId(id: number): Promise<Orcamento> {
    try {
      const response = await api.get<Orcamento>(`/orcamentos/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async criar(
    data: CreateOrcamentoRequest
  ): Promise<Orcamento> {
    try {
      const response = await api.post<Orcamento>("/orcamentos", data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async editar(
    id: number,
    data: UpdateOrcamentoRequest
  ): Promise<Orcamento> {
    try {
      const response = await api.put<Orcamento>(
        `/orcamentos/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async finalizar(id: number): Promise<Orcamento> {
    try {
      const response = await api.put<Orcamento>(
        `/orcamentos/${id}/finalizar`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};