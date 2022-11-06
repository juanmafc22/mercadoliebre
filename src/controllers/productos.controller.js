const fs = require("fs");
const path = require("path");

const prodsFilePath = path.join(__dirname, "../data/products.database.json");
const products = JSON.parse(fs.readFileSync(prodsFilePath, 'utf-8'));

const productsController = {

    // peticion GET para visualizar solo los productos en oferta
    ofertas: (req, res) => {

        res.render("productos/ofertas", {products})
    },


    // peticion GET para visualizar las diferenets categorias de los productos
    categorias: (req, res) => {

        let categorias = [];
        
        products.forEach ( product => {
        
            if (!categorias.includes(product.categoria)) {
                categorias.push(product.categoria);
            }
        });

        res.render("productos/categorias", {products, categorias});
    },

    // peticion GET con ruta parametrizada para visualizar los prods segun su categoria
    categoriasList: (req, res) => {

        const categoria = req.params.categoria;

        const filteredProds = products.filter (product => {

            if (product.categoria == categoria) {
                return product;
            }
        });

        res.render("productos/categorias-list", {filteredProds});
    },


    // peticion GET con ruta parametrizada de ID de producto para ver un producto individual
    verItem: (req, res) => {

        const id = req.params.id;

        const producto = products.find ( product => {
            if (product.id == id) {
                return product;
            }
        });

        res.render("productos/ver-item", {producto});
    },

    // peticion GET para visualizar el formulario de alta de producto (link de "vender" en la nav general)
    alta: (req, res) => {

        res.render("productos/alta");
    }
}

module.exports = productsController;