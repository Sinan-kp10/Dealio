import type { Request, Response, NextFunction } from "express";
import type { IUseCase } from "../../../../shared/application/base.usecase";
import type { IApiResponse } from "../../../../shared/application/api-response";
import type { UpdateProfilePictureDto, UpdatedProfilePictureDto } from "../../application/dto/update-profile-picture.dto";
import type { DeleteProfilePictureDto } from "../../application/dto/delete-profile-picture.dto";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { BadRequestError, UnauthorizedError } from "../../../../shared/errors/app-error";

export class ProfilePictureController {
    constructor(
        private readonly updateProfilePictureUseCase: IUseCase<UpdateProfilePictureDto, UpdatedProfilePictureDto>,
        private readonly deleteProfilePictureUseCase: IUseCase<DeleteProfilePictureDto, void>,
    ) {}

    updateProfilePicture = async (req: Request, res: Response<IApiResponse<UpdatedProfilePictureDto>>, next: NextFunction): Promise<void> => {
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

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Profile picture updated successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteProfilePicture = async (req: Request, res: Response<IApiResponse>, next: NextFunction): Promise<void> => {
        try {
            const userId = req.auth?.userId;
            if (!userId) {
                throw new UnauthorizedError("User authentication required");
            }

            await this.deleteProfilePictureUseCase.execute({ userId });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: "Profile picture removed successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}

