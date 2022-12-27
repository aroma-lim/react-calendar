import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Event } from "react-big-calendar";

export interface CalendarState {
  events: Event[];
  selectedEvent?: Event;
}

const initialState: CalendarState = {
  events: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,

  reducers: {
    createEvent: (state, action: PayloadAction<Event>) => {
      const events = [...state.events, action.payload];
      return { ...state, events };
    },
    deleteEvent: (state, action: PayloadAction<Event>) => {
      const events = state.events.filter(
        (e) =>
          e.title !== action.payload.title ||
          e.start !== action.payload.start ||
          e.end !== action.payload.end
      );
      return { ...state, events };
    },
    deleteTempEvent: (state) => {
      const events = state.events.filter((e) => e.title);
      return { ...state, events };
    },
    setSelectedEvent: (state, action: PayloadAction<Event>) => {
      state.selectedEvent = action.payload;
    },
    editEvent: (
      state,
      action: PayloadAction<{ event: Event; newTitle: string }>
    ) => {
      const events = state.events.map((e) => {
        if (
          e.title === action.payload.event.title &&
          e.start === action.payload.event.start &&
          e.end === action.payload.event.end
        ) {
          const newEvent = {
            title: action.payload.newTitle,
            start: action.payload.event.start,
            end: action.payload.event.end,
          };
          return newEvent;
        } else {
          return e;
        }
      });
      return { ...state, events };
    },
  },
});

export const {
  createEvent,
  deleteEvent,
  deleteTempEvent,
  setSelectedEvent,
  editEvent,
} = calendarSlice.actions;

export const eventlist = (state: RootState) => state.calendar.events;
export const selectedEvent = (state: RootState) => state.calendar.selectedEvent;

export default calendarSlice.reducer;
