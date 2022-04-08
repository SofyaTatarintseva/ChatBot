import React, { useState, useRef, useEffect } from 'react';
import { getAnswer } from '../apiChat'

export function ChatFooter(props) {
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (props.changeInputValue) {
      setQuestion(props.changeInputValue)
    }
  }, [props.changeInputValue])
  
  //Сохраняем значения из input
  function changeQuestion(event) {
    setQuestion(event.target.value)
  }

  //Отправка значения по Enter
  function handleKeyPress(event) {
    if (event.key == 'Enter') {
      sendQuestion();
    }
  }

  async function sendQuestion() {
    if (question.trim() !== '') {
      props.getDialogComplite({
        user: true,
        text: question
      })
      const cuid = localStorage.getItem('cuid')
      setQuestion('')
      try {
        let res = await getAnswer({ 'cuid': cuid, 'text': question })
        props.getDialogComplite(res)
        
      } catch (e) {
        console.error(e)
      }
      
    }
  }

  return (
    <div className='chat-footer'>
      <input value={question} className='input-text' type='text' onChange={changeQuestion} onKeyPress={handleKeyPress} placeholder='Введите сообщение' />
      <button className='btn' onClick={sendQuestion}> Отправить </button>
    </div>
  );
}
