require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001; // Backend port

// Middleware
app.use(cors()); // Enable CORS for all routes (for development)
// In production, configure CORS more restrictively:
// app.use(cors({ origin: 'YOUR_FRONTEND_URL' }));
app.use(express.json()); // To parse JSON request bodies

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.get("/api", (req, res) => {
    res.send("Groq Chatbot Backend está funcionando!");
});

app.post("/api/chat", async (req, res) => {
    const { message, model, history } = req.body;

    if (!message || !model) {
        return res.status(400).json({ error: "Mensagem e modelo são obrigatórios." });
    }

    if (!process.env.GROQ_API_KEY) {
        console.error("GROQ_API_KEY não está definida no .env");
        return res.status(500).json({ error: "Configuração do servidor incompleta. Chave API ausente." });
    }

    try {
        console.log(`Recebido para o modelo ${model}: ${message}`);
        
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                // TODO: Adicionar histórico da conversa se necessário e se a API suportar bem
                // Exemplo de como o histórico pode ser formatado (verificar documentação da Groq):
                // ...history.map(item => ({ role: item.sender, content: item.text })),
                {
                    role: "user",
                    content: message,
                },
            ],
            model: model,
            // Outros parâmetros opcionais como temperature, max_tokens, etc.
            // temperature: 0.7,
            // max_tokens: 1024,
        });

        const botResponse = chatCompletion.choices[0]?.message?.content || "Desculpe, não consegui processar sua solicitação.";
        console.log(`Resposta do modelo ${model}: ${botResponse}`);
        res.json({ reply: botResponse });

    } catch (error) {
        console.error("Erro ao chamar a API Groq:", error);
        let errorMessage = "Erro ao se comunicar com o modelo de linguagem.";
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
            errorMessage = error.response.data.error.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        res.status(500).json({ error: errorMessage });
    }
});

app.listen(port, () => {
    console.log(`Backend do Chatbot Groq rodando na porta ${port}`);
});

