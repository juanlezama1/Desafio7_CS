import { Router } from "express"
import { cartModel } from "../models/carts.js"

const cartsRouter = Router ()

// LECTURA DE UN CARRITO ESPECÍFICO
productsRouter.get('/:cid', async (req, res) => {

    console.log("Enviando carrito específico...")
    let cart_code = req.params.cid // Obtengo el código del carrito

    // Intento obtenerlo de la DB
    try {
        let my_product = await productModel.findById(product_code).lean()
        res.status(200).render('templates/home_id', {title: 'Producto Seleccionado:', product: my_product}),
        console.log("Producto específico enviado!")
    }

    catch (error)

    {
        res.status(400).render('templates/error', {error_description: "El producto no existe"}),
        console.log("Producto específico no existe!")
    }
})

// UPDATE DE UN PRODUCTO ESPECÍFICO
productsRouter.put('/:pid', async (req, res) => {

    console.log("Actualizando producto específico...")
    let product_code = req.params.pid // Obtengo el código del producto a actualizar
    let updated_product = req.body // Obtengo los valores del producto actualizado

    // Busco por ID, lo actualizo y devuelvo el producto actualizado
    try {
        let my_product = await productModel.findByIdAndUpdate(product_code, updated_product, {new: 'true'}).lean()
        res.status(200).render('templates/home_id', {title: 'Producto Actualizado:', product: my_product}),
        console.log("Producto específico actualizado!")
    }

    catch (error)

    {
        res.status(400).render('templates/error', {error_description: "El producto no existe"}),
        console.log("Producto específico a actualizar no existe!")
    }
})

// DELETE DE UN PRODUCTO ESPECÍFICO
productsRouter.delete('/:pid', async (req, res) => {

    console.log("Eliminando producto específico...")
    let product_code = req.params.pid // Obtengo el código del producto a eliminar

    try {
        await productModel.findByIdAndDelete(product_code)
        res.status(200).send("Producto específico eliminado"),
        console.log("Producto específico eliminado!")
    }

    catch (error)

    {
        res.status(400).render('templates/error', {error_description: "El producto a eliminar no existe"}),
        console.log("Producto específico a eliminar no existe!")
    }
})

export default cartsRouter