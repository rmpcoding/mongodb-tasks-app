const Task = require('./models/Task');
require('./db/mongoose');

// Task.findByIdAndDelete('5f71204aa81a360b8a95dbdb')
//     .then((results) => {
//         console.log(results)
//         return Task.countDocuments({ completed: true})
//     })
//     .then((results2) => {
//         console.log(results2)
//     })
//     .catch((e) => {
//         console.log(e)
// })

const deleteTask = async (id) => {
    const user = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
};

deleteTask('5f712a329aa94d0d0d0b6208')
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    });
