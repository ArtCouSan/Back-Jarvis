import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes/routes';
import { createConnection } from 'typeorm';

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
        app.use(cors());
        next();
    });

    app.use('/', routes);

    app.listen(8081, () => {
        console.log('Servidor rodando');
    });

}).catch(error => console.log("TypeORM connection error: ", error));
