import {Schema, model} from "mongoose"

// Prototipo de un usuario en la DB

const userSchema = new Schema ({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    rol: {
        type: String,
        required: true,
        default: "User"
    }
})

// Exporto este prototipo en mi colección

export const productModel = model ("users", productSchema)