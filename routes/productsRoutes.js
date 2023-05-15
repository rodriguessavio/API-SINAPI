const router = require('express').Router();
const Products = require('../models/Products');



//create - criação de dados
router.post('/', async (req, res) => {

    //req.body
    const { descricao,unidade, origem_preco, preco_medio} = req.body;

    if(!descricao || !unidade || !origem_preco || !preco_medio) {
        res.status(402).json({message:"Nem todos os itens foram preenchidos da forma correta"});
        return;
    }

    const products = {
        descricao,
        unidade,
        origem_preco,
        preco_medio
    }

    //create
    try{
        const existingProduct = await Products.findOne({ descricao });

        if (existingProduct) {
        res.status(400).json({ message: "Produto já existe" });
        return;
        }
        //criar dados
        // const createdProduct = 
        await Products.create(products);
        // createdProduct._id = createProduct._id.toString();
        // res.status(201).json({message:"Produto inserido com sucesso!"});
        // res.json({createdProduct});

    }catch (error) {
        res.status(500).json({error: error});
    }

});

//read - leitura de dados
router.get(('/'), async (req, res) => {
    try{

        const productsFind = await Products.find();
        res.status(200).json(productsFind);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// Rota para buscar produtos por nome
router.get('/search', async (req, res) => {
    const { descricao } = req.query; // Obtém o valor do parâmetro 'descricao' na URL
  
    try {
      // Realiza a busca no banco de dados usando o critério de descricao
      const products = await Products.find({ descricao: { $regex: descricao, $options: 'i' } });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos.', error });
    }
});

router.get('/:id',async (req, res) => {

    // extrair o dado da requisiçã, pela url = req.params
    const id = req.params.id;

    try {
        
        const product = await Products.findOne({_id: id});

        if(!product) {
            res.status(422).json({message:"Produto não encontrado"})
            return;
        }

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({error: error});
    }
});

//Update - atualização de dados(PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id;

    const { descricao,unidade, origem_preco, preco_medio} = req.body;

    const product = {
        descricao,
        unidade,
        origem_preco,
        preco_medio
    }

    try {

        const updatedProduct = await Products.updateOne({_id: id}, product);

        if (updatedProduct.matchedCount === 0){
            res.status(422).json({message: "Produto não encontrado!"});
        };

        res.status(200).json(product);

    }catch(error){
        res.status(500).json({error: error});
    };

});

//Delete - deletar dados
router.delete('/:id', async(req, res) => {

    const id = req.params.id;

    const product = await Products.findOne({_id: id});

    if(!product) {
        res.status(422).json({message:"Produto não encontrado"})
        return;
    }

    try {

        await Products.deleteOne({_id: id});

        res.status(200).json({message:"Produto removido com sucesso"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }


});



module.exports = router;