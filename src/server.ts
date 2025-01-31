import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import routes from './routes';
dotenv.config();

export const app: Express = express();
app.use(helmet());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        msg: 'Checking Checking, Connection established!',
    });
});

app.use('/api/', routes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running on port ${port}`);
});
