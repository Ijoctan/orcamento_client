import { createSlice } from "@reduxjs/toolkit";
import type { Item } from "./types/item.types";
import { fetchItensPorOrcamento, createItem, updateItem } from "./itemThunks";

interface ItemState {
  lista: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  lista: [],
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    limparErroItem: (state) => {
      state.error = null;
    },
    limparListaItem: (state) => {
      state.lista = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItensPorOrcamento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItensPorOrcamento.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchItensPorOrcamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao buscar itens do orçamento";
      })

      .addCase(createItem.pending, (state) => {
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.lista.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.error = action.payload ?? "Erro ao criar item";
      })

      .addCase(updateItem.pending, (state) => {
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const idx = state.lista.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.lista[idx] = action.payload;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.error = action.payload ?? "Erro ao editar item";
      });
  },
});

export const { limparErroItem, limparListaItem } = itemSlice.actions;
export default itemSlice.reducer;
