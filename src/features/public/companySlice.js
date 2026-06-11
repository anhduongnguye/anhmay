import { createSlice } from '@reduxjs/toolkit';

const initialState = { company: {} };

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyRedux: (state, action) => { state.company = action.payload}
  },
});

export const { setCompanyRedux } = companySlice.actions;
export default companySlice.reducer;