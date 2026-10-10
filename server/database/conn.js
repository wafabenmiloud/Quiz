const dns = require("dns");
const mongoose = require("mongoose");

/** used only when the machine's own DNS can't answer Atlas SRV lookups */
const PUBLIC_DNS = ['1.1.1.1', '8.8.8.8'];

const Connection = async (mongoURI) => {
  if (!mongoURI) {
    console.log('MONGODB_URI is not set — results and stats are disabled');
    return;
  }
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected ...')
  } catch (error) {
    // Node on some Windows setups falls back to 127.0.0.1 as its DNS server,
    // which refuses the SRV query behind mongodb+srv:// URIs. Retry once with public DNS.
    if (error.syscall === 'querySrv') {
      try {
        dns.setServers(PUBLIC_DNS);
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected (using public DNS) ...')
        return;
      } catch (retryError) {
        error = retryError;
      }
    }
    console.log('Error connecting to MongoDB', error.message)
  }
};
module.exports = Connection;
