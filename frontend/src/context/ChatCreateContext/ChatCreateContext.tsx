import { createContext, useState } from 'react';

interface CreateChatContextType {
    isChatCreated: boolean;
    setIsChatCreated: (status: boolean) => void;
}

const CreateContextInitialValue = {
    isChatCreated: false,
    setIsChatCreated: (status: boolean) => {},
};

const ChatCreateContext = createContext<CreateChatContextType>(CreateContextInitialValue);

const ChatCreateContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isChatCreated, setIsChatCreated] = useState<boolean>(true);

    const newChatCreated = (newState: boolean) => {
        setIsChatCreated(newState);
    };

    return (
        <ChatCreateContext.Provider value={{ isChatCreated: isChatCreated, setIsChatCreated: newChatCreated }}>
            {children}
        </ChatCreateContext.Provider>
    );
};

export { ChatCreateContextProvider, ChatCreateContext };
