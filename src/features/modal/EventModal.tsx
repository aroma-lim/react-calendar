import React, { FC, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { IoTrashOutline } from "react-icons/io5";
import { HiPencil } from "react-icons/hi";
import {
  deleteEvent,
  deleteTempEvent,
  editEvent,
  selectedEvent,
  setSelectedEvent,
} from "../calendar/CalendarSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)",
    border: "none",
  },
  overlay: {
    backgroundColor: "transparent",
  },
};

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const ButtonWrapper = styled.button`
  border-block: none;
  border-inline: none;
  margin-left: 10px;
  :hover {
    background-color: #bdc1c6;
    cursor: pointer;
  }
`;

const TitleInput = styled.input`
  height: 35px;
  border-inline: none;
  border-width: 0 0 4px;
  border-color: #4285f4;
  font-size: 20px;
  margin-bottom: 10px;

  :focus-visible {
    outline: none;
  }
`;

const Title = styled.div`
  height: 35px;
  border-inline: none;
  border-width: 0 0 4px;
  border-color: #4285f4;
  border-style: solid;
  font-size: 20px;
  margin-bottom: 10px;
`;

const TimeArea = styled.div`
  font-weight: normal;
  text-align: left;
  font-size: 14px;
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const SaveButton = styled.button`
  width: 65px;
  height: 35px;
  background-color: #4285f4;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
  border-block: none;
  border-inline: none;
  :hover {
    background-color: #1a73e8;
    cursor: pointer;
  }
`;

Modal.setAppElement("#root");

function dateFormat(start: Date, end: Date) {
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const newDate =
    start.getMonth() +
    1 +
    "/" +
    start.getDate() +
    " (" +
    day[start.getDay()] +
    ") " +
    start.getHours() +
    ":" +
    (start.getMinutes() === 0 ? "00" : start.getMinutes()) +
    " - " +
    end.getHours() +
    ":" +
    (end.getMinutes() === 0 ? "00" : end.getMinutes());
  return newDate;
}

interface Props {
  isModalOpen: boolean;
  eventTime?: { start: Date; end: Date };
  onClose: () => void;
  onSaveEvent: (title: string) => void;
}

const EventModal: FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();

  const { isModalOpen, eventTime, onClose, onSaveEvent } = props;

  const sEvent = useAppSelector(selectedEvent);

  const [title, setTitle] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };

  const resetModal = () => {
    setTitle("");
    onClose();
    setIsEditMode(false);
    dispatch(deleteTempEvent());
    dispatch(setSelectedEvent({}));
  };

  const closeModal = () => {
    resetModal();
  };

  const handleSave = () => {
    onSaveEvent(title);
    resetModal();
  };

  const handleDelete = () => {
    notify();
    if (sEvent) {
      dispatch(deleteEvent(sEvent));
      resetModal();
    }
  };

  const notify = () => {
    toast("The event has been deleted.", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleEdit = () => {
    setIsEditMode(true);
    if (sEvent?.title) setTitle(sEvent?.title?.toString());
  };

  const handleEditSave = () => {
    if (sEvent) dispatch(editEvent({ event: sEvent, newTitle: title }));
    resetModal();
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ModalWrapper>
          <ModalHeader>
            <ButtonWrapper onClick={closeModal}>X</ButtonWrapper>
            {sEvent?.title && !isEditMode ? (
              <>
                <ButtonWrapper onClick={handleDelete}>
                  <IoTrashOutline />
                </ButtonWrapper>
                <ButtonWrapper onClick={handleEdit}>
                  <HiPencil />
                </ButtonWrapper>
              </>
            ) : null}
          </ModalHeader>
          {sEvent?.title && !isEditMode ? (
            <Title>{sEvent.title}</Title>
          ) : (
            <TitleInput
              value={title}
              onChange={handleChange}
              autoFocus
              placeholder="Add title"
            />
          )}
          {sEvent?.start && sEvent?.end ? (
            <TimeArea>{dateFormat(sEvent?.start, sEvent.end)}</TimeArea>
          ) : (
            <TimeArea>
              {eventTime ? dateFormat(eventTime.start, eventTime.end) : null}
            </TimeArea>
          )}
          {title !== "" && (
            <ModalFooter>
              {isEditMode ? (
                <SaveButton onClick={handleEditSave}>Edit</SaveButton>
              ) : (
                <SaveButton onClick={handleSave}>Save</SaveButton>
              )}
            </ModalFooter>
          )}
        </ModalWrapper>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default EventModal;
