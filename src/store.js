import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./reducers/bookingReducer";

export const store = configureStore({
  reducer: {
    bookings: bookingReducer,
  },
});
