import React, {useState , useEffect} from 'react';
import { ChatDialog } from './ChatDialog';
import { ChatFooter } from './ChatFooter';
import { ChatHeader } from './ChatHeader';

export function Chat() {
    const[ session, setSession ] = useState([]);

    const dialog = [
        {
            user: true,
            text: 'Hello'
        },
        {
            bot: true,
            text: 'Hi, nice to meet you'
        },
        {
            bot: true,
            text: 'What are you question?'
        },
    ]
    return (
        <div className='chat'>
            <ChatHeader/>
            <ChatDialog dialog={dialog}/>
            <ChatFooter/>
        </div>
    );
}
