/**
 * 
 * @author Ivan Zanon
 * 
 * @description Manager for JWT Authorization
 * 
 */

const jwt = require('jsonwebtoken');


module.exports = {
    /**
     * @description Verifies if the token on the requisition ins valid and, then, folow to [next] route
     * 
     * @param req 
     * @param res 
     * @param next 
     */

     verifyJWT(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }
}
