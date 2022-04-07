import React from 'react';

export function ChatDialogUser(props) {
  return (
    <div className='chat-main-dialog'>
      <div className='chat-main-dialog_text' >{props.text}</div>
      <img className='avatar' src='/avatar_user.webp' alt='avatar-user' />
    </div>
  )
}
export function ChatDialogBot(props) {

  function handleClick(e) {
    e.preventDefault();
    props.changeTextQuestion('LTE')
  }

  let text = props.text.replace(/<br\s*[\/]?>/gi, '\n')
  let link = text.slice(text.indexOf('<userlink>'), text.indexOf('<userlink/>'))
  let linkText;

  if (link) {
    const linkNew = link.replace(/[<]?[<\/]userlink\s*[\/]?[>]?/gm, '')
    const srcLink = link.replaceAll(" ", "+")
    text = text.replace(`${link}.`, '')
    linkText = () => <a href='' onClick={handleClick}>{linkNew}</a>
  }
  
  return (
    <div className='chat-main-dialog'>
      <img className='avatar' src='/avatar_bot.webp' alt='avatar-bot' />
      <div className='chat-main-dialog_text'>
        {text}
        {link ? linkText(): null}
      </div>
    </div>
  )
}

export function ChatDialog(props) {
  const role = props.dialog.map((el, index) => {
    return el.user ? <ChatDialogUser text={el.text} key={index} /> : <ChatDialogBot changeTextQuestion={props.changeTextQuestion} text={el.text} key={index} />
  })

  return (
    <div className='chat-main'>
      {role}
    </div>
  );
}
