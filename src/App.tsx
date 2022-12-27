import { useCallback, useState } from "react";
import "./App.css";
import CalendarApp from "./features/calendar/CalendarApp";
import "react-calendar/dist/Calendar.css";
import Header from "./features/header/Header";
import EventModal from "./features/modal/EventModal";
import { createEvent, eventlist } from "./features/calendar/CalendarSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

function App() {
  const dispatch = useAppDispatch();

  const myEvents = useAppSelector(eventlist);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [eventTime, setEventTime] = useState<{ start: Date; end: Date }>();

  const openModal = (start: Date, end: Date) => {
    setIsModalOpen(true);
    setEventTime({ start, end });
  };

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onSaveEvent = useCallback(
    (title: string) => {
      if (title && eventTime) {
        const start = eventTime.start;
        const end = eventTime.end;
        dispatch(createEvent({ start, end, title }));
      }
    },
    [dispatch, eventTime]
  );

  const openSelectModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header />
      <CalendarApp
        events={myEvents}
        onSelectSlot={openModal}
        onSelectModal={openSelectModal}
      />
      <EventModal
        isModalOpen={isModalOpen}
        eventTime={eventTime}
        onClose={onCloseModal}
        onSaveEvent={onSaveEvent}
      />
    </div>
  );
}

export default App;
