/*const axios = require("axios");

const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;

        const response = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: "llama3",
                prompt: message,
                stream: false
            }
        );

        res.json({
            reply: response.data.response
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Ollama Error"
        });
    }
};

module.exports = { chatWithAI }; */
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;

        const completion =
            await groq.chat.completions.create({

                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],

                model: "llama-3.1-8b-instant",
            });

        res.json({
            reply:
                completion.choices[0]
                ?.message?.content || "",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Groq Error",
        });
    }
};

module.exports = { chatWithAI };