import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import productsReducer from "./productsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist"], // products are NOT persisted — always fresh from "API"
};

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
