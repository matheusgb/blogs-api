require('dotenv').config();
const app = require('./api');

app.listen(3000, () => console.log('ouvindo porta', 3000));
