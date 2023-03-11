const { Router } = require("express");
const path = require("path");
const ChatManager = require("../managers/chat.manager");

const chatDbPath = path.join(__dirname, "../db/local/chat.json");

class ChatRoutes {
    path = "/chat";
    router = Router();
    ChatManager = new ChatManager(chatDbPath);

    constructor() {
        this.initChatRoutes()
    }

    initChatRoutes() {
        // Get Chat
        this.router.get(`${this.path}`, async (req, res) => {
            const limit = Number(req.query.limit);
            const chat = await this.ChatManager.getChat()

            if (!limit || limit >= chat.length)
                return res.status(200).json({
                    chat, message: `Getting all products, be carefull with the ${limit}`,
                });

            return res.status(200).json({
                chat: chat.slice(0, limit),
                message: "SUCCESS",
            });
        });

        // Post new message
        this.router.post(`${this.path}`, async (req, res) => {
            const { user, message } = req.body;
            await this.ChatManager.addMsg(user, message);
            return res.status(200).json({ message: "SUCCESS" });
        })
    }
}

module.exports = ChatRoutes;