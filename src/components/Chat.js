import React, { useState, useEffect } from 'react';
import { ChatDialog } from './ChatDialog';
import { ChatFooter } from './ChatFooter';
import { ChatHeader } from './ChatHeader';

export function Chat(props) {
  const [changeInputValue, setChangeInputValue] = useState('');

  //При получении данных для диалога, записываем их в state
  function getDialogComplite(value) {
    props.setDialog(oldArray => [...oldArray, value])
  }

  //При клике на ссылку
  function changeTextQuestion (value) {
    setChangeInputValue(value)
  }

  return (
    <div className='chat'>
      <ChatHeader clearDialog={props.clearDialog}/>
      <ChatDialog dialog={props.dialog} changeTextQuestion={changeTextQuestion}/>
      <ChatFooter getDialogComplite={getDialogComplite} changeInputValue={changeInputValue} />
    </div>
  );
}