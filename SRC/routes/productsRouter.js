import { Router } from "express"
import { productModel } from "../models/products.js"

const productsRouter = Router ()

// LECTURA DE TODOS LOS PRODUCTOS
productsRouter.get('/', async (req, res) => {
    
    // Query params que podría recibir. Si no se mandan, tendrán el valor 'undefined'
    const {limit} = req.query // Por default será 10
    // const {page} = req.page // Por default será 1
    // const {sort} = req.sort // Por default no los ordenará
    // const {query} = req.query // Por default hará una búsqueda general

    console.log("Enviando productos al cliente...")
    const prueba = await productModel.paginate()

    console.log(prueba)


    const my_products = await productModel.find().lean()

    if (my_products.length === 0 ) // Caso de que la DB esté vacía
        res.status(200).render('templates/error', {error_description: "Sin productos por ahora"})
    
    else 

    {
        // En el caso de que la DB no esté vacía, devuelvo la cantidad solicitada
        // O todos los productos en caso que no esté definido el query param limit
        let cantidad_productos_exhibidos
        !limit? cantidad_productos_exhibidos = my_products.length: cantidad_productos_exhibidos = limit

        // Caso de que envíen un límite, pero no sea un número
        isNaN(cantidad_productos_exhibidos) || cantidad_productos_exhibidos < 0? res.status(400).render('templates/error', {error_description: "El límite debe ser numérico y mayor a cero"}):
        
        // Caso que envíen un número positivo. Si es mayor a la cantidad de productos, se limita a la cantidad de productos.
        (
            cantidad_productos_exhibidos > my_products.length && (cantidad_productos_exhibidos = my_products.length),
            res.status(200).render('templates/home', {title: 'Mis Productos', subtitle: `Cantidad de productos exhibidos: ${cantidad_productos_exhibidos}`, products: my_products.splice(0, cantidad_productos_exhibidos)})
        )
    }

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