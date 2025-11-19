import express from 'express';
//import routes from './routes'
import config from './config/config.js';
import cors from 'cors';
import { poolPromise } from './config/db.js';

const app = express();

app.use(express.json());


app.use(cors({
    origin: 'http://127.0.0.1:5000',
    credentials: true,
}));

//app.use('', routes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

const pool = await poolPromise;
