import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Chatbot() {

    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!message.trim()) return;

        try {

            setLoading(true);

            const res = await axios.post(
    "https://llm-chatbot-el2e.onrender.com/api/chat",
    {
        message,
    }
);

            setReply(res.data.reply);

        } catch (error) {

            console.log(error);
            setReply("Error getting AI response");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container">

            <div className="chat-card">

                <h1 className="title">
                    🤖 LLM AI Chatbot
                </h1>

                <p className="subtitle">
                    Powered by React + Node.js + Ollama
                </p>

                <div className="input-section">

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask anything..."
                        className="input-box"
                    />

                    <button
                        onClick={sendMessage}
                        className="send-btn"
                    >
                        Send
                    </button>

                </div>

                <div className="response-box">

                    <h3>AI Response</h3>

                    {
                        loading
                        ?
                        <p className="loading">
                            Thinking...
                        </p>
                        :
                        <p className="reply-text">
                            {reply || "Your AI response appears here"}
                        </p>
                    }

                </div>

            </div>

        </div>
    );
}

export default Chatbot;