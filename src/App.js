import axios from 'axios';
import React, { useState, useEffect } from "react";
import "./App.css";
import { Chat } from "./components/Chat";

export function App() {
  const [isOpenChat, setOpenChat] = useState(false);
  const [isNewSession, setNewSession] = useState(() => {
    const saved = localStorage.getItem("isNewSession");
    if (saved === null) {
      return true
    } else {
      return saved === 'true' ? true : false 
    }
  });
  const [cuid, setCuid] = useState('');
  const uuid = '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4';

  //При изменениии состояния сессии, записываем состояние bool isNewSession
  useEffect(() => {
    localStorage.setItem("isNewSession", isNewSession.toString());
  }, [isNewSession]);

  //Инициализация чата(получение cuid)
  useEffect(async() => {
    if (isNewSession) {
      setCuid(await getCuid())
    }
  }, []);

  // Если сессия новая , получаем cuid и меняем состояние сессии 
  useEffect(async () => {
    if (isNewSession && isOpenChat) {
      setCuid(await getCuid())
      setNewSession(false)
    }
  }, [isNewSession])

  // Если открываем чат, меняем состояние сессии
  useEffect( () => {
     if (isOpenChat) {
      setNewSession(false)
    }
  }, [isOpenChat])

  // Переключение состояния чата с открыто/закрыто
  function changeStateChat() {
    setOpenChat(!isOpenChat)
  }

  // Устанавливаем новую сессию
  async function clearDialog() {
    setNewSession(true)
  }
  
  async function getCuid() {
    try {
      let res = await axios.post('https://biz.nanosemantics.ru/api/2.1/json/Chat.init', { "uuid": uuid })
      if (res.status === 200) {
        localStorage.setItem('cuid', res.data.result.cuid.toString())
        res = await axios.post('https://biz.nanosemantics.ru/api/2.1/json/Chat.init', { "uuid": uuid, 'cuid': res.data.result.cuid.toString() })
        if (res.status === 200) {
          return res.data.result.cuid.toString()
        }
      }
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <div className="app">
      <div className="app-left-column">
        <h2>Чат-бот 👉</h2>
      </div>
      <div className="app-right-column">
        <div className="app-right-column_content">
          {isOpenChat ? <Chat cuid={cuid} clearDialog={clearDialog} isNewSession={isNewSession}/> : null}
        </div>
        <div className="app-right-column_btn">
          <button className="btn-chat" onClick={changeStateChat}> {isOpenChat ? 'Закрыть' : 'Открыть'}</button>
        </div>
      </div>
    </div>
  );
}


