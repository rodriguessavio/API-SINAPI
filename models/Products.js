const mongoose = require('mongoose');

const Products = mongoose.model('Products', {
    descricao: String,
    unidade: String,
    origem_preco: String,
    preco_medio: String,
});

module.exports = Products;