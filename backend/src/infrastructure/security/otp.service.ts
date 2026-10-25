import { randomInt } from "node:crypto";
import { redis } from "../database/redis-client";
import { AppError } from "../../shared/errors/app-error";

export class OtpService {

    private readonly OTP_EXPIRY_SECONDS = 3 * 60

    generateAndStore = async(email: string,  registrationData: unknown) : Promise<string> =>{
        const otp = randomInt(100000, 1000000).toString()

        const key = `email-otp:${email.trim().toLowerCase()}`

        await redis.set(key,JSON.stringify({
            otp,
            registrationData
        }),
        {
            EX : this.OTP_EXPIRY_SECONDS
        })

        return otp
    }

    verify = async(email : string, otp : string) : Promise<"valid" | "invalid" | "expired"> => {

        const key = `email-otp:${email.trim().toLowerCase()}`
        const storedData = await redis.get(key)

        if (!storedData) {
            return "expired";
        }
        const {otp : storedOtp} = JSON.parse(storedData) as {otp : string}

        if (storedOtp !== otp) {
            return "invalid"
        }

        return "valid";
    }

    getRegistrationData = async<T>(email: string) : Promise<T | null> =>{

        const key = `email-otp:${email.trim().toLowerCase()}`
        const storedData = await redis.get(key);

        if (!storedData) {
            return null;
        }

        const parsed = JSON.parse(storedData) as {registrationData: T;};

        return parsed.registrationData;
    }

    resend = async (email: string) : Promise<string> => {

        const key = `email-otp:${email.trim().toLowerCase()}`

        const storedData = await redis.get(key)

        if(!storedData){
            throw new AppError( "OTP has expired. Please register again.",400)
        }

        const parsed = JSON.parse(storedData) as {otp : string, registrationData: unknown;}

        const otp = randomInt(100000, 1000000).toString()

        await redis.set(key,JSON.stringify({
            ...parsed,
            otp,
        }),
        {
            EX : this.OTP_EXPIRY_SECONDS
        })

        return otp
        
    }

    delete = async(email: string) : Promise<void> => {
        const key = `email-otp:${email.trim().toLowerCase()}`

        await redis.del(key)
    }

}