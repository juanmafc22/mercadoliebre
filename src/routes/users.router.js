const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const multer = require("multer");
const path = require("path");

const usersController = require("../controllers/users.controller");

const storage = multer.diskStorage ({

    destination: function(req, file, cb) {
        
        cb(null, "public/images")
    },

    filename: function(req, file, cb) {

        const newUserFile = "img-user-" + Date.now() + path.extname(file.originalname);

        cb(null, newUserFile);
    }
});

const upload = multer ({ storage: storage });

// validaciones de express validator
const validarFomularioLogin = [
    body("usuario")
        .notEmpty().withMessage("El campo no puede quedar vacio").bail()
        .isLength({min: 8}).withMessage("El campo no puede quedar vacio"),
    body("password").notEmpty().withMessage("El campo no puede quedar vacio")
];


// ruta GET que muestra el formulario de login
router.get ("/login", usersController.login);

// rut GET donde se muestra el fomulario de register
router.get ("/register", usersController.register);

// ruta GET para mostar la pagina principal de usuarios
router.get ("/listar-usuarios", usersController.listar);


// ruta GET para acceder al formulario de alta interna de usuario
router.get("/crear", usersController.crear);

// ruta POST para crear el usuario
router.post("/crear", upload.single("profilePic"), usersController.confirmarCrear);

// ruta POST donde se administra la info enviada por POST del formulario de login
router.post ("/login", usersController.infoLogin);


module.exports = router;