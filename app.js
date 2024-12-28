const express = require('express');
const app = express();
const PORT = 8080;

const dados = {
    topicos : [
        {
            id: 1,
            titulo: "Titulo 1",
            posts: []
        },

        {
            id: 2,
            titulo: "Titulo 2",
            posts: []
        }
    ]
}


app.get('/', (req, res) => {
    res.send('Olá, você está usando a página principal!')
})

app.get('/topicos', (req, res) => {
    res.json(dados.topicos);
})

app.get('/topicos/:id', (req, res) => {
    const id = req.params['id'];
    res.json(dados.topicos[id]);
})

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
});