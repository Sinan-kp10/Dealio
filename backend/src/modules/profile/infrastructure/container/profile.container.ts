import { UpdateCustomerProfileUseCase } from "../../application/use-cases/update-customer-profile.use-case.js";
import { GetCustomerProfileUseCase } from "../../application/use-cases/get-customer-profile.use-case.js";
import { CustomerProfileController } from "../../presentation/controllers/customer-profile.controller.js";

import { GetEnterpriseProfileUseCase } from "../../application/use-cases/get-enterprise-profile.use-case.js";
import { EnterpriseProfileController } from "../../presentation/controllers/enterprise-profile.controller.js";
import { PrismaCustomerProfileRepository } from "../repositories/prisma-customer-profile.repository.js";
import { PrismaEnterpriseProfileRepository } from "../repositories/prisma-enterprise-profile.repository.js";
import { PrismaProfileRepository } from "../repositories/prisma-profile-picture.repository.js";
import { S3StorageService } from "../../../../infrastructure/storage/s3/s3-storage.service.js";
import { UpdateProfilePictureUseCase } from "../../application/use-cases/update-profile-picture.use-case.js";
import { RemoveProfilePictureUseCase } from "../../application/use-cases/remove-profile-picture.use-case.js";
import { ProfilePictureController } from "../../presentation/controllers/profile-picture.controller.js";
import { UpdateEnterpriseDetailsUseCase } from "../../application/use-cases/update-enterprise-company-information.use-case.js";
import { GetActiveCategoriesUseCase } from "../../application/use-cases/get-active-categories.use-case.js";

const s3StorageService = new S3StorageService();

//customer
const customerProfileRepository = new PrismaCustomerProfileRepository();
const getCustomerProfileUseCase = new GetCustomerProfileUseCase(customerProfileRepository, s3StorageService);
const editCustomerProfileUseCase = new UpdateCustomerProfileUseCase(customerProfileRepository);
export const customerProfileController = new CustomerProfileController(getCustomerProfileUseCase, editCustomerProfileUseCase);

//enterprise
const enterpriseProfileRepository = new PrismaEnterpriseProfileRepository()
const getEnterpriseProfileUseCase = new GetEnterpriseProfileUseCase(enterpriseProfileRepository, s3StorageService)
const updateEnterpriseDetailsUseCase = new UpdateEnterpriseDetailsUseCase(enterpriseProfileRepository)
const getActiveCategoriesUseCase = new GetActiveCategoriesUseCase(enterpriseProfileRepository)
export const enterpriseProfileController = new EnterpriseProfileController(getEnterpriseProfileUseCase, updateEnterpriseDetailsUseCase, getActiveCategoriesUseCase)

//profile picture
const profileRepository = new PrismaProfileRepository();
const updateProfilePictureUseCase = new UpdateProfilePictureUseCase(profileRepository, s3StorageService);
const removeProfilePictureUseCase = new RemoveProfilePictureUseCase(profileRepository, s3StorageService);
export const profilePictureController = new ProfilePictureController(updateProfilePictureUseCase, removeProfilePictureUseCase);