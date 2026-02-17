import { api } from "@/core/api/axios"
import type { Item} from "../types/item.types"
import type { CriarItemDTO, AtualizarItemDTO } from "../types/item.dto"

export const itemService = {
  listarPorOrcamento: async (orcamentoId: number): Promise<Item[]> => {
    const { data } = await api.get(`/orcamentos/${orcamentoId}/itens`);
    return data;
  },

  buscarPorId: async (orcamentoId: number, itemId: number): Promise<Item> => {
    const res = await api.get(`/orcamentos/${orcamentoId}/itens/${itemId}`);
    return res.data;
  },

  criar: async (orcamentoId: number, dto: CriarItemDTO): Promise<Item> => {
    const { data } = await api.post(`/orcamentos/${orcamentoId}/itens`, dto);
    return data;
  },

  editar: async (
    orcamentoId: number,
    dto: AtualizarItemDTO
  ): Promise<Item> => {
    const { itemId, ...body } = dto;
    const { data } = await api.put(
      `/orcamentos/${orcamentoId}/itens/${itemId}`,
      body
    );
    return data;
  },

  excluir: async (orcamentoId: number, itemId: number): Promise<void> => {
    await api.delete(`/orcamentos/${orcamentoId}/itens/${itemId}`);
  },
  
};

