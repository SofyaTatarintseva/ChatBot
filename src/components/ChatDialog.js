import React from 'react';

export function ChatDialogUser (props) {
    return (
        <div className='chat-main-dialog'>
            <div className='chat-main-dialog_text' >{props.text}</div>
            <img className='avatar' src='/avatar_user.webp' alt='avatar-user'/>
        </div>
    )
}
export function ChatDialogBot (props) {
    return (
        <div className='chat-main-dialog'>
            <img className='avatar' src='/avatar_bot.webp' alt='avatar-bot'/>
            <div className='chat-main-dialog_text'>{props.text}</div>
        </div>
    )
}

export function ChatDialog(props) {

const role = props.dialog.map((el, index) => {
    return el.user ?  <ChatDialogUser text={el.text} key={index}/> : <ChatDialogBot text={el.text} key={index}/>
}) 

    return (
        <div className='chat-main'>
            {role}
        </div>
    );
}
