import {Schema, model} from "mongoose"

// Prototipo de un mensaje en la DB

const messageSchema = new Schema ({
    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }
})

// Exporto este prototipo en mi colección

export const messageModel = model ("messages", messageSchema)