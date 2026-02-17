import { api } from "@/core/api/axios";
import type { Item, CriarItemDTO, AtualizarItemDTO } from "../types/item.types";

export const itemService = {
  listarPorOrcamento: async (orcamentoId: number): Promise<Item[]> => {
    const { data } = await api.get(`/orcamentos/${orcamentoId}/itens`);
    return data;
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
};
