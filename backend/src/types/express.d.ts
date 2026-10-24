import type { JwtPayload } from "../infrastructure/security/jwt-token.service";

declare global {
    namespace Express {
        interface Request {
            auth?: JwtPayload;
        }
    }
}

export {};