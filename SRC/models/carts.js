import {Schema, model} from "mongoose"

// Prototipo de un carrito en la DB

const cartSchema = new Schema ({
    products: String,
    quantity: Number
})

// Exporto este prototipo en mi colección

export const cartModel = model ("carts", cartSchema)