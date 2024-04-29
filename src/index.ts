import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import * as morgan from 'morgan';
import { port } from "./config"

// Middleware function to handle all errors (returns better error messages)
function handleError(error, request, response, next) {
    response.status(error.statusCode || 500).send({ message: error.message })
}

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(morgan('tiny')); // Log status codes from requests
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next);
                res.json(result);
            } catch (error) {
                next(error); // Passes on to middleware 
            }
        })
    })

    app.use(handleError);

    // start express server
    app.listen(port);

    console.log(`Express server has started on port ${port} Open http://localhost:${port}/doctors to see results`)

}).catch(error => console.log(error))
