const mongoose = require("mongoose");
 

const Connection = (mongoURI) => {
  const URL = mongoURI;
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected ...')
  } catch (error) {
    console.log('Error connecting to MongoDB', error)
  }
};
module.exports = Connection;
