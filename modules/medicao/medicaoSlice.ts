import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMedicoesPorOrcamento,
  fetchMedicaoById,
  createMedicao,
  validarMedicao
} from "./medicaoThunks";
import type { Medicao } from "./types/medicao.types";

interface MedicaoState {
  lista: Medicao[];
  medicaoSelecionada: Medicao | null;
  loading: boolean;
  error: string | null;
}

const initialState: MedicaoState = {
  lista: [],
  medicaoSelecionada: null,
  loading: false,
  error: null,
};

const medicaoSlice = createSlice({
  name: "medicao",
  initialState,
  reducers: {
    limparErroMedicao: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchMedicoesPorOrcamento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicoesPorOrcamento.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchMedicoesPorOrcamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao buscar medições";
      })

      .addCase(fetchMedicaoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicaoById.fulfilled, (state, action) => {
        state.loading = false;
        state.medicaoSelecionada = action.payload;
      })
      .addCase(fetchMedicaoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao buscar medição";
      })

      .addCase(createMedicao.fulfilled, (state, action) => {
        state.lista.push(action.payload);
      })
      .addCase(createMedicao.rejected, (state, action) => {
        state.error = action.payload ?? "Erro ao criar medição";
      })

      .addCase(validarMedicao.fulfilled, (state, action) => {
        const index = state.lista.findIndex(
          (m) => m.id === action.payload.id
        );
        if (index !== -1) {
          state.lista[index] = action.payload;
        }
      })
      .addCase(validarMedicao.rejected, (state, action) => {
        state.error = action.payload ?? "Erro ao validar medição";
      });
  },
});

export const { limparErroMedicao } = medicaoSlice.actions;
export default medicaoSlice.reducer;
