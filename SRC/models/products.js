import {Schema, model} from "mongoose"

// Prototipo de un producto en la DB

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    thumbnail: {
        type: String,
        required: true
    },

    stock: {
        type: String,
        required: true
    }
})

// Exporto este prototipo en mi colección

export const productModel = model ("products", productSchema)