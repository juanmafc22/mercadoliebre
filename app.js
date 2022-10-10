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
    console.log("Ir al sitio Web: http://localhost:" + puertoExpress + "/");
});


// ******************** requires
//
const path = require("path");
const publicPath = path.resolve(__dirname, "./public");
const mainRouter = require("./routes/main.router");
const usersRouter = require("./routes/users.router");


// ******************** middlewares (app.use)
//
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended:false } ));
app.use(express.json());


// ******************** template engines (app.set, carpeta views)
//
app.set("view engine", "ejs");


// ******************** required route system
//
app.use("/", mainRouter);

app.use("/users", usersRouter);

