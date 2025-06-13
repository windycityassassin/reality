import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Create root reducer
const rootReducer = combineReducers({
  // Add your reducers here as needed
  // Example: fighters: fightersReducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
