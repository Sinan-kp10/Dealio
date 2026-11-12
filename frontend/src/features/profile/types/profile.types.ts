export interface UpdatedProfilePictureResponse {
  success: boolean;
  message: string;
  data: {
    profilePictureUrl: string;
  };
}

export interface RemoveProfilePictureResponse {
  success: boolean;
  message: string;
}

