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
    /**
     * 일정 생성 시 임시로 기간 영역을 표시하기 위해 만들었던 일정을 삭제하기 위한 함수
     * @param state 기존 state
     * @returns 타이틀이 있는 정상 일정들만 리턴
     */
    deleteTempEvent: (state) => {
      const events = state.events.filter((e) => e.title);
      return { ...state, events };
    },
    /**
     * 선택한 일정을 저장하기 위함
     * @param state 기존 state
     * @param action 선택된 일정
     */
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
