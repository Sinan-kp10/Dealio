import { CustomerProfileController } from "../../presentation/controllers/customer-profile.controller.js";
import { EnterpriseProfileController } from "../../presentation/controllers/enterprise-profile.controller.js";
import { PrismaCustomerProfileRepository } from "../repositories/prisma-customer-profile.repository.js";
import { PrismaEnterpriseProfileRepository } from "../repositories/prisma-enterprise-profile.repository.js";
import { PrismaProfileRepository } from "../repositories/prisma-profile-picture.repository.js";
import { S3StorageService } from "../../../../infrastructure/storage/s3/s3-storage.service.js";
import { UpdateProfilePictureUseCase } from "../../application/use-cases/profile-picture/update-profile-picture.use-case.js";
import { ProfilePictureController } from "../../presentation/controllers/profile-picture.controller.js";
import { PrismaEnterpriseKycRepository } from "../repositories/prisma-enterprise-kyc.repository.js";
import { EnterpriseKycController } from "../../presentation/controllers/enterprise-kyc.controller.js";
import { GetCustomerProfileUseCase } from "../../application/use-cases/cutsomer/get-customer-profile.use-case.js";
import { UpdateCustomerProfileUseCase } from "../../application/use-cases/cutsomer/update-customer-profile.use-case.js";
import { GetEnterpriseProfileUseCase } from "../../application/use-cases/enterprise/get-enterprise-profile.use-case.js";
import { UpdateEnterpriseDetailsUseCase } from "../../application/use-cases/enterprise/update-enterprise-details.use-case.js";
import { GetActiveCategoriesUseCase } from "../../application/use-cases/enterprise/get-active-categories.use-case.js";
import { RemoveProfilePictureUseCase } from "../../application/use-cases/profile-picture/remove-profile-picture.use-case.js";
import { CreateEnterpriseKycUseCase } from "../../application/use-cases/enterprise/create-enterprise-kyc.use-case.js";
import { UpdateEnterpriseKycUseCase } from "../../application/use-cases/enterprise/update-enterprise-kyc.use-case.js";
import { GetEnterpriseKycUseCase } from "../../application/use-cases/enterprise/get-enterprise-kyc.use-case.js";

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

//enterprise kyc
const enterpriseKycRepository = new PrismaEnterpriseKycRepository();
const createEnterpriseKycUseCase = new CreateEnterpriseKycUseCase(enterpriseKycRepository, s3StorageService);
const updateEnterpriseKycUseCase = new UpdateEnterpriseKycUseCase(enterpriseKycRepository, s3StorageService);
const getEnterpriseKycUseCase = new GetEnterpriseKycUseCase(enterpriseKycRepository, s3StorageService);
export const enterpriseKycController = new EnterpriseKycController(getEnterpriseKycUseCase, createEnterpriseKycUseCase, updateEnterpriseKycUseCase);