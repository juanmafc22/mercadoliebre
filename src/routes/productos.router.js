let express = require("express");
let router = express.Router();

const productsController = require("../controllers/productos.controller");

router.get("/ofertas", productsController.ofertas);

module.exports = router;