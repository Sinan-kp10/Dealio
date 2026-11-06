import { IUseCase } from "../../../../shared/application/base.usecase";
import { BadGatewayError, NotFoundError } from "../../../../shared/errors/app-error";
import { SmsService } from "../../../../infrastructure/sms/sms.service";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { OtpService } from "../../infrastructure/security/otp.service";
import { ResendPhoneOtpDto } from "../dto/phone-otp.dto";

export class ResendPhoneOtpUseCase implements IUseCase<ResendPhoneOtpDto, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly otpService: OtpService,
        private readonly smsService: SmsService
    ) {}

    execute = async (input: ResendPhoneOtpDto): Promise<void> => {
        const user = await this.userRepository.findById(input.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const { otp, phone } = await this.otpService.resendPhoneOtp(input.userId);

        try {
            await this.smsService.sendOtp(phone, otp);
        } catch {
            throw new BadGatewayError("Failed to resend verification SMS");
        }
    };
}

