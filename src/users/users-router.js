const express = require('express');
const path = require('path');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password,  email } = req.body
    for (const field of ['password', 'email'])
        if (!req.body[field])
            return res.status(400).json({
               error: `Missing '${field}' in request body`
    })

    const passwordError = UsersService.validatePassword(password)
    if (passwordError) {
        return res.status(400).json({ error: passwordError })
    }
    
    // Make sure user doesn't already exist
    UsersService.hasUserWithUserName(
        req.app.get('db'),
        email
    )

    .then(hasUserWithUserName => {
        if (hasUserWithUserName) {
            return res.status(400).json({ error: `Username already taken` })
        }

        return UsersService.hashPassword(password)
            .then(hashPassword => {
                const newUser = {
                    email,
                    password: hashPassword,
                }

                return UsersService.insertUser(
                    req.app.get('db'),
                    newUser
                )
                    .then(user => {
                        res
                            .status(201)
                            .location(path.posix.join(req.originalUrl, `/${user.id}`))
                            .json(UsersService.serializeUser(user))
                    })
                })
        })
    .catch(next)
})

module.exports = usersRouter;