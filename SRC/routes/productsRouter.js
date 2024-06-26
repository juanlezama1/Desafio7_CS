import { Router } from "express"
import { productModel } from "../models/products.js"

const productsRouter = Router ()

// LECTURA DE TODOS LOS PRODUCTOS (SÓLO DEVUELVE EL PAGINATION SEGÚN CONSIGNA DEL TP)
productsRouter.get('/', async (req, res) => {
    
    // Query params que podría recibir. Si no se mandan, tendrán el valor 'undefined'
    let {limit} = req.query 
    !limit && (limit = 10) // Por default será 10

    let {page} = req.query
    !page && (page = 1) // Por default será 1
    
    let {sort} = req.query 
    !sort? (sort = null) : (sort = ({price: sort})) // Por default no los ordenará

    let filters = {}

    let {query_status} = req.query 
    query_status && (filters.status = (query_status == 'true')) // Por default hace una búsqueda general
    
    let {query_category} = req.query
    query_category && (filters.category = query_category) // Por default trae todas las categorías

    const prueba = await productModel.paginate(filters, {limit: limit, page: page, sort: sort})

    res.status(200).send(prueba)

    console.log("Productos enviados!")
} )

// LECTURA DE UN PRODUCTO ESPECÍFICO
productsRouter.get('/:pid', async (req, res) => {

    console.log("Enviando producto específico...")
    let product_code = req.params.pid // Obtengo el código del producto

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

// CREATE DE UN PRODUCTO
productsRouter.post('/', async (req, res) => {

    console.log("Creando producto ...")

    const new_product = req.body

    try {
        let my_product = await productModel.create(new_product)
        my_product = await productModel.findById(my_product._id.toString()).lean()
        res.status(200).render('templates/home_id', {title: 'Producto Creado:', product: my_product})
        console.log("Producto creado en DB!")
    }

    catch (error)

    {
        console.log("Error al crear producto: ", error)
    }
})

export default productsRouter