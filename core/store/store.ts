import { configureStore } from "@reduxjs/toolkit";
import orcamentoReducer from "@/modules/orcamento/orcamentoSlice";

export const store = configureStore({
    reducer: {
        orcamento: orcamentoReducer,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
