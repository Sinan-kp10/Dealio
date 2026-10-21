import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./infrastructure/logging/http-logger";
import { errorHandler } from "./presentation/http/middlewares/error-handler.middleware";
import { notFoundMiddleware } from "./presentation/http/middlewares/not-found.middleware";
import { authRouter } from "./presentation/http/routes/auth.routes";
const app = express();
app.use(helmet())

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


app.use(express.json());
app.use(httpLogger)

app.use("/api/auth", authRouter);

app.use(notFoundMiddleware)
app.use(errorHandler)

export default app;