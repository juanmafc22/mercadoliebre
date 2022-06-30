// ******* express()
const express = require("express");
const app = express();
const expressPort = 5050;


// ******* server start
app.listen(expressPort, () => {
    console.log("Servidor Express corriendo OK en el puerto", expressPort);
    console.log("Visitar el sitio aqui >> http://localhost:" + expressPort + "/");
})


// ******* requires
const path = require("path");
const mainRouter = require("./routers/index.router");


// ******* middlewares (app.use)
app.use(express.static(path.join(__dirname, "./public")));
app.use("/", mainRouter);


// ******* template engines (app.set: ejs, carpeta views)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));


// ******* required route system