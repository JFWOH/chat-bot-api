import React from 'react';

const ChatWindow: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white w-full max-w-2xl mx-auto shadow-2xl rounded-lg overflow-hidden">
      {/* Header (opcional, pode ser adicionado depois) */}
      <div className="p-4 bg-slate-700 border-b border-slate-600">
        <h1 className="text-xl font-semibold text-sky-400">Groq Chatbot</h1>
      </div>

      {/* Área de Mensagens (será o MessageList) */}
      <div className="flex-grow p-4 overflow-y-auto">
        <p className="text-slate-400">Carregando mensagens...</p>
        {/* Exemplo de mensagem */}
        <div className="mb-4">
          <div className="bg-sky-500 text-white p-3 rounded-lg max-w-xs ml-auto">
            <p>Olá! Esta é uma mensagem do usuário.</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="bg-slate-600 text-white p-3 rounded-lg max-w-xs mr-auto">
            <p>Olá! Esta é uma resposta do bot.</p>
          </div>
        </div>
      </div>

      {/* Área de Input (será o MessageInput e ModelSelector) */}
      <div className="p-4 bg-slate-700 border-t border-slate-600">
        <p className="text-slate-400">Controles de input aqui...</p>
      </div>
    </div>
  );
};

export default ChatWindow;

