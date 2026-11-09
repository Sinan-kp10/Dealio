import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/auth.middleware";
import { requireRole } from "../../../../app/middlewares/role.middleware";
import validateImage from "../../../../app/middlewares/validate-image.middleware";
import { enterpriseBankRecordController, enterpriseKycController, enterpriseProfileController } from "../../infrastructure/container/profile.container";
import { validateRequest } from "../../../../app/middlewares/validate-request.middleware";
import { CreateEnterpriseKycSchema } from "../validators/create-enterprise-kyc.schema";
import { UpdateEnterpriseKycSchema } from "../validators/update-enterprise-kyc.schema";
import { UpdateEnterpriseDetailsSchema } from "../validators/update-enterprise-details.schema";
import { CreateEnterpriseBankRecordSchema } from "../validators/create-enterprise-bank-record.schema";
import { UpdateEnterpriseBankRecordSchema } from "../validators/update-enterprise-bank-record.schema";

const router = Router();

router.use(authMiddleware)
router.use(requireRole("ENTERPRISE_MANAGER"))
router.get("/profile", enterpriseProfileController.getProfile)
router.patch("/profile", validateRequest(UpdateEnterpriseDetailsSchema), enterpriseProfileController.updateDetails)
router.get("/categories", enterpriseProfileController.getCategories)

router.get("/kyc", enterpriseKycController.getKyc)
router.post("/kyc", validateImage, validateRequest(CreateEnterpriseKycSchema), enterpriseKycController.addKyc)
router.patch("/kyc", validateImage, validateRequest(UpdateEnterpriseKycSchema), enterpriseKycController.updateKyc)

router.get("/bank-record", enterpriseBankRecordController.getBankRecord)
router.post("/bank-record", validateRequest(CreateEnterpriseBankRecordSchema), enterpriseBankRecordController.addBankRecord)
router.patch("/bank-record", validateRequest(UpdateEnterpriseBankRecordSchema), enterpriseBankRecordController.updateBankRecord)

export default router