import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./infrastructure/logging/http-logger";
import { errorHandler } from "./presentation/http/middlewares/error-handler.middleware";
import { notFoundMiddleware } from "./presentation/http/middlewares/not-found.middleware";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(httpLogger)


app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Dealio API is running",
  });
});

app.use(errorHandler)
app.use(notFoundMiddleware)

export default app;