const express = require("express");
const { redirect } = require("express/lib/response");
const app = express();
const puertoExpress = 3030;

const path = require("path");
const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.set("view engine", "ejs");


app.listen(process.env.PORT || puertoExpress, () => {
    console.log(`Express iniciado OK el el puerto ${puertoExpress}`);
});

app.get("/", (req, res) => {
    res.render("home");
    // res.sendFile(path.resolve (__dirname, "./views/home.ejs"))
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.post("/home", (req, res) => {
    res.render("home")
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});


// app.get("/", (req, res) => {
//     res.sendFile(path.resolve (__dirname, "./views/home.html"))
// });

// app.get("/home", (req, res) => {
//     res.sendFile(path.resolve (__dirname, "./views/home.html"))
// });

// app.post("/home", (req, res) => {
//     res.sendFile(path.resolve (__dirname, "./views/home.html"))
// });

// app.get("/register", (req, res) => {
//     res.sendFile(path.resolve (__dirname, "./views/register.html"))
// });

// app.get("/login", (req, res) => {
//     res.sendFile(path.resolve (__dirname, "./views/login.html"))
// });