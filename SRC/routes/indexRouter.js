import productsRouter from './productsRouter.js'
import cartsRouter from './cartsRouter.js'
import express from 'express'
import __dirname from '../path.js'

const indexRouter = express.Router ()

// Índice de rutas
indexRouter.use('/public', express.static(__dirname + '/public'))
indexRouter.use('/products', productsRouter, express.static(__dirname + '/public'))
indexRouter.use('/carts', cartsRouter, express.static(__dirname + '/public'))

export default indexRouter