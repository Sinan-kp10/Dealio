import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../shared/application/base.usecase";
import { sendResponse } from "../../../../shared/presentation/api-response";
import type { RemoveProfilePictureDto, UpdateProfilePictureDto, UpdatedProfilePictureDto } from "../../application/dto/profile-picture.dto";
import { BadRequestError, UnauthorizedError } from "../../../../shared/errors/app-error";

export class ProfilePictureController {
    constructor(
        private readonly updateProfilePictureUseCase: IUseCase<UpdateProfilePictureDto, UpdatedProfilePictureDto>,
        private readonly removeProfilePictureUseCase: IUseCase<RemoveProfilePictureDto, void>,
    ) {}

    updateProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            if (!userId) {
                throw new UnauthorizedError("User authentication required");
            }

            if (!req.file) {
                throw new BadRequestError("Profile picture is required", "profilePicture");
            }

            const result = await this.updateProfilePictureUseCase.execute({
                userId,
                file: {
                    buffer: req.file.buffer,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                },
            });

            sendResponse(res, "Profile picture updated successfully", result);
        } catch (error) {
            next(error);
        }
    };

    removeProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            if (!userId) {
                throw new UnauthorizedError("User authentication required");
            }

            await this.removeProfilePictureUseCase.execute({ userId });

            sendResponse(res, "Profile picture removed successfully");
        } catch (error) {
            next(error);
        }
    };
}

