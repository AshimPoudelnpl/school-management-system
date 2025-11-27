import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authState.js";
import { indexSlice } from "./features/indexSlice.js";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    [indexSlice.reducerPath]: indexSlice.reducer,
  },
  // to reduce seralized value  issues
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(indexSlice.middleware),
});
export const persistor = persistStore(store);
export default store;
