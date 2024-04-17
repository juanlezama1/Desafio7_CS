import express from 'express'
import mongoose from 'mongoose'
import __dirname from './path.js'
import { engine } from 'express-handlebars'
import indexRouter from '../SRC/routes/indexRouter.js'
import { productModel } from './models/products.js'

const my_app = express ()
const PORT = 8080

// Conexión con DB
mongoose.connect("mongodb+srv://lezamaj:indexport.2011@cluster0.r9uoba0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Desafio6")
    .then(() => console.log("Conectado a la DB!"))
    .catch(error => console.log("Error al conectarse a la DB: ", error))

// Rutas
my_app.use(express.json())
my_app.use('/', indexRouter)

// Implementación de Handlebars (motor de plantillas)
my_app.engine('handlebars', engine())
my_app.set('view engine', 'handlebars')
my_app.set('views', __dirname + '/views')

// Levanto el server
const my_server = my_app.listen(PORT, () => {
    console.log(`Escuchando solicitudes en el puerto ${PORT} ...`)
})

// Aclaración: Dejé la DB cargada con 10 productos de antemano
// Código comentado donde se carga la DB con los productos.

// const cargar_db = async () => {
//     await productModel.insertMany([
//         {
//             "title": "Semillas de girasol - Pipas",
//             "description": "Tostadas y saladas",
//             "price": 1000,
//             "thumbnail": "pipas.webp",
//             "stock": 70
//         },
//         {
//             "title": "Gelatina Royal",
//             "description": "Sabor a Durazno",
//             "price": 400,
//             "thumbnail": "gelatina.jpg",
//             "stock": 11
//         },
//         {
//             "title": "Mostachol Matarazzo",
//             "description": "Moldeado al bronce",
//             "price": 1300,
//             "thumbnail": "matarazzo.webp",
//             "stock": 6
//         },
//         {
//             "title": "Azúcar",
//             "description": "Común tipo A",
//             "price": 800,
//             "thumbnail": "azucar.jpg",
//             "stock": 45
//         },
//         {
//             "title": "Vinagre",
//             "description": "De alcohol",
//             "price": 700,
//             "thumbnail": "vinagre.webp",
//             "stock": 18
//         },
//         {
//             "title": "Frutos Secos",
//             "description": "Maní, Pasas de Uva y Castañas",
//             "price": 1800,
//             "thumbnail": "frutos_secos.jpg",
//             "stock": 50
//         },
//         {
//             "title": "Sal de mesa",
//             "description": "Baja en Sodio",
//             "price": 450,
//             "thumbnail": "sal.webp",
//             "stock": 25
//         },
//         {
//             "title": "Aceite de oliva",
//             "description": "Extra virgen",
//             "price": 800,
//             "thumbnail": "aceite.webp",
//             "stock": 17
//         },
//         {
//             "title": "Pechuga de pollo",
//             "description": "Sin hueso y sin piel",
//             "price": 2500,
//             "thumbnail": "pechuga.png",
//             "stock": 60
//         },
//         {
//             "title": "Coca Cola - 500 ml",
//             "description": "Zero, sin azúcar",
//             "price": 900,
//             "thumbnail": "coca_zero.jpg",
//             "stock": 45
//         }
//     ])
// }

// cargar_db()
// .then(() => console.log("Cargada la DB!"))
// .catch(() => console.log("Error al cargar la DB!"))
