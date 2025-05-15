import React, { useState, useEffect, useRef } from 'react';
import './index.css';
// import ChatWindow from './components/ChatWindow'; // ChatWindow não está sendo usado diretamente, App.tsx é o container principal
import MessageList, { Message } from './components/MessageList';
import MessageInput from './components/MessageInput';
import ModelSelector, { AVAILABLE_GROQ_MODELS } from './components/ModelSelector'; // Importa a lista de modelos

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bem-vindo ao Groq Chat! Escolha um modelo e comece a conversar.',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [selectedModel, setSelectedModel] = useState<string>(AVAILABLE_GROQ_MODELS[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Chamada real ao backend
      const response = await fetch('http://localhost:3001/api/chat', { // Assume que o backend roda na porta 3001
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text, model: selectedModel }), // Envia o modelo selecionado
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Erro ao conectar com o bot: ${error.message}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    const modelName = AVAILABLE_GROQ_MODELS.find(m => m.id === modelId)?.name || modelId;
    const systemMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: `Modelo alterado para: ${modelName}`,
        sender: 'bot', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prevMessages => [...prevMessages, systemMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 items-center justify-center font-sans">
      <div className="w-full max-w-3xl h-full md:h-[90vh] md:max-h-[700px] bg-slate-800 shadow-2xl rounded-none md:rounded-lg flex flex-col overflow-hidden">
        <header className="p-4 bg-slate-700 border-b border-slate-600 text-center">
          <h1 className="text-2xl font-semibold text-sky-400">Groq Chatbot Interface</h1>
        </header>
        
        <ModelSelector 
          selectedModel={selectedModel} 
          onModelChange={handleModelChange} 
          disabled={isLoading} 
          models={AVAILABLE_GROQ_MODELS} // Passa a lista de modelos atualizada
        />

        <MessageList messages={messages} />
        <div ref={messagesEndRef} />

        {isLoading && (
            <div className="p-3 text-center text-sm text-sky-400 bg-slate-700 border-t border-slate-600">
                O modelo está pensando...
            </div>
        )}

        <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;

