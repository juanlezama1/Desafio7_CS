import productsRouter from './productsRouter.js'
import express from 'express'

const indexRouter = express.Router ()

// Cuando voy a /products, lo gestiona el productsRouter y tiene acceso a la carpeta pública para las imágenes.

indexRouter.use('/public', express.static(__dirname + '/public'))
indexRouter.use('/products', productsRouter, express.static(__dirname + '/public'))

export default indexRouter