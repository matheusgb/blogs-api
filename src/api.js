const express = require('express');
const loginRouter = require('./routes/login.route');
const loginMiddleware = require('./middlewares/login.middleware');

// ...

const app = express();

app.use(express.json());
app.use('/login', loginMiddleware, loginRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
