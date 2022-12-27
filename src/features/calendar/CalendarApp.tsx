import { FC, useState } from "react";
import MonthCalendar from "react-calendar";
import {
  Calendar,
  Views,
  momentLocalizer,
  Event,
  SlotInfo,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import styled from "styled-components";
import { createEvent, setSelectedEvent } from "./CalendarSlice";
import { useAppDispatch } from "../../app/hooks";

const CalendarAppWrapper = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-gap: 20px;
  .rbc-allday-cell {
    display: none;
  }
  .rbc-time-view .rbc-header {
    border-bottom: none;
  }
  .rbc-calendar {
    border-left: 1px solid #a0a096;
    padding: 10px;
  }
  .react-calendar {
    border: none;
  }
`;

const localizer = momentLocalizer(moment);

interface Props {
  events: Event[];
  onSelectSlot: (start: Date, end: Date) => void;
  onSelectModal: () => void;
}

const CalendarApp: FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();

  const { events, onSelectSlot, onSelectModal } = props;

  const [date, setDate] = useState(new Date());

  /**
   * the fuction when select the duration in weekly calendar
   */
  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    dispatch(createEvent({ start, end }));
    onSelectSlot(start, end);
  };

  /**
   * the fuction when select an event in weekly calendar
   * @param event selected event
   */
  const handleSelectEvent = (event: Event) => {
    dispatch(setSelectedEvent(event));
    onSelectModal();
  };

  return (
    <CalendarAppWrapper>
      <MonthCalendar onChange={setDate} value={date} calendarType={"US"} />
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 100px)" }}
        view={Views.WEEK}
        views={[Views.WEEK]}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        date={date}
        onNavigate={setDate}
      />
    </CalendarAppWrapper>
  );
};

export default CalendarApp;
