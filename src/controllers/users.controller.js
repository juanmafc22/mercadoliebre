const path = require("path");

const usersController = {

    login: (req, res) => {
        res.render("usuarios/login")
    },

    register: (req, res) => {
        res.render("usuarios/register");
    },

};

module.exports = usersController;