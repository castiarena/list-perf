export interface Measure {
  phase: "mount" | "update";
  actual: number;
  base: number;
}

export type PerfCase = "plainList" | "reactWindow";

export type PerfMeasureState = {
  [key in PerfCase]: Measure[];
};

export const initialState: PerfMeasureState = {
  reactWindow: [],
  plainList: [],
};
