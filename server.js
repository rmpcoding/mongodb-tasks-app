const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
    console.log(`App is now listening on http://localhost:${PORT}`);
});
