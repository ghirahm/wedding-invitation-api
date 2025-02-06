const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const Message = require("./models/Message");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test DB Connection
sequelize.sync()
    .then(() => console.log("Database connected."))
    .catch((err) => console.error("Error connecting database:", err));

// Create a new message
app.post("/messages", async (req, res) => {
    try {
        const { chat_id, sender_name, is_sender, message_data } = req.body;
        const message = await Message.create({ chat_id, sender_name, is_sender, message_data });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
});

// Get all messages for a chat
app.get("/messages/:chat_id", async (req, res) => {
    try {
        const { chat_id } = req.params;
        const messages = await Message.findAll({ where: { chat_id } });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve messages" });
    }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
