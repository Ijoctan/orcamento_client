import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "@/core/utils/handleApiError";
import { itemService } from "./services/itemService";
import type { Item} from "./types/item.types"
import type { CriarItemDTO, AtualizarItemDTO } from "./types/item.dto"

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

export const deleteItem = createAsyncThunk<
  number,
  { orcamentoId: number; itemId: number },
  { rejectValue: string }
>("item/delete", async ({ orcamentoId, itemId }, { rejectWithValue }) => {
  try {
    await itemService.excluir(orcamentoId, itemId);
    return itemId; // devolve o id pra remover do state
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

