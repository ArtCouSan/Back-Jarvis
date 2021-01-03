import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes/routes';

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