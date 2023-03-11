const { Router } = require("express");
const ChatManager = require("../managers/chat.manager");

class ChatRoutes {
    path = "/chat";
    router = Router();
    chatManager = new ChatManager();

    constructor() {
        this.initChatRoutes()
    }

    initChatRoutes() {

        // Insert Chat
        this.router.get(`${this.path}/insert`, async (req, res) => {
            const chat = await this.chatManager.insertChat();
            res.status(200).json({
                message: "Products inserted successfully",
                chat,
            })
        });

        // Get Chat
        this.router.get(`${this.path}`, async (req, res) => {
            const limit = req.query.limit;
            const chat = await this.chatManager.getChat();

            if (!limit || limit >= chat.length)
                return res.status(200).json({
                    message: `Retrieving all messages.`,
                    warning: `There is no limit or limit is bigger the amount of than products available. (Limit: ${limit})`,
                    chat,

                });

            return res.status(200).json({
                chat: chat.slice(0, limit),
            });
        });

        // Post new message
        this.router.post(`${this.path}`, async (req, res) => {

            // TODO: Validations

            await this.chatManager.addMsg(req.body);
            return res.status(200).json({ message: "Message added" });
        });
    }
}

module.exports = ChatRoutes;