import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';


export function ChatFooter(props) {
  const [question, setQuestion] = useState('');
  const refQuestion = useRef();

  useEffect(() => {
    if (props.changeInputValue) {
      refQuestion.current.value = props.changeInputValue
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
      refQuestion.current.value = ''
      setQuestion('')
      try {
        let res = await axios.post('https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.request', { 'cuid': cuid, 'text': question })
        if (res.status === 200) {
          props.getDialogComplite({
            bot: true,
            text: res.data.result.text.value
          })
        }
      } catch (e) {
        console.error(e)
      }
      
    }
  }

  return (
    <div className='chat-footer'>
      <input className='input-text' id='input2' ref={refQuestion} type='text' onChange={changeQuestion} onKeyPress={handleKeyPress} placeholder='Введите сообщение' />
      <button className='btn' onClick={sendQuestion}> Отправить </button>
    </div>
  );
}
