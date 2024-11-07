import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        ...action.payload,
        id: state.products.length + 1,
      });
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
