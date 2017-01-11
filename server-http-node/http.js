var router = require('./router');

var app = router(3412);

var operadoras = [
    {nome: "Oi", codigo: "1"},
    {nome: "Vivo", codigo: "11"},
    {nome: "Tim", codigo: "21"},
    {nome: "Claro", codigo: "32"}
];

var contatos = [
    {nome: "Caio", telefone: "99999-8888"},
    {nome: "Mother", telefone: "9999-8888"},
    {nome: "Girlfriend", telefone: "0000-1111"}
];

app.interceptor(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.interceptor(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    next();
});

app.get('/operadoras', function (req, res) {
    res.write(JSON.stringify(operadoras));
    res.end();
});


app.get('/contatos', function (req, res) {
    res.write(JSON.stringify(contatos));
    res.end();
});

app.options('/contatos', function (req, res) {
    res.end();
});

app.post('/contatos', function (req, res) {
    var contato = req.body;
    contatos.push(JSON.parse(contato));
    res.end();
});