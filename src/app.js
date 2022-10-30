
// ------- | requires
const express = require("express");
const path = require("path");
const publicPath = path.resolve(__dirname, "../public");
const mainRouter = require("./routes/main.router");
const usersRouter = require("./routes/users.router");
const productsRouter = require("./routes/productos.router");


// ------- | express () 
const app = express();
const port = process.env.PORT || 3001;


// ------- | server start
app.listen(port, () => {
    console.log(`Express iniciado OK el el puerto ${port}`);
    console.log("Ir al sitio Web: http://localhost:" + port + "/");
});


// ------- | middlewares (app.use)
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended:false } ));
app.use(express.json());


// ------- | template engines (app.set, carpeta views)
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './views')); // Define la ubicación de la carpeta de las Vistas.


// ------- | required route system
app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/productos/", productsRouter);


// ------- | seteo inicial del error 404 
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});
