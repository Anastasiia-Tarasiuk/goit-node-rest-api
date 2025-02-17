const mongoose = require('mongoose');
const app = require('./app');

const { DB_URL, PORT = 3000 } = process.env;

mongoose.connect(DB_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


