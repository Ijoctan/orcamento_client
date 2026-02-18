import { createAsyncThunk } from "@reduxjs/toolkit";
import { orcamentoService } from "./services/orcamentoService";
import { handleApiError } from "@/core/utils/handleApiError";
import type { Orcamento } from "./types/orcamento.types";
import type { CreateOrcamentoRequest, UpdateOrcamentoRequest } from "./types/orcamento.request";

export const fetchOrcamentos = createAsyncThunk<
  Orcamento[],
  void,
  { rejectValue: string }
>("orcamento/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await orcamentoService.listar();
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchOrcamentoById = createAsyncThunk<
  Orcamento,
  number,
  { rejectValue: string }
>("orcamento/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await orcamentoService.buscarPorId(id);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const createOrcamento = createAsyncThunk<
  Orcamento,
  CreateOrcamentoRequest,
  { rejectValue: string }
>("orcamento/create", async (data, { rejectWithValue }) => {
  try {
    return await orcamentoService.criar(data);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const updateOrcamento = createAsyncThunk<
  Orcamento,
  UpdateOrcamentoRequest,
  { rejectValue: string }
>("orcamento/update", async ({ id, tipoOrcamentoId, valorTotal }, { rejectWithValue }) => {
  try {
    return await orcamentoService.editar(id, { id, tipoOrcamentoId, valorTotal });
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const finalizeOrcamento = createAsyncThunk<
  Orcamento,
  number,
  { rejectValue: string }
>("orcamento/finalize", async (id, { rejectWithValue }) => {
  try {
    return await orcamentoService.finalizar(id);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
