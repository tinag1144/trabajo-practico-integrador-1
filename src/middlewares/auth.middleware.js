import { verifyToken } from '../helpers/jwt.helper.js';

//authMiddleware: Verificar JWT desde cookies y extraer usuario.

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies["token"]; //esto trae el token de las cookies que se crea al iniciar sesion
        //  console.log("Token recibido:", token);
        if (!token) {
            return res.status(401).json({ message: "Token no autenticado" });
        }; //si no hay token, no esta autenticado

        const decoded = verifyToken(token, process.env.JWT_SECRET); //se decodifica el token con la funcion que se creó en helpers 
        //  console.log("Token decodificado:", decoded);
        req.user = decoded; //se agrega la informacion del usuario a la req para usarla en las rutas que necesiten autenticacion

        
        next(); 

    } catch (error) { 
        console.error("Error en el servidor:", error);
        
    }
}