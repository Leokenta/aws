require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use (cors());

// Criação de um pool de conexões
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

// Endpoint para buscar clientes
app.get('/', (req, res) => {
  pool.query("SELECT * FROM cliente", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao consultar o banco de dados.");
    }
    res.json(results);
  });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
