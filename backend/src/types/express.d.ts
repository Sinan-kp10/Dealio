import type { JwtPayload } from "../modules/auth/infrastructure/security/jwt-token.service"

declare global {
    namespace Express {
        interface Request {
            auth?: JwtPayload;
        }
    }
}

export {}