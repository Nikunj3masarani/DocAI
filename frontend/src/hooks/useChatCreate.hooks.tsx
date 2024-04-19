import { ChatCreateContext } from '@docAi-app/context';
import { useContext } from 'react';

const useChatCreate = () => {
    const context = useContext(ChatCreateContext);
    if (!context) {
        throw new Error('useChatCreate used outside ChatCreateContext');
    }
    return context;
};

export { useChatCreate };
