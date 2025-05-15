import app from "./app.js";
import dotenv from 'dotenv';

dotenv.config({path: './src/.env'});
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})