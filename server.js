require('dotenv').config({ path: '../.env' }); 

const mongoose = require('mongoose');
const app = require('./app');
const connectDB= require('./config/db')
const port=5000
const startserver = async () => {
  try{
    await connectDB();
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  }
  catch(err)
  {
    console.error(err);
  }
};
startserver()
