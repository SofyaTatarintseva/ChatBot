import React from 'react';

export function ChatHeader(props) {

  // Перезапуск диалога, очищение хранилища
  function refreshDialog() {
    localStorage.clear()
    props.clearDialog()
  }

  return (
    <div className='chat-header'>
      <p className='chat-header-text'>Добро пожаловать в чат</p>
      <div onClick={refreshDialog} className="material-icons chat-header-image refresh" alt='Refresh' title='Перезапустить'>refresh</div>
    </div>
  );
}
