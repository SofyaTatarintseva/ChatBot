import React, {useState, useRef} from 'react';


export function ChatFooter() {
    const[ question, setQuestion ] = useState('');
    const refQuestion = useRef();

    function changeQuestion (event){
        console.log(event.target.value)
        setQuestion(event.target.value)
    }
    function sendQuestion () {
        console.log(question)
        localStorage.setItem('question', question)
        refQuestion.current.value = ''
    }
    
    return (
        <div className='chat-footer'>
            <input className='input-text' ref={refQuestion} type='text' onChange={changeQuestion} placeholder='Введите сообщение'/>
            <button className='btn' onClick={sendQuestion}> Отправить </button>
        </div>
    );
}
