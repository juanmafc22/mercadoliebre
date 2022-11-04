const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// validaciones de express validator
const validarFomularioLogin = [
    body("usuario")
        .notEmpty().withMessage("El campo no puede quedar vacio").bail()
        .isLength({min: 8}).withMessage("El campo no puede quedar vacio"),
    body("password").notEmpty().withMessage("El campo no puede quedar vacio")
];

const usersController = require("../controllers/users.controller");

// ruta GET que muestra el formulario de login
router.get ("/login", usersController.login);

// ruta POST donde se administra la info enviada por POST del formulario de login
router.post ("/login", usersController.infoLogin);

// rut GET donde se muestra el fomulario de register
router.get ("/register", usersController.register);

module.exports = router;