import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all bookings from DB
export const fetchBookings = createAsyncThunk("bookings/fetch", async () => {
  const response = await axios.get("http://localhost:5000/bookings");
  return response.data;
});

// Update booking status
export const updateBooking = createAsyncThunk(
  "bookings/update",
  async ({ id, status }) => {
    const response = await axios.put(`http://localhost:5000/bookings/${id}`, { status });
    return response.data;
  }
);

// Delete a booking
export const deleteBooking = createAsyncThunk("bookings/delete", async (id) => {
  await axios.delete(`http://localhost:5000/bookings/${id}`);
  return id;
});

const bookingSlice = createSlice({
  name: "bookings",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.list.findIndex(b => b._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.list = state.list.filter(b => b._id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;
