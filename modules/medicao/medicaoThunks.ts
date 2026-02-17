import { createAsyncThunk } from "@reduxjs/toolkit";
import { medicaoService } from "./services/medicaoService";
import { handleApiError } from "@/core/utils/handleApiError";
import type { Medicao } from "./types/medicao.types";
import type { CriarMedicaoDTO } from "./types/medicao.dto";

export const fetchMedicoesPorOrcamento = createAsyncThunk<
  Medicao[],
  number,
  { rejectValue: string }
>(
  "medicao/fetchByOrcamento",
  async (orcamentoId, { rejectWithValue }) => {
    try {
      return await medicaoService.listar(orcamentoId);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchMedicaoById = createAsyncThunk<
  Medicao,
  { orcamentoId: number; medicaoId: number },
  { rejectValue: string }
>(
  "medicao/fetchById",
  async ({ orcamentoId, medicaoId }, { rejectWithValue }) => {
    try {
      return await medicaoService.buscarPorId(orcamentoId, medicaoId);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createMedicao = createAsyncThunk<
  Medicao,
  { orcamentoId: number; dto: CriarMedicaoDTO },
  { rejectValue: string }
>(
  "medicao/create",
  async ({ orcamentoId, dto }, { rejectWithValue }) => {
    try {
      return await medicaoService.criar(orcamentoId, dto);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const validarMedicao = createAsyncThunk<
  Medicao,
  { orcamentoId: number; medicaoId: number },
  { rejectValue: string }
>(
  "medicao/validar",
  async ({ orcamentoId, medicaoId }, { rejectWithValue }) => {
    try {
      return await medicaoService.validar(orcamentoId, medicaoId);
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
