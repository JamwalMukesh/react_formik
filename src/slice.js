import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    personalDetails: {
      name: '',
      age: '',
      sex: '',
      mobile: '',
      govIdType: '',
      govId: '',
    },
  },
  reducers: {
    updatePersonalDetails: (state, action) => {
      state.personalDetails = { ...state.personalDetails, ...action.payload };
    },
  },
});

export const { updatePersonalDetails } = formSlice.actions;

export const selectPersonalDetails = (state) => state.form.personalDetails;

export default formSlice.reducer;
