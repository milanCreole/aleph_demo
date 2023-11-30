import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  locations: any[];
  error: string;
}

const initialState: AuthState = {
  locations: [],
  error: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    onSuccessGetLocations: (state, data) => {
      const {payload} = data;
      state.locations = payload;
    },
    onFailureGetLocations: (state) => {
      state.locations = [];
      state.error = 'No Data.';
    },
  },
});

export const {onSuccessGetLocations,onFailureGetLocations} = locationSlice.actions;

export default locationSlice.reducer;
