const express = require('express');
const cors = require('cors');
const routes = require('./src/routes.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
