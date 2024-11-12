const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'people_db'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar no banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

const createTableIfNotExists = () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;
    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err);
            return;
        }
        console.log('Tabela `people` criada ou já existe');
    });
};

createTableIfNotExists();

app.get('/', (req, res) => {
    const name = `Pessoa ${Math.floor(Math.random() * 1000)}`;
    connection.query(`INSERT INTO people (name) VALUES ('${name}')`, (err) => {
        if (err) throw err;

        connection.query('SELECT * FROM people', (err, results) => {
            if (err) throw err;
            const namesList = results.map(row => `<p>${row.name}</p>`).join('');
            res.send(`<h1>Full Cycle Rocks!</h1>${namesList}`);
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
