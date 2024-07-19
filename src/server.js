const express = require("express"); //trazendo tudo de express

const app = express(); //inicializar o express para utiliza-lo
app.use(express.json()); //definindo que vou devolver um json

app.post("/users", (request, response) => { 
    const { name, email, password } = request.body; //pegando dados do corpo da requisicao

    response.send(`Usuario: ${name}. E-mail ${email}. E a senha e: ${password}`); //enviando resposta para o client
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));