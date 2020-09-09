import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import User, { UserAttributes } from '../database/models/user';

require('dotenv').config();

interface UserData {
    id: number;
    password: string;
    username: string;
}

export default class UserController {
  async index(response:Response) {
    try {
      const users = await User.findAll();

      return response.json(users);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }

  /**
     *
     * Return an individual User and its information
     * @description List all Users stored in the database. Expects an :id as param
     *
     * @return {Json} JSon with the user
     */
  async show(req:Request, res:Response) {
    try {
      const user = await User.findByPk(req.params.id,
        {
          attributes: ['fullname', 'username'],
        });

      return res.json(user);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  /**
     * Stores an User
     * @description Stores a new User in the Database
     *              Expects an ojbect with User information, except the id
     *
     * @return JSon with the stored User
     */
  async store(req:Request, res:Response) {
    const data:UserAttributes = req.body;

    try {
      // encrypting password
      const HashedPassword = await bcrypt.hash(data.password, 10);

      const user = await User.create(
        {
          username: data.username,
          fullname: data.fullname,
          password: HashedPassword,
          level: data.level,
        },
      );

      return res.json(user);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  /**
     * Updates an existing User
     * @description Updates an existing User in the Database.
     *              Expects a JSON with the informations including the ID
     *
     * @return JSon with the new informations of User
     */
  async update(req:Request, res:Response) {
    const user = await User.update(req.body,
      {
        where:
              {
                id: req.params.id,
              },
      });

    return res.json(user);
  }

  /**
     * Destroy an existing User
     * @description Destroy an existing User in the Database. Expects the id of the User
     */
  async destroy(req:Request, res:Response) {
    await User.destroy(
      {
        where:
               {
                 id: req.params.id,
               },
      },
    );

    return res.send();
  }

  /**
     * Verify if a Username exists
     * @description Verify if an User already exists in the Database
     *              Expects an object with login information
     *
     * @return true: if the User Name passed already exits in the Database
     *          false: if it doesn't
     */
  async userExists(req:Request, res:Response) {
    const userInfo = req.body;

    const user = await User.findOne(
      {
        where: {
          username: userInfo.username,
        },
      },
    );

    return res.json({ exists: (user != null) });
  }

  /**
     * Authenticate an User and gie him authorization
     * @description Authenticate an User and give him a token JWT for Authorization
     *
     * @return JSon with the User id and the Authorization token
     */
  async login(req:Request, res:Response) {
    interface LoginParameters {
        username: string;
        password: string;
    }

    const userInfo:LoginParameters = req.body;

    const user:User = await User.findOne(
      {
        where: {
          username: userInfo.username,
        },
      },
    );

    if (user == null) {
      return res.status(400).send('Cannot find user');
    }

    try {
      // comparing encrypted passwords
      if (await bcrypt.compare(userInfo.password, user.password)) {
        const secret:Secret = process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : '';
        // generating jwt token, without expiration date
        const token = jwt.sign({ id: user.id }, secret);
        return res.status(200).send({ auth: true, idUser: user.id, token });
      }
      return res.status(200).send({ auth: false, idUser: 0, token: '' });
    } catch {
      return res.status(500).send();
    }
  }
}
