import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "../modules/auth/infrastructure/logging/http-logger"; 
import { errorHandler } from "./middlewares/error-handler.middleware"; 
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { authRouter } from "../modules/auth/presentation/http/routes/auth.routes"; 
import userManagementRoutes from "../modules/user-management/presentation/routes/user-management.routes";
import customerProfileRouter from "../modules/profile/presentation/routes/customer-profile.routes";
import cookieParser from "cookie-parser";
const app = express();
app.use(helmet())

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);


app.use(express.json())
app.use(cookieParser());
app.use(httpLogger)

app.use("/api/auth", authRouter)
app.use("/api/admin", userManagementRoutes)
app.use("/api/customer", customerProfileRouter);

app.use(notFoundMiddleware)
app.use(errorHandler)

export default app;