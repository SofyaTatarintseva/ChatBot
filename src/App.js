import React, { useState, useEffect } from "react";
import "./App.css";
import { Chat } from "./components/Chat";

export function App () {
  const [isOpenChat, setOpenChat ] = useState(false);

  function changeStateChat () {
    setOpenChat(!isOpenChat)
  }

  return(
    <div className="app">
      <div className="app-left-column">
        <h2>Чат-бот 👉</h2>
      </div>
      <div className="app-right-column">
        <div className="app-right-column_content">
          {isOpenChat ? <Chat/> : null}
        </div>
        <div className="app-right-column_btn">
          <button className="btn-chat" onClick={changeStateChat}> {isOpenChat ? 'Закрыть' : 'Открыть'}</button>
        </div>
      </div>
    </div>
  );
}


