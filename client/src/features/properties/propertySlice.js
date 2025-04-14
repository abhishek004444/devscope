import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    category: "",
  },
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilters, clearFilters } = propertySlice.actions;

export const selectFilters = (state) => state.properties.filters;
export default propertySlice.reducer;
