import React from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string; // Opcional, pode ser adicionado depois
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-slate-800 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
      {messages.length === 0 && (
        <p className="text-center text-slate-400">Nenhuma mensagem ainda. Comece a conversa!</p>
      )}
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-md ${msg.sender === 'user' ? 'bg-sky-500 text-white rounded-br-none' : 'bg-slate-600 text-slate-50 rounded-bl-none'}`}>
            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            {/* Adicionar timestamp se disponível */}
            {msg.timestamp && (
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'} text-right`}>
                {msg.timestamp}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
export type { Message }; // Exporta o tipo Message para ser usado em outros lugares

