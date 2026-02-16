import { createAsyncThunk } from "@reduxjs/toolkit";
import { orcamentoService } from "./services/orcamentoService";

export const fetchOrcamentos = createAsyncThunk(
  "orcamento/fetchAll",
  async () => {
    return await orcamentoService.listar();
  }
);

export const fetchOrcamentoById = createAsyncThunk(
  "orcamento/fetchById",
  async (id: number) => {
    return await orcamentoService.buscarPorId(id);
  }
);
