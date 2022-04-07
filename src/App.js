import React, { useState, useEffect } from "react";
import "./App.css";
import { Chat } from "./components/Chat";
import { initUserChat, initNewUserChat, readyEvent } from './apiChat'

export function App() {
  const [isOpenChat, setOpenChat] = useState(false);
  const [cuid, setCuid] = useState(() => {
    return localStorage.getItem("cuid") || '';
  });
  const [dialog, setDialog] = useState(() => {
    const saved = localStorage.getItem("dialog");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const uuid = '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4';
  const euid = '00b2fcbe-f27f-437b-a0d5-91072d840ed3';


  //При изменениии состояния диалога, записываем состояние в хранилище
  useEffect(() => {
    localStorage.setItem("dialog", JSON.stringify(dialog));
  }, [dialog]);

  // Инициализация чата(получение cuid)
  useEffect(async () => {
    if (!cuid) {
      let cuidVal = await initNewUserChat({ "uuid": uuid })
      setCuid(cuidVal)
      setDialog([await readyEvent({ 'cuid': cuidVal, 'euid': euid })])
    }
  }, [cuid])

  // Инициализация чата(при перезагрузке страницы)
  useEffect(() => {
    if(cuid) {
      initUserChat({'uuid': uuid, 'cuid': cuid})
    }
  }, [])

  // Переключение состояния чата с открыто/закрыто
  function changeStateChat() {
    setOpenChat(!isOpenChat)
  }

  // Устанавливаем новую сессию
  function clearDialog() {
    setCuid('')
  }

  return (
    <div className="app">
      <div className="app-left-column">
        <h2>Чат-бот 👉</h2>
      </div>
      <div className="app-right-column">
        <div className="app-right-column_content">
          {isOpenChat ? <Chat dialog={dialog} clearDialog={clearDialog} setDialog={setDialog} /> : null}
        </div>
        <div className="app-right-column_btn">
          <button className="btn-chat" onClick={changeStateChat}> {isOpenChat ? 'Закрыть' : 'Открыть'}</button>
        </div>
      </div>
    </div>
  );
}
