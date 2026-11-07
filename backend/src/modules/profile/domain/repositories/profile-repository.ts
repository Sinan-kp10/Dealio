import { IBaseRepository } from "../../../../shared/domian/base.repository";

export interface IProfileRepository extends IBaseRepository<boolean> {
    findProfilePictureKey(userId: string): Promise<string | null>;
    updateProfilePictureKey(userId: string,profilePictureKey: string): Promise<void>;
}