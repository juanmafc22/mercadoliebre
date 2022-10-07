// ******************** express () 
//
const express = require("express");
const app = express();
const puertoExpress = 3030;
// const { redirect } = require("express/lib/response");


// ******************** server start
//
app.listen(process.env.PORT || puertoExpress, () => {
    console.log(`Express iniciado OK el el puerto ${puertoExpress}`);
});


// ******************** requires
//
const path = require("path");
const publicPath = path.resolve(__dirname, "./public");

// ******************** middlewares (app.use)
//
app.use(express.static(publicPath));

// ******************** template engines (app.set, carpeta views)
//
app.set("view engine", "ejs");

// ******************** required route system
//




app.get("/", (req, res) => {
    res.render("index");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.post("/index", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

