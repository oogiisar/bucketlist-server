const xss = require('xss');
const bcrypt = require('bcryptjs');

const REGEX_NUMBER = /(?=.*[0-9])[\S]+/;

const UsersService = {
    // Checks if user exists
    hasUserWithUserName(db, email) {
        return db('users')
            .where({ email })
            .first()
            .then(email => !!email)
    },
    // Add user to db
    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(([user])  => user)
    },
    // Validates user password requirments
    validatePassword(password) {
        if (password.length < 6) {
            return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_NUMBER.test(password)) {
            return 'Password must contain 1 upper case, lower case, number and special character'
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    // Sanitize user input
    serializeUser(user) {
        return {
            email: xss(user.email),
        }
    },
};
  
module.exports = UsersService;