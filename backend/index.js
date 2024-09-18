const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', require('./routes'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
