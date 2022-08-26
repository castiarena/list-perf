import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { initialState, Measure, PerfCase } from "./interfaces";

export const perfMeasureSlice = createSlice({
  name: "perfMeasure",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    addMeasure: (
      state,
      action: PayloadAction<{ case: PerfCase; measure: Measure }>
    ) => {
      state[action.payload.case].push(action.payload.measure);
    },
  },
});

export const { reset, addMeasure } = perfMeasureSlice.actions;

export const selectPerfMeasure = (state: RootState) => state.perfMeasure;

export default perfMeasureSlice.reducer;
