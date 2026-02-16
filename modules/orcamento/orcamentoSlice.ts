import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Orcamento {
  id: number;
  numeroProtocolo: string;
  tipoOrcamento: string;
  valorTotal: number;
  status: string;
}

interface OrcamentoState {
  lista: Orcamento[];
  loading: boolean;
}

const initialState: OrcamentoState = {
  lista: [],
  loading: false,
};

const orcamentoSlice = createSlice({
  name: "orcamento",
  initialState,
  reducers: {
    setOrcamentos(state, action: PayloadAction<Orcamento[]>) {
      state.lista = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setOrcamentos, setLoading } = orcamentoSlice.actions;
export default orcamentoSlice.reducer;
