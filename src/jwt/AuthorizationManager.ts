/**
 *
 * @author Ivan Zanon
 *
 * @description Manager for JWT Authorization
 *
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default class AuthorizationManager {
  /**
     * @description Verifies if the token on the requisition ins valid
     *              and folow to [next] route
     *
     * @param req
     * @param res
     * @param next
     */

  verifyJWT(req:Request, res:Response, next:NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = req.headers.id;

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token,
      process.env.ACCESS_TOKEN_SECRET,

      (err, decoded:any) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        if (decoded.id && decoded.id != user) {
          return res.status(500).send({ auth: false, message: 'User invalid.' });
        }

        next();
        return 0;
      });
    return 0;
  }
}
