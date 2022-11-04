const path = require("path");

const usersController = {

    login: (req, res) => {
        res.render("usuarios/login")
    },

    register: (req, res) => {
        res.render("usuarios/register");
    },

    infoLogin: (req, res) => {

        // codigo verificara la info ingresada

        //
        res.redirect("usuarios/redirect")

    }





};

module.exports = usersController;