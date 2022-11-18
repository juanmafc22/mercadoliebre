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


    // metodo por GET que muestra el formulario de edicion y pobla los campos con la info del JSON
    editar: (req, res) => {

        // obtener el ID del usuario a editar pasado por req.params
        let id = req.params.id;

        // obtener la info del usuario a editar
        let editarUsuario = usuarios.find (usuario => {
            return usuario.id == id;
        });

        // enviar la info del usuario a la vista
        res.render("usuarios/editar-usuario", {editarUsuario});


    },


    // metodo que viene por PUT para editar el usuario
    update: (req,res) => {

        // store all the existing prod details in an object
        let editable = usuarios.find(usuario => {
            return usuario.id == req.params.id;
        })

        // set an empty string for the image file name
        let imagen = "";

        // if not image is being passed through the route, let the image name equal to 
        // the existeing inmage file name, otherwise the let image name be equal to
        // the one being passed
        if (!req.file) {
            imagen = editable.image;
        } else {
            imagen = req.file.filename;
        }

        let userEditado = {
            "id": editable.id,
            "nombre": req.body.fullname,
            "email": req.body.email,
            "birthday": req.body.birthday,
            "image": imagen,
            "password": req.body.password,
            "tipo": req.body.tipo
        };

        // Crear un nuevo array sin el usuario que se esta editando
        let newUserArray = usuarios.filter( usuario => {
            return usuario.id != req.params.id;
        });

        // agregarle el nuevo usuario editado
        newUserArray.push(userEditado);

        // escribir el nuevo JSON
        fs.writeFileSync(usersFilePath, JSON.stringify(newUserArray, null, " "));

        res.redirect("/users/listar-usuarios");

    },

    // metodo por GET que muestra la info del usuario a borrar
    delete: (req, res) => {

        // obtener el id pasado por req.params del usuaro a eliminar
        let id = req.params.id

        // obetener la info del usuario a borrar
        let borrarlo = usuarios.find ( usuario => {
            return usuario.id == id;
        })

        res.render("usuarios/confirmar-baja", {borrarlo});

    },

    // metodo por DELETE que borra el usuario
    destroy: (req, res) => {

        // obtener el id pasado por req.params del usuaro a eliminar
        let id = req.params.id

        // encontrar el usuario a eliminar
        let usuarioBorrar = usuarios.find( usuario => {
            return usuario.id == id;
        });

        let arrayEditado = usuarios.filter( usuario => {
            return usuario.id != id;
        });

        // escribir el nuevo JSON
        fs.writeFileSync(usersFilePath, JSON.stringify(arrayEditado, null, " "));

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
    }


};

module.exports = usersController;