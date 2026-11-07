export interface UpdateProfilePictureDto {
    userId: string;
    file: {
        buffer: Buffer;
        mimetype: string;
        size: number;
    };
}

export interface UpdatedProfilePictureDto {
  profilePictureUrl: string;
}