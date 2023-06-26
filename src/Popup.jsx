import React, { useState } from 'react';
import Form from './Form.jsx';
import Message from './Message.jsx';

const Popup = () => {
  const [message, setMessage] = useState(undefined);

  if (message) {
    return (<Message message={message} setMessage={setMessage}/>);
  }
  return (<Form setMessage={setMessage} />);
};

export default Popup;