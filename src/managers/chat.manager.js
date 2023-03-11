const chatModel = require("../dao/mongo/models/chat.model");
const chatData = require("../utils/data/chat.data");

class ChatManager {
    async insertChat() {
        try {
            await chatModel.insertMany(chatData);
            return chatData;
        } catch (error) {
            console.log("* ~ file: chat.manager.js:13 ~ ChatManager ~ Insert Chat Data ~ error:", error);
        }
    }

    async getChat(){
        try{
            const chat = await chatModel.find();
            return chat;
        }catch(error){
            console.log("* ~ file: carts.manager.js:19 ~ ChatManager ~ addMsg ~ error:", error);
        }
    }

    async addMsg(chat) {
        try {
            await chatModel.create(chat);
            return chat;
        } catch (error) {
            console.log("* ~ file: carts.manager.js:28 ~ ChatManager ~ addMsg ~ error:", error);
        }
    }

}

module.exports = ChatManager;