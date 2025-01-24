import { configureStore } from "@reduxjs/toolkit";
import mapsReducer from "../features/maps/mapSlice.ts"

export const store = configureStore({
    reducer: {
        maps: mapsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;