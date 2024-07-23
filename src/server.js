require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError")

const express = require("express"); //trazendo tudo de express

const routes = require("./routes");
migrationsRun();


const app = express(); //inicializar o express para utiliza-lo
app.use(express.json()); //definindo que vou devolver um json

app.use(routes);


app.use(( error , request, response, next ) => {
    if (error instanceof AppError) { //error do CLIENTE 
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error); //imprimir erro no console se for um error do cliente

    return response.status(500).json({ //error no servidor se nao for erro no cliente
        status: "error",
        message: "internal server error",
    }); 
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));