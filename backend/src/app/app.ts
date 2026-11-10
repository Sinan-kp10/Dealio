import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "../infrastructure/logging/http-logger"; 
import { errorHandler } from "./middlewares/error-handler.middleware"; 
import { globalRateLimiter } from "./middlewares/rate-limiter.middleware"; 
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { authRouter } from "../modules/auth/presentation/http/routes/auth.routes"; 
import userManagementRoutes from "../modules/user-management/presentation/routes/user-management.routes";
import customerProfileRouter from "../modules/profile/presentation/routes/customer-profile.routes";
import enterpriseProfileRouter from "../modules/profile/presentation/routes/enterprise-profile.routes"
import profilePictureRouter from "../modules/profile/presentation/routes/profile-picture.routes";
import categoryRoutes from "../modules/category-management/presentation/routes/category.routes"
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

app.use("/api", globalRateLimiter);

app.use("/api/auth", authRouter)
app.use("/api/admin", userManagementRoutes)
app.use("/api/admin", categoryRoutes)
app.use("/api/customer", customerProfileRouter)
app.use("/api/enterprise", enterpriseProfileRouter)
app.use("/api/profile", profilePictureRouter)


app.use(notFoundMiddleware)
app.use(errorHandler)

export default app;