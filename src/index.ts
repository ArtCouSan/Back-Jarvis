import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes/routes';
import { createConnection } from 'typeorm';

var corsOptions = {
    origin: 'http://localhost:4200'
}

createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "root",
    "database": "local",
    "synchronize": true,
    "logging": false,
    "entities": [__dirname + "/model/*.ts"]
}).then(async connection => {

    const app = express();

    app.use(express.json());

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: false }));

    // middleware
    app.use((req: any, res: any, next: any) => {
        // cors

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        app.use(cors(corsOptions));
        next();
    });

    app.use('/', routes);

    app.listen(8081, () => {
        console.log('Servidor rodando');
    });

}).catch(error => console.log("TypeORM connection error: ", error));
