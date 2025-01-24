import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Map {
  _id: string;
  name: string;
  dimensions: string;
  price: number;
  image: string;
}

interface MapsState {
  maps: Map[];
  loading: boolean;
  error: string | null;
}

const initialState: MapsState = {
  maps: [],
  loading: false,
  error: null,
};

export const fetchMaps = createAsyncThunk("maps/fetchMaps", async () => {
  const response = await axios.get("http://localhost:3000/maps");
  return response.data;
});

const mapSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaps.fulfilled, (state, action) => {
        state.loading = false;
        state.maps = action.payload;
      })
      .addCase(fetchMaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch maps";
      });
  },
});

export default mapSlice.reducer;