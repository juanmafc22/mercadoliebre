let express = require("express");
let router = express.Router();

const productsController = require("../controllers/productos.controller");

// peticion Get para visualizar solo los productos en oferta
router.get("/ofertas", productsController.ofertas);

// peticion Get para visualizar las diferenets categorias de los productos
router.get("/categorias", productsController.categorias);

module.exports = router;