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

        // hack para convertir el string en booleano
        let nuevo = true;
        if (req.body.nuevo === "false") {
            nuevo = false;
        }

        products.push({
            id: Date.now(),
            categoria: categoria,
            titulo: req.body.titulo,
            precio: parseInt(req.body.precio),
            descuento: parseInt(req.body.descuento),
            detalle: req.body.detalle,
            nuevo: nuevo,
            imagen: req.file.filename
        });

        fs.writeFileSync(prodsFilePath, JSON.stringify(products, null, " "));

        res.redirect(301, "/productos/respuesta");
        // res.redirect("http://localhost:5001/productos/respuesta")
    },

    // peticion GET como respuesta a los Redirect the los diferntes POST/PUT/DELETE
    respuesta: (req, res) => {

        res.render("productos/respuesta");
    },

    // peticion GET para mostrar y recopilar el formulario de edicion
    recopilar: (req, res) => {

        const id = req.params.id;

        const editThis = products.find ( product => {

            return product.id == id;
        });

        res.render("productos/editar", {editThis});
    },

    // peticion GET para efectivamente editar el producto
    editar: (req, res) => {

        // get the ID of the product being edited
        // let id = req.params.id;

        // store all the existing prod details in an object
        let editable = products.find(product => {
            return product.id == req.params.id;
        })

        // set an empty string for the image file name
        let imagen = "";

        // if not image is being passed through the route, let the image name equal to 
        // the existeing inmage file name, otherwise the let image name be equal to
        // the one being passed
        if (!req.file) {
            imagen = editable.imagen;
        } else {
            imagen = req.file.filename;
        }

        // hack to convert the boolean value of the "nuevo" to a real boolean
        let nuevo = true;
        if (req.body.nuevo === "false") {
            nuevo = false;
        }

        let prodEditado = {
            "id": editable.id,
            "categoria": req.body.categoria,
            "titulo": req.body.titulo,
            "precio": parseInt(req.body.precio),
            "descuento": parseInt(req.body.descuento),
            "detalle": req.body.detalle,
            "imagen": imagen,
            "nuevo": nuevo
        }

        // create a new array without the one being edited
        let newProdArray = products.filter( product => {
            return product.id != req.params.id;
        });

        // push the edited product into newProdArray
        newProdArray.push(prodEditado);

        // write the new product JSON
        fs.writeFileSync(prodsFilePath, JSON.stringify(newProdArray, null, " "));

        res.redirect("/productos/respuesta");
    },

    // peticion GET para mostar y confirmar la baja de un producto
    baja: (req, res) => {

        // obtener el ID del producto a destroy
        let id = req.params.id;

        let producto = products.find (product => {

            return product.id == id;
        })

        res.render("productos/confirmar-baja", {producto});
    },

    destroy: (req, res) => {

        // obtener el ID del producto a destroy
        let id = req.params.id;

        // sacar el el producto ID fuera del array de productos
        let newProducts = products.filter(product => {
            return product.id != id;
        })

        // escribir el nuevo array de products sin 
        fs.writeFileSync(prodsFilePath, JSON.stringify(newProducts, null, " "));

        res.redirect("/productos/respuesta");

    }

}

module.exports = productsController;