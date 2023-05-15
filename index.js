//config inicial
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
//forma de ler JSON / MIDDLEWARES
app.use(
    express.urlencoded({
        extended:true,
    }),
);
    //middleware do proprio node

app.use(express.json());
// rotas da api

const productsRoutes = require('./routes/productsRoutes');

app.use('/products', productsRoutes)

//ENTREGAR UMA PORTA

mongoose
.connect(
    'mongodb://localhost:27017/sinapi'
)
.then(()=>{
    console.log("Conectamos ao mongoDB!")
    app.listen(3000)
})
.catch((err) => console.log(err))