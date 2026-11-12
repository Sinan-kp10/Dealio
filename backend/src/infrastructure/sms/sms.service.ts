export class SmsService {
    sendOtp = async (phone: string, otp: string): Promise<void> => {
        console.log(`[MOCK SMS] Phone: ${phone}`);
        console.log(`[MOCK SMS] Verification Code: ${otp}`);
        console.log(`Expires in 3 minutes`);
    };
}

