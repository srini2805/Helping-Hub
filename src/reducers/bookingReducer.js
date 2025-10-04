import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingList: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookingList.push(action.payload);
    },
    setBookings: (state, action) => {
      state.bookingList = action.payload;
    },
    deleteBooking: (state, action) => {
      state.bookingList = state.bookingList.filter(b => b._id !== action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookingList.findIndex(b => b._id === action.payload._id);
      if (index !== -1) state.bookingList[index] = action.payload;
    },
  },
});

export const { addBooking, setBookings, deleteBooking, updateBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
