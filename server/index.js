const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/route')
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

/** import connection file */
const Connection = require ('./database/conn');
const app = express()

/** browsers allowed to call the API — comma-separated list in CLIENT_ORIGIN */
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000,https://quiz-p9dl.onrender.com')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

/** app middlewares */
app.set('trust proxy', 1); /** behind Render's proxy, so req.ip is the real client */
app.use(morgan('tiny'));
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));


/** appliation port */
const PORT = process.env.PORT || 8080;


/** routes */
app.use('/api', router) /** apis */


app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

//db
const mongoURI = process.env.MONGODB_URI;
Connection(mongoURI);

//server
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
