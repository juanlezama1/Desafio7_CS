import express from 'express'
import mongoose from 'mongoose'
import __dirname from './path.js'
import productsRouter from './routes/productsRouter.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

// Dejé la DB cargada con 10 productos de antemano utilizando la función .addProducts(product)

const my_app = express ()
const PORT = 8080

// Conexión con DB

mongoose.connect("mongodb+srv://lezamaj:indexport.2011@cluster0.r9uoba0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Desafio6")
    .then(() => console.log("Conectado a la DB!"))
    .catch(error => console.log("Error al conectarse a la DB: ", error))

// Cuando voy a /products, lo gestiona el productsRouter y tiene acceso a la carpeta pública para las imágenes.
my_app.use(express.json())
my_app.use('/public', express.static(__dirname + '/public'))
my_app.use('/products', productsRouter, express.static(__dirname + '/public'))

// Implementación de Handlebars (motor de plantillas)

my_app.engine('handlebars', engine())
my_app.set('view engine', 'handlebars')
my_app.set('views', __dirname + '/views')

// Levanto el server

const my_server = my_app.listen(PORT, () => {
    console.log(`Escuchando solicitudes en el puerto ${PORT} ...`)
})

// Dejo instalado un servidor Socket.io

const io = new Server (my_server)

io.on('connection', (socket) => {
    console.log(`Nueva conexión: ${socket.id}`)
})