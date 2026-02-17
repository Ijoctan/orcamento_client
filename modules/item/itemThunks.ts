import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "@/core/utils/handleApiError";
import { itemService } from "./services/itemService";
import type { Item, CriarItemDTO, AtualizarItemDTO } from "./types/item.types";

export const fetchItensPorOrcamento = createAsyncThunk<
  Item[],
  number,
  { rejectValue: string }
>("item/fetchByOrcamento", async (orcamentoId, { rejectWithValue }) => {
  try {
    return await itemService.listarPorOrcamento(orcamentoId);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const createItem = createAsyncThunk<
  Item,
  { orcamentoId: number; dto: CriarItemDTO },
  { rejectValue: string }
>("item/create", async ({ orcamentoId, dto }, { rejectWithValue }) => {
  try {
    return await itemService.criar(orcamentoId, dto);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const updateItem = createAsyncThunk<
  Item,
  { orcamentoId: number; dto: AtualizarItemDTO },
  { rejectValue: string }
>("item/update", async ({ orcamentoId, dto }, { rejectWithValue }) => {
  try {
    return await itemService.editar(orcamentoId, dto);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
