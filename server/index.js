const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/route')
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

/** import connection file */
const Connection = require ('./database/conn');
const app = express()

/** app middlewares */
app.use(morgan('tiny'));
app.use(cors({credentials: true, origin: ['http://localhost:3000','https://quiz-p9dl.onrender.com/']}));
app.use(express.json());


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


