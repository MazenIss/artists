const express = require('express');
const artistRoutes = require('./routes/artistRoutes');
const bodyParser = require('body-parser'); 

const app = express();
app.use(bodyParser.json());

app.use('/', artistRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;