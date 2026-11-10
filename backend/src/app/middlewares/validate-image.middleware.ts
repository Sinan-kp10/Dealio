import multer from "multer";
import type { Request, Response, NextFunction } from "express";
import { fileTypeFromBuffer } from "file-type";
import { BadRequestError } from "../../shared/errors/app-error";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
});

const validateImage = (req: Request, res: Response, next: NextFunction): void => {
    upload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "image", maxCount: 1 },
    ])(req, res, async (err: unknown) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return next(new BadRequestError("Image size must not exceed 5 MB", "image"));
                }
                return next(new BadRequestError(err.message, "image"));
            }
            return next(err);
        }

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        if (files) {
            req.file = files["profilePicture"]?.[0] || files["image"]?.[0];
        }

        if (req.file) {
            if (req.file.size > MAX_FILE_SIZE) {
                return next(new BadRequestError("Image size must not exceed 5 MB", "image"));
            }

            try {
                const detectedType = await fileTypeFromBuffer(req.file.buffer);

                if (
                    !detectedType ||
                    !ALLOWED_IMAGE_TYPES.includes(detectedType.mime) ||
                    detectedType.mime !== req.file.mimetype
                ) {
                    return next(new BadRequestError("Only JPEG, PNG, or WebP images are allowed", "image"));
                }
            } catch (error) {
                return next(error);
            }
        }

        next();
    });
};

export default validateImage;  