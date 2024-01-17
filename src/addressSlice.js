import { createSlice } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressDetails: {
      address: '',
      state: '',
      city: '',
      country: '',
      pincode: '',
    },
  },
  reducers: {
    updateAddressDetails: (state, action) => {
      state.addressDetails = { ...state.addressDetails, ...action.payload };
    },
  },
});

export const { updateAddressDetails } = addressSlice.actions;

export const selectAddressDetails = (state) => state.address.addressDetails;

export default addressSlice.reducer;
