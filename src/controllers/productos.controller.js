const fs = require("fs");
const path = require("path");

const prodsFilePath = path.join(__dirname, "../data/products.database.json");
const products = JSON.parse(fs.readFileSync(prodsFilePath, 'utf-8'));

const productsController = {



    ofertas: (req, res) => {

        res.render("productos/ofertas", {products})
    },

    categorias: (req, res) => {

        let categorias = [];
        
        products.forEach ( product => {
        
            if (!categorias.includes(product.categoria)) {
                categorias.push(product.categoria);
            }
        });

        res.render("productos/categorias", {products, categorias});
    },

    categoriasList: (req, res) => {

        const categoria = req.params.categoria;

        const filteredProds = products.filter (product => {

            if (product.categoria == categoria) {
                return product;
            }
        });

        res.render("productos/categorias-list", {filteredProds});

    }

}

module.exports = productsController;