import React from 'react';

// Lista de modelos de produção e preview obtida da documentação oficial da Groq
// (https://console.groq.com/docs/models)
const AVAILABLE_GROQ_MODELS = [
  // Modelos de Produção
  { id: 'gemma2-9b-it', name: 'Gemma2 9B IT (Google)' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile (Meta)' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant (Meta)' },
  { id: 'llama3-70b-8192', name: 'Llama3 70B (8192 tokens, Meta)' },
  { id: 'llama3-8b-8192', name: 'Llama3 8B (8192 tokens, Meta)' },
  // Modelos de Preview (usar com cautela, podem ser descontinuados)
  { id: 'allam-2-7b', name: 'Allam-2 7B (SDAIA) - Preview' },
  { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 Distill Llama 70B - Preview' },
  { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', name: 'Llama 4 Maverick 17B (Meta) - Preview' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout 17B (Meta) - Preview' },
  { id: 'meta-llama/Llama-Guard-4-12B', name: 'Llama Guard 4 12B (Meta) - Preview' },
  { id: 'mistral-saba-24b', name: 'Mistral Saba 24B - Preview' },
  { id: 'qwen-qwq-32b', name: 'Qwen QwQ 32B (Alibaba) - Preview' },
  // Modelos de Speech-to-text e Text-to-speech omitidos por enquanto, pois o foco é chat
  // { id: 'whisper-large-v3', name: 'Whisper Large v3 (OpenAI)' },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  disabled?: boolean;
  models?: { id: string; name: string }[]; // Permite passar uma lista de modelos customizada
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModel, 
  onModelChange, 
  disabled, 
  models = AVAILABLE_GROQ_MODELS 
}) => {
  return (
    <div className="p-4 bg-slate-700">
      <label htmlFor="model-select" className="block text-sm font-medium text-slate-300 mb-1">
        Escolha o Modelo Groq:
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        disabled={disabled}
        className="w-full p-3 border border-slate-500 rounded-lg bg-slate-600 text-slate-50 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {models.map(model => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
export { AVAILABLE_GROQ_MODELS }; // Exporta para uso no App.tsx

