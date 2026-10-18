import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./infrastructure/logging/http-logger";
import { errorHandler } from "./presentation/http/middlewares/error-handler.middleware";
import { notFoundMiddleware } from "./presentation/http/middlewares/not-found.middleware";
import { authRouter } from "./presentation/http/routes/auth.routes";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(httpLogger)

app.use("/api/auth", authRouter);

app.use(errorHandler)
app.use(notFoundMiddleware)

export default app;