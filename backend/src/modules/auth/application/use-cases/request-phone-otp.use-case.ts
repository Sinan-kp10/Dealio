import { IUseCase } from "../../../../shared/application/base.usecase";
import { BadGatewayError, BadRequestError, ConflictError, NotFoundError } from "../../../../shared/errors/app-error";
import { SmsService } from "../../../../infrastructure/sms/sms.service";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { OtpService } from "../../infrastructure/security/otp.service";
import { RequestPhoneOtpDto } from "../dto/phone-otp.dto";

export class RequestPhoneOtpUseCase implements IUseCase<RequestPhoneOtpDto, void> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly otpService: OtpService,
        private readonly smsService: SmsService
    ) {}

    execute = async (input: RequestPhoneOtpDto): Promise<void> => {
        const user = await this.userRepository.findById(input.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const phoneToVerify = input.phone?.trim() || user.phone?.trim();

        if (!phoneToVerify) {
            throw new BadRequestError("Phone number is required", "phone");
        }

        if (user.phone === phoneToVerify && user.phone_verified) {
            throw new ConflictError("Phone number is already verified", "phone");
        }

        const isVerifiedByOther = await this.userRepository.isPhoneVerified(phoneToVerify);
        if (isVerifiedByOther) {
            throw new ConflictError("Phone number is already registered and verified", "phone");
        }

        const otp = await this.otpService.generatePhoneOtp(input.userId, phoneToVerify);

        try {
            await this.smsService.sendOtp(phoneToVerify, otp);
        } catch {
            await this.otpService.deletePhoneOtp(input.userId);
            throw new BadGatewayError("Failed to send verification SMS");
        }
    };
}

