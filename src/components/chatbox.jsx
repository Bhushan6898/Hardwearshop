import React, { useState, useRef, useEffect } from "react";
import { Card, ListGroup, Form, Button, Spinner, InputGroup } from "react-bootstrap";

// Utility function to parse bot messages into text and code blocks
const parseBotMessage = (text) => {
    const regex = /```(\w+)?\n([\s\S]*?)```/g; // matches ```lang\ncode\n``` blocks
    let lastIndex = 0;
    const elements = [];

    let match;
    while ((match = regex.exec(text)) !== null) {
        const [fullMatch, lang, code] = match;
        // Text before this code block
        if (match.index > lastIndex) {
            const plainText = text.slice(lastIndex, match.index).trim();
            if (plainText) {
                elements.push({ type: "text", content: plainText });
            }
        }
        elements.push({ type: "code", lang: lang || "", content: code.trim() });
        lastIndex = regex.lastIndex;
    }

    // Remaining text after last code block
    if (lastIndex < text.length) {
        const remainingText = text.slice(lastIndex).trim();
        if (remainingText) {
            elements.push({ type: "text", content: remainingText });
        }
    }

    return elements;
};

// Rendering function for message content that handles text and code separately
const renderMessageContent = (text) => {
    const elements = parseBotMessage(text);

    return elements.map((el, idx) => {
        if (el.type === "text") {
            return (
                <p key={idx} style={{ marginBottom: "8px", whiteSpace: "pre-wrap" }}>
                    {el.content}
                </p>
            );
        } else if (el.type === "code") {
            return (
                <pre
                    key={idx}
                    style={{
                        background: "#f4f4f4",
                        padding: "10px",
                        borderRadius: "4px",
                        overflowX: "auto",
                        marginBottom: "8px",
                        fontFamily: "Consolas, monospace",
                    }}
                >
                    <code>{el.content}</code>
                </pre>
            );
        }
        return null;
    });
};

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [botTyping, setBotTyping] = useState(""); // bot typing animation text
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, botTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-r1:free",
                    messages: [{ role: "user", content: input }],
                }),
            });


            if (!response.ok) throw new Error("Failed to fetch");

            const data = await response.json();
            const botFullMessage = data.choices[0].message.content;

            // Animate bot typing effect, character by character
            let index = 0;
            setBotTyping("");
            const typingInterval = setInterval(() => {
                setBotTyping((prev) => prev + botFullMessage.charAt(index));
                index++;
                if (index >= botFullMessage.length) {
                    clearInterval(typingInterval);
                    // Add full bot message to messages
                    setMessages((prev) => [...prev, { text: botFullMessage, sender: "bot" }]);
                    setBotTyping("");
                    setLoading(false);
                }
            }, 20); // ms per character typing speed
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { text: "Sorry, something went wrong.", sender: "bot" },
            ]);
            setLoading(false);
        }
    };

    return (
        <Card className="mx-auto shadow" style={{ maxWidth: "700px", marginTop: "70px" }}>
            <Card.Header className="bg-primary d-flex justify-content-center">
                <h5 className="mb-0 text-white">SmartTalk</h5>
            </Card.Header>

            <Card.Body
                style={{ maxHeight: "400px", overflowY: "auto", backgroundColor: "#f9f9f9" }}
            >
                <ListGroup variant="flush">
                    {messages.map((msg, idx) => (
                        <ListGroup.Item
                            key={idx}
                            className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                                }`}
                        >
                            <div
                                className={`p-2 rounded ${msg.sender === "user" ? "bg-primary text-white" : "bg-light text-dark"
                                    }`}
                                style={{ maxWidth: "75%", wordBreak: "break-word" }}
                            >
                                <strong>{msg.sender === "user" ? "" : ""}</strong>{" "}
                                {renderMessageContent(msg.text)}
                            </div>
                        </ListGroup.Item>
                    ))}


                    {botTyping && (
                        <ListGroup.Item className="d-flex justify-content-start">
                            <div
                                className="p-2 rounded bg-light text-dark"
                                style={{ maxWidth: "75%", wordBreak: "break-word" }}
                            >
                                <strong>Assistant:</strong> {renderMessageContent(botTyping)}
                            </div>
                        </ListGroup.Item>
                    )}

                    {/* Loading spinner */}
                    {loading && (
                        <ListGroup.Item className="d-flex justify-content-start align-items-center">
                            <Spinner animation="border" size="sm" className="me-2" />
                            SmartTalk is thinking...
                        </ListGroup.Item>
                    )}

                    <div ref={messagesEndRef} />
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                <Form onSubmit={handleSend}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                            aria-label="User message"
                            autoComplete="off"
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading || !input.trim()}
                            className="ms-2"
                        >
                            Send
                        </Button>
                    </InputGroup>
                </Form>
            </Card.Footer>
        </Card>
    );
};

export default Chatbox;
