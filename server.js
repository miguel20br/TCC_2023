const express = require('express');
const app = express();
const port = 3000;

const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');

app.use('/home', homeRoute);
app.use('/login', loginRoute);

app.listen(port, () => {
    console.log(`Servidor Express está rodando na porta ${port}`);
});

