import express from "express";

const loginRoutes = express.Router();

loginRoutes.post('/login', (req, res) =>{
    res.status(200).json({message: "Logeado con exito"});
});

export default loginRoutes;