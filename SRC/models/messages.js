import {Schema, model} from "mongoose"

// Prototipo de un mensaje en la DB

const messageSchema = new Schema ({
    user: String,
    message: String
})

// Exporto este prototipo en mi colección

export const messageModel = model ("messages", messageSchema)