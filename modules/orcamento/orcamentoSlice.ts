import { createSlice } from "@reduxjs/toolkit";
import { fetchOrcamentos } from "./orcamentoThunks";
import type { Orcamento } from "./services/orcamentoService";

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
  reducers: {},
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
      .addCase(fetchOrcamentos.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao buscar orçamentos";
      });
  },
});

export default orcamentoSlice.reducer;
