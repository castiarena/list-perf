import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import testDataReducer from '../features/testData/testDataSlice';
import perfMeasureReducer from '../features/perfMeasure/perfMeasureSlice';

export const store = configureStore({
  reducer: {
    testData: testDataReducer,
    perfMeasure: perfMeasureReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
