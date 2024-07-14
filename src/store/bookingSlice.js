import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    selectedHorse: null,
    date: null,
    timeSlot: null,
    name: '',
    email: '',
    phone: '',
    confirmed: false
  },
  reducers: {
    setBookingDetails(state, action) {
      return { ...state, ...action.payload };
    },
    confirmBooking(state) {
      state.confirmed = true;
    }
  }
});

export const { setBookingDetails, confirmBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
