const mongoose = require('mongoose');
const { isEmail, contains } = require('validator').default;

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (contains(value, 'password', { ignoreCase: true })) {
                throw new Error('Cannot use password as a password');
            }
        },
    },
});

module.exports = User

/* ------------------------------ USERS Object ------------------------------ */

// const me = new User({
//     name: 'Robert',
//     age: 31,
//     email: 'everyone@wemail.com',
//     password: 'pAssWord',
// });

/* ---------------------------- USERS Connection ---------------------------- */

// me.save()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });