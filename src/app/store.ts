import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/CalendarSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
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
