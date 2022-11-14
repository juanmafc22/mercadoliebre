const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.database.json");
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const usersController = {

    // metodo por GET que muestra el .ejs de login
    login: (req, res) => {

        res.render("usuarios/login")
    },

    // metodo por GET que lista los usuadios existentes con links para dar de alta un 
    // usuariio nuevo como asi tambien editar los existentes
    listar: (req, res) => {

        res.render("usuarios/listar-usuarios", {usuarios})

    },

    // metodo por GET para dar de alta un usuario de forma interna, posibilitando el alta de usuario
    // tipo "user" o "admin", el form de registro solo da de alta usuuarios tipos "user"
    crear: (req, res) => {

        res.render("usuarios/alta-admin");
    },

    confirmarCrear: (req, res) => {

        let newUser = {

            "id": Date.now(),
            "nombre": req.body.fullname,
            "email": req.body.email,
            "birthday": req.body.birthday,
            "image": req.file.filename,
            "password": req.body.password,
            "password2": req.body.password2,
            "tipo": req.body.tipo
        };


        // Hacerle push al nuevo usuario al JSON
        usuarios.push(newUser);

        console.log("--------------------------------------------------------");
        console.log("Los datos del nuevo JSON")
        console.log(usuarios);
        console.log("--------");

        // Escribir el nuevo JSON 
        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));

        // redirect al listado de usuarios
        res.redirect("/users/listar-usuarios");
    },
   
    // metodo por POST que procesa la info enviada de formulario en el .ejs de login
    infoLogin: (req, res) => {

        console.log("El email", req.body.email);
        console.log("La contrase;a", req.body.password);

        // res.redirect("usuarios/redirect")

    },

    register: (req, res) => {
        res.render("usuarios/register");
    },


};

module.exports = usersController;