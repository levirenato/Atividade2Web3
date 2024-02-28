const express =  require('express');
const mysql =  require('mysql2');
const bodyParser =  require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// configuring conection

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'aluno',
    password: 'ifpecjbg',
    database: 'web3',
});


conection.connect((err) => {
    if (err) {
        console.log('Erro to connect to mysql: ' + err.message)
    } else {
        console.log('Connect sucessiful');
    }
});

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// API

// GET
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';

    conection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar registros: ' + err.message)
            res.status(500).json({error: 'erro ao buscar registros'})
        } else {
            res.status(200).json(results)
        }
    });
});

// POST
app.post('/api/usuarios', (req, res) => {
    const {nome, email, senha} = req.body;

    const sql = 'INSERT INTO usuario (nome,email, senha) VALUES (?,?,?)';
    conection.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir registro: ' + err.message)
            res.status(500).json({error: 'Erro ao inserir registro'})
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(201).json({message: 'Registro inserido com sucesso'})
        }
    });
});

// PUT
app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const {nome, email, senha} = req.body;

    const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = ?  WHERE id = ?';
    conection.query(sql, [nome, email, senha, id], (err, result) => {
        if (err) {
            console.error('Erro ao Atualizar registro: ' + err.message)
            res.status(500).json({error: 'Erro ao inserir registro'})
        } else {
            console.log('Registro Atualizado com sucesso!');
            res.status(201).json({message: 'Registro Atualizado com sucesso'})
        }
    });
});

// DELETE
app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usuario WHERE id = ?';
    conection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao Excluir registro: ' + err.message)
            res.status(500).json({error: 'Erro ao Excluir registro'})
        } else {
            if (result.affectedRows > 0){
                console.log('Registro excluido com sucesso!');
                res.status(200).json({message: 'Registro excluido com sucesso'})
            } else {
                console.log('Registro não encontrado');
                res.status(404).json({message: 'Registro não encontrado'})
            }
        }
    });
});

// DELETE POR EMAIL
app.delete('/api/usuarios', (req, res) => {
    const { email } = req.body;

    const sql = 'DELETE FROM usuario WHERE email = ?';
    conection.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Erro ao Excluir registro: ' + err.message)
            res.status(500).json({error: 'Erro ao Excluir registro'})
        } else {
            if (result.affectedRows > 0){
                console.log('Registro excluido com sucesso!');
                res.status(200).json({message: 'Registro excluido com sucesso'})
            } else {
                console.log('Registro não encontrado');
                res.status(404).json({message: 'Registro não encontrado'})
            }
        }
    });
});


// Iniciar servidor
app.listen(port, () => {
    console.log('Servidor iniciado')
})