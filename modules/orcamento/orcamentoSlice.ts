import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrcamentos,
  createOrcamento,
  updateOrcamento,
  finalizeOrcamento,
} from "./orcamentoThunks";
import type { Orcamento } from "./types/orcamento.types";

interface OrcamentoState {
  lista: Orcamento[];
  loading: boolean;
  error: string | null;
}

const initialState: OrcamentoState = {
  lista: [],
  loading: false,
  error: null,
};

const orcamentoSlice = createSlice({
  name: "orcamento",
  initialState,
  reducers: {
    limparErro: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrcamentos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrcamentos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchOrcamentos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao buscar orçamentos";
      });

    builder
      .addCase(createOrcamento.pending, (state) => {
        state.error = null;
      })
      .addCase(createOrcamento.fulfilled, (state, action) => {
        state.lista.push(action.payload);
      })
      .addCase(createOrcamento.rejected, (state, action) => {
        state.error = action.payload ?? "Erro ao criar orçamento";
      });

    builder
      .addCase(updateOrcamento.pending, (state) => {
        state.error = null;
      })
      .addCase(updateOrcamento.fulfilled, (state, action) => {
        const index = state.lista.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.lista[index] = action.payload;
      })
      .addCase(updateOrcamento.rejected, (state, action) => {
        state.error = action.payload ?? "Erro ao editar orçamento";
      });

    builder
      .addCase(finalizeOrcamento.pending, (state) => {
        state.error = null;
      })
      .addCase(finalizeOrcamento.fulfilled, (state, action) => {
        const index = state.lista.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.lista[index] = action.payload;
      })
      .addCase(finalizeOrcamento.rejected, (state, action) => {
        state.error = action.payload ?? "Erro ao finalizar orçamento";
      });
  },
});

export const { limparErro } = orcamentoSlice.actions;
export default orcamentoSlice.reducer;
