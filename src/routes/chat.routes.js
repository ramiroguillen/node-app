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

    }
}