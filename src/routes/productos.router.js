let express = require("express");
let router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage ({

    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, "../../public/images/"));
    },

    filename: (req, file, cb) => {

        const newFileName = "img-prod-" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }, 

});

const upload = multer({ storage:storage });

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
router.post("/almacenar", upload.single("imagen"), productsController.almacenar);

// peticion GET para mostrar la respuesta de la carga de producto
router.get("/respuesta", productsController.respuesta);

// ruta get para mostrar el formulario de edicion
router.get("/editar/:id", productsController.recopilar);

// ruta put para editar el producto
router.put("/editar/:id", productsController.editar);




module.exports = router;