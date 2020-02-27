
import "@config/setup";
import express, { Router } from "express";
import cors from "cors";
import logger from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../docs/swagger.json';
import routes from "@routes/index";
import ErrorHandler from "@middlewares/error";
import { authenticateUser } from '@middlewares/auth';
import { NotFoundError } from './helpers/errors';

declare const debug;

const { PORT = 8080 } = process.env;

const app = express();

app.use(cors());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(routes(Router, [{mid: authenticateUser, exclude: '/auth'}]));

app.all("*", (req) => {
    throw NotFoundError(`PATH ${req.path} does not exist`);
});
app.use(ErrorHandler);

export default app.listen(PORT, () => {
    debug(`connected to server on port ${PORT}`);
});
