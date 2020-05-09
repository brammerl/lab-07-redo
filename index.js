const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());



app.get('/', (req, res) => {
    res.json({ hello: 'world' });
});
 












app.listen(PORT, () => console.log(`running on port ${PORT}`));