import { configureStore } from "@reduxjs/toolkit";
import orcamentoReducer from "@/modules/orcamento/orcamentoSlice";
import itemReducer from "@/modules/item/itemSlice";
import medicaoReducer from "@/modules/medicao/medicaoSlice";

export const store = configureStore({
    reducer: {
        orcamento: orcamentoReducer,
        item: itemReducer,
        medicao: medicaoReducer,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
