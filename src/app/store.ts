import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
