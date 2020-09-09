/**
 * 
 * @author Ivan Zanon
 * 
 * @description Controller that manages User Model.
 * 
 */

const User = require('../database/models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * 
     * List all Users stored in the database
     * @description List all Users stored in the database
     * 
     * @returns JSon with the users
     */
   async index(req, res) {
       try {
           const users = await User.findAll();

           return res.json(users);
       } catch(error) {
           res.status(500).send({message: error.message})
       }
   },

   /**
     * 
     * Return an individual User and its information
     * @description List all Users stored in the database. Expects an :id as param
     * 
     * @returns JSon with the user
     */
   async show (req, res) {

        try {

            const user = await User.findByPk(req.params.id,
                {
                    attributes: ['fullname', 'username']
                });
                
        } catch(error) {
            res.status(500).send({message: error.message});
        }

        return res.json(user);
   },

   /**
     * Stores an User
     * @description Stores a new User in the Database
     *              Expects an ojbect with User information, except the id
     * 
     * @returns JSon with the stored User
     */
   async store(req, res) {
       const data = req.body;

       try {
           // encrypting password
           const HashedPassword = await bcrypt.hash(data.password, 10);

           const user = await User.create(
               {
                   username: data.username,
                   fullname: data.fullname,
                   password: HashedPassword,
                   level: data.level
               });

           return res.json(user);
       } catch(error) {
           res.status(500).send({message: error.message});
       }
   },

   /**
     * Updates an existing User
     * @description Updates an existing User in the Database. 
     *              Expects a JSON with the informations including the ID
     * 
     * @returns JSon with the new informations of User
     */
   async update(req, res) {
       const user = await User.update(req.body, 
           {where:
               {
                   id : req.params.id
               }
           }
       );

       return res.json(user);
   },

   /**
     * Destroy an existing User
     * @description Destroy an existing User in the Database. Expects the id of the User
     */
   async destroy(req, res) {
       await User.destroy(
           {where:
               {
                   id : req.params.id
               }
           }
       );

       return res.send();
   },

   /**
     * Verify if a Username exists
     * @description Verify if an User already exists in the Database
     *              Expects an object with login information
     * 
     * @returns true: if the User Name passed already exits in the Database
     *          false: if it doesn't
     */
   async userExists (req, res) {
       const userInfo = req.body;

       const user = await User.findOne(
           {
               where: {
                   username : userInfo.username
               }
           });

       return res.json({exists: (user != null)});
   },

   /**
     * Authenticate an User and gie him authorization
     * @description Authenticate an User and give him a token JWT for Authorization
     * 
     * @returns JSon with the User id and the Authorization token
     */
   async login(req, res) {
       const userInfo = req.body;

       const user = await User.findOne(
           {
               where: {
                   username : userInfo.username
               }
           });

       if (user == null) {
           return res.status(400).send('Cannot find user')
       }

       try {
           // comparing encrypted passwords
           if(await bcrypt.compare(userInfo.password, user.password)) {
               // generating jwt token, without expiration date
               const token = jwt.sign( { id: user.id }, process.env.ACCESS_TOKEN_SECRET);
               return res.status(200).send({ auth: true, idUser: user.id, token: token });
           } else {
               return res.status(200).send({ auth: false, idUser: 0, token: '' });
           }
       } catch {
           return res.status(500).send();
       }

   }

};