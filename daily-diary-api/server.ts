import express from "express";
import cors from "cors";
import { notFoundRouteHandler } from "./controllers/common.controller";
import { errorHandler, logRequest } from "./middlewares/middleware";
import diaryRouter from "./routes/diary/diary.routes";
import "dotenv/config";

// initial application
const server = express();

// configuration
server.use(cors());
server.use(logRequest);

// middleware
server.use("/api/diary", diaryRouter);

// routers
server.all("*", notFoundRouteHandler);

// error handlers
server.use(errorHandler);

// bootstrap application
server.listen(process.env.SERVER_PORT || 3000, () =>
    console.log("Server is running...")
);
