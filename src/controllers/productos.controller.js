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

        let categorias = [];
        
        products.forEach ( product => {
        
            if (!categorias.includes(product.categoria)) {
                categorias.push(product.categoria);
            }
        });

        res.render("productos/alta", {categorias});
    },

    // peticion POST para almacenar el nuevo producto 
    almacenar: (req, res) => {

        console.log(req.file);

        let categorias = [];
        
        products.forEach ( product => {
        
            if (!categorias.includes(product.categoria)) {
                categorias.push(product.categoria);
            }
        });

        let categoria = "";

        if (req.body.cat1 == "none") {
            categoria = req.body.cat2;
        } else {
            categoria = req.body.cat1;
        }

        products.push({
            id: Date.now(),
            categoria: categoria,
            titulo: req.body.titulo,
            precio: req.body.precio,
            descuento: req.body.descuento,
            detalle: req.body.detalle,
            nuevo: req.body.nuevo,
            imagen: req.file.filename
        });

        fs.writeFileSync(prodsFilePath, JSON.stringify(products, null, " "));

        res.redirect(301, "respuesta");
        // res.redirect("http://localhost:5001/productos/respuesta")
    },

    respuesta: (req, res) => {

        res.render("productos/respuesta");
    }

}

module.exports = productsController;