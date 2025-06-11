const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());https://github.com/CasaleCasalert788/hannax1/tree/main
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
      max_tokens: 150
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log("Server listening on port", port));

