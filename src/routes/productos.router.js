let express = require("express");
let router = express.Router();

const productsController = require("../controllers/productos.controller");

// peticion GET para visualizar solo los productos en oferta
router.get("/ofertas", productsController.ofertas);

// peticion GET para visualizar las diferenets categorias de los productos
router.get("/categorias", productsController.categorias);

// peticion GET con ruta parametrizada para visualizar los prods segun su categoria
router.get("/categorias/:categoria", productsController.categoriasList);

// peticion GET con ruta parametrizada de ID de producto para ver un producto individual
router.get("/ver/:id", productsController.verItem);

// peticion GET para mostar el formulario de alta de producto
router.get("/alta", productsController.alta);

// peticion POST para almacenar el formulario de alta de producto
router.post("/almacenar", productsController.almacenar);

router.get("/respuesta", productsController.respuesta);



module.exports = router;