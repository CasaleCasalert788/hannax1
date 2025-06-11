const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000;

// ✅ Configura OpenAI con la tua chiave (meglio se usi variabili d'ambiente su Render)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(bodyParser.json());

// ✅ Endpoint per ricevere domande dal frontend
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Messaggio mancante" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Sei Hanna AI, un'assistente amichevole e competente." },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    res.json({ answer: response });
  } catch (error) {
    console.error("Errore nella chiamata OpenAI:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server avviato su http://localhost:${port}`);
});
