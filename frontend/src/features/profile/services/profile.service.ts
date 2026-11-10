import axiosInstance from "../../../app/lib/axios";
import type { RemoveProfilePictureResponse, UpdatedProfilePictureResponse } from "../types/profile.types";

export const updateProfilePicture = async (fileOrFormData: File | FormData): Promise<UpdatedProfilePictureResponse> => {
    const formData = fileOrFormData instanceof FormData ? fileOrFormData : new FormData();
    if (fileOrFormData instanceof File) {
        formData.append("profilePicture", fileOrFormData);
    }

    const response = await axiosInstance.put<UpdatedProfilePictureResponse>("/profile/picture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const removeProfilePicture = async (): Promise<RemoveProfilePictureResponse> => {
    const response = await axiosInstance.delete<RemoveProfilePictureResponse>("/profile/picture");
    return response.data;
};

