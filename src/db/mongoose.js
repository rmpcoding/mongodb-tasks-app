const mongoose = require('mongoose');
const { default: validator } = require('validator');
const { isEmail, isLength, contains } = require('validator').default;

mongoose.connect('mongodb://127.0.0.1:27017/tasks-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

/* -------------------------------------------------------------------------- */
/*                                  TASKS                                     */
/* -------------------------------------------------------------------------- */

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     },
// });

/* ------------------------------ TASKS Object ------------------------------ */

// const newTask = new Task({
//     description: 'Just Another Exercise',
// });

/* ---------------------------- TASKS Connection ---------------------------- */

// newTask
//     .save()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

/* -------------------------------------------------------------------------- */
/*                                  USERS                                     */
/* -------------------------------------------------------------------------- */

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//     },
//     age: {
//         type: Number,
//     },
//     email: {
//         type: String,
//         required: true,
//         validate(value) {
//             if (!isEmail(value)) {
//                 throw new Error('Invalid email');
//             }
//         },
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (contains(value, 'password', { ignoreCase: true })) {
//                 throw new Error('Cannot use password as a password');
//             }
//         },
//     },
// });

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
