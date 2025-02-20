import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/productTypes";
import type { RootState } from "@/app/store";
import fetchProducts from "./productsAPI";

interface ProductsState {
  products: Product[];
  selectedProject: string | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = {
  products: [],
  selectedProject: undefined,
  status: "loading",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle actions defined in our fetch
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;

        state.selectedProject = action.payload[0].id;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { init } = productsSlice.actions;

export default productsSlice.reducer;

// selectors
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductStatus = (state: RootState) => state.products.status;
export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProject;

export const fetchAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();

    return response;
  }
);
