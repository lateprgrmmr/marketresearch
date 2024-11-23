import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, RequestHandler, Response } from "express";
import daos from "./database";
import { Connection } from "./database/connection";
import { Database } from "massive";

export type CustomRequest = Request & { db: Connection };

// A nice function for wrapping async express route handlers
// Defines a single try...catch handler
// See https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
type RequestHandlerFunction = (req: Request, res: Response, next?: NextFunction) => Promise<Response>;
type MiddlewareHandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export function asyncHandler(fn: MiddlewareHandlerFunction): RequestHandler;
export function asyncHandler(fn: RequestHandlerFunction): RequestHandler;
export function asyncHandler(fn: RequestHandlerFunction | MiddlewareHandlerFunction): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        connection((req as CustomRequest).db, async (task: Connection): Promise<void> => {
            (req as CustomRequest).db = task;
            try {
                await fn(req as CustomRequest, res, next);
            } catch (e) {
                next(e);
            }
        });
    };
}

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", asyncHandler(async (req: Request, res: Response) => {
    const { db } = req;
    const user = await daos.users.findAllRecords(req.db, {
        userIds: [1],
        entityId: undefined,
        includeDeleted: true
    });
}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function connection(db: Database, arg1: (task: Connection) => Promise<void>) {
    throw new Error("Function not implemented.");
}
