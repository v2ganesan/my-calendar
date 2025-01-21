import React from 'react';

const CreateEventButton = ({ onClick }) => {
  return (
    <button className="create-event-btn" onClick={onClick}>
      Create Event
    </button>
  );
};

export default CreateEventButton;
