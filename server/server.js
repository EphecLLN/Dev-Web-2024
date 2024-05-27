const express = require("express");
//Pour demander/connecter la database
require("./db");

//Constantes de path pour les routes
const UsersRouter = require("./routes/userRoute");
const Login = require("./routes/login");
const Gestionnaire = require("./routes/gestionnaire.route")
const cors = require("cors");

const app = express();

//Route à utiliser
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(UsersRouter);
app.use(Login);
app.use(Gestionnaire);

//Port d'écoute
app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
