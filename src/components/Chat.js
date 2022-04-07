import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ChatDialog } from './ChatDialog';
import { ChatFooter } from './ChatFooter';
import { ChatHeader } from './ChatHeader';

export function Chat(props) {
  const [dialog, setDialog] = useState(() => {
    const saved = localStorage.getItem("dialog");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [changeInputValue, setChangeInputValue] = useState('');

  //При изменениии состояния диалога, записываем состояние в хранилище
  useEffect(() => {
    localStorage.setItem("dialog", JSON.stringify(dialog));
  }, [dialog]);

   //При изменении сесиии, записываем данные их в state
   useEffect(async () => {
    if (props.isNewSession) {
      setDialog([await readyEvent()])
    }
  }, [props.cuid])

  async function readyEvent() {
    try {
      let res = await axios.post('https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.event', { 'cuid': props.cuid, 'euid': '00b2fcbe-f27f-437b-a0d5-91072d840ed3' })
      if (res.status === 200) {
        return {
          bot: true,
          text: res.data.result.text.value
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  //При получении данных для диалога, записываем их в state
  function getDialogComplite(value) {
    setDialog(oldArray => [...oldArray, value])
  }

  //При клике на ссылку
  function changeTextQuestion (value) {
    setChangeInputValue(value)
  }

  return (
    <div className='chat'>
      <ChatHeader clearDialog={props.clearDialog}/>
      <ChatDialog dialog={dialog} changeTextQuestion={changeTextQuestion}/>
      <ChatFooter getDialogComplite={getDialogComplite} changeInputValue={changeInputValue} />
    </div>
  );
}
