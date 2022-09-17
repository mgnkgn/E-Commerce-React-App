import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    return await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .catch((error) => console.log(error.message));
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data) => {
    return await fetch(`https://fakestoreapi.com/products`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("ADD", data, json);
        return data;
      })
      .catch((error) => console.log(error.message));
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }) => {
    return await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("UPDATE", json, id, data);
        return data;
      })
      .catch((error) => console.log(error.message));
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    return await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((error) => console.log(error.message));
  }
);

const initialStateProducts = {
  data: JSON.parse(localStorage.getItem("productData")) || [],
  status: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialStateProducts,
  reducers: {
    deleteItem: (state, action) => {
      return state.data.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = true;
        state.error = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = false;
        localStorage.setItem("productData", JSON.stringify(state.data));
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = true;
        state.error = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.id !== action.payload["id"]
        );
        state.status = false;
        localStorage.setItem("productData", JSON.stringify(state.data));
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.status = true;
        state.error = "";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data];
        state.status = false;
        localStorage.setItem("productData", JSON.stringify(state.data));
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.status = true;
        state.error = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data];
        state.status = false;
        localStorage.setItem("productData", JSON.stringify(state.data));
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload;
      });
  },
});

export const ProductsActions = productsSlice.actions;

export default productsSlice.reducer;
