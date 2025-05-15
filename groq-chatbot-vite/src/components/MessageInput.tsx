import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-slate-700 border-t border-slate-600">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Digite sua mensagem..."
        disabled={disabled}
        className="flex-grow p-3 border border-slate-500 rounded-lg bg-slate-600 text-slate-50 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mr-3"
      />
      <button
        type="submit"
        disabled={disabled || !inputValue.trim()}
        className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enviar
      </button>
    </form>
  );
};

export default MessageInput;

