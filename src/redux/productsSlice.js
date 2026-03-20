import { createSlice } from "@reduxjs/toolkit";
import { dummydata } from "../srore";

// Pure synchronous selector — no fake delays, no skeleton flash
// Called via useMemo in the component — instant, zero lag
export const selectFilteredProducts = (state) => {
  const { filters } = state.products;
  let result = [...dummydata];

  if (filters.category && filters.category !== "All Products") {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.minPrice > 0) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice < 200000) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }
  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  if (filters.sortBy === "price") {
    result.sort((a, b) =>
      filters.sortOrder === "desc" ? b.price - a.price : a.price - b.price
    );
  } else if (filters.sortBy === "name") {
    result.sort((a, b) =>
      filters.sortOrder === "desc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );
  }

  return result;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    filters: {
      category: "All Products",
      minPrice: 0,
      maxPrice: 200000,
      sortBy: "default",
      sortOrder: "asc",
      search: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        category: "All Products",
        minPrice: 0,
        maxPrice: 200000,
        sortBy: "default",
        sortOrder: "asc",
        search: "",
      };
    },
  },
});

export const { setFilters, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
