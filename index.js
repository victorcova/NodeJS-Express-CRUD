const express = require('express'); // importo
const { send } = require('process');
const app = express(); // executo
const port = 3000; // defino porta
app.use(express.json()); // informo ao express o que ele deve fazer quando receber um JSON (do CREATE).


// Crio usuários fake:
const USUARIO_EXEMPLO_1 = {
    nome: 'José',
    sobrenome: 'Silva'
}
const USUARIO_EXEMPLO_2 = {
    nome: 'Maria',
    sobrenome: 'Silva'
}

// Crio array de usuários fake:
const FAKE_USERS_DATABASE = [USUARIO_EXEMPLO_1, USUARIO_EXEMPLO_2];

// --------------------------------------------------------------------------------------------
// Para cada verbo do REST resulta num resultado no BD: 
// CRUD: Create, Read, Update e Delete
// Create -> POST | Read -> GET | Update -> PATCH/PUT | Delete -> DELETE
// OBS.: Aqui uso o POSTMAN para fazer as requisições
// --------------------------------------------------------------------------------------------

// VAMOS FAZER O CREATE(post):
app.post('/usuario', (req, res) => { // o post recebe 2 parametros: o endereço (a rota) e uma função anônima com 2 parametros (requisição e resposta).
    // aqui dentro vamos escrever o que ac ontece quando a requisição chega no caminho (/usuario)
    const newUser = req.body; // variavel recebendo o corpo da requisição
    FAKE_USERS_DATABASE.push(newUser); // adiciona a variável (newUser) ao nosso banco de dados (que neste caso é uma array)
    res.send(newUser); // agora informamos ao cliente que o usuário foi adicionado
});

// VAMOS FAZER O READ(get):
// Pegando um usuário específico:
app.get('/usuario/:id' , (req, res) => { // recebe a rota (específica) e a função req-res
    const userId = req.params.id;    
    res.send(FAKE_USERS_DATABASE[userId]); // no array o id é o indice do usuário no array
}); 

// Pegando todos os usuários:
app.get('/usuario' , (req, res) => { // recebe a rota (geral) e a função req-res    
    res.send(FAKE_USERS_DATABASE); // agora sem especificar o index do array - passando o array como um todo
}); 

// VAMOS FAZER O ATUALIZAR(put):
app.put('/usuario/:id', (req, res) => { // recebe a rota (especifica) e a função req-res    
    const userId = req.params.id; // salvo o id
    const oldUser = FAKE_USERS_DATABASE[userId]; // pego o usuario antigo e salvo numa variável
    const newUser = req.body; // crio uma variavel pra salvar os dados atualizados que vem do body
    FAKE_USERS_DATABASE[userId] = {...oldUser, ...newUser}; // atualizo direto no array mesclando os dados (...)
    res.send(FAKE_USERS_DATABASE[userId]); // envio a resposta com o usuário atualizado
}); 

// VAMOS FAZER O DELETE(delete):
// NOTA: Se deletarmos a posição do array quebraríamos a sequencia do Array. Logo vamos apenas apagar os dados sem deletar o indice do array.
app.delete('/usuario/:id', (req, res) => { // recebe a rota especifica e a função req-res
    const userId = req.params.id; // salvo o id
    FAKE_USERS_DATABASE[userId] = {}; // altero o array para esse objeto ficar vazio
    res.send(FAKE_USERS_DATABASE[userId]);

});



// --------------------------------------------------------------------------------------------
app.listen(port, ()=> {
    console.log(`O servidor está disponível em http://localhost:${port}`);
})