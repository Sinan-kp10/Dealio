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

export interface RemoveProfilePictureDto {
    userId: string;
}