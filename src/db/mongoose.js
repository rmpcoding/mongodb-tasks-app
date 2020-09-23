const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
});

const newTask = new Task({
    description: 'Battle Rope Exercises',
    completed: false,
});

newTask
    .save()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

// const User = mongoose.model('User', {
//   name: {
//       type: String
//   },
//   age: {
//       type: Number
//   }
// })

// const me = new User({
//   name: 'Robert',
//   age: 31
// })

// me.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })
