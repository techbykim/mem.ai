import React from 'react';

const Message = ({ message, setMessage }) => {

  const createAgain = () => {
    setMessage(undefined);
  }

  return (
    <>
        <h2>{message}</h2>
        <button onClick={createAgain}>Create Again</button>
    </>
  );
}

export default Message;