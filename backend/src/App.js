const express = require('express');
const app = express(); 





const filmesRouters = require('./routes/filmesRoute.js');
//Configurações
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    }); 
//Rotas
app.use('/filmes',filmesRouters)

app.use('/teste',(req,res)=>{
res.send("Rota TESTE.");
});

app.listen(app.get('port'),()=>{
console.log("Start server on port "+app.get('port'))
})

// Configurar CORS


