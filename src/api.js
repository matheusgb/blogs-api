const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const loginRouter = require('./routes/login.route');
const userRouter = require('./routes/user.route');
const categoriesRouter = require('./routes/categories.route');
const postRouter = require('./routes/post.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
