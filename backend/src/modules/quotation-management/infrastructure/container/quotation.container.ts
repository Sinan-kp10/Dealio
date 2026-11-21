import { PrismaQuotationRequestRepository } from "../repositories/prisma-quotation-request.repository";
import { CreateQuotationRequestUseCase } from "../../application/use-cases/customer/create-quotation-request.use-case";
import { GetQuotationRequestsUseCase } from "../../application/use-cases/customer/get-quotation-requests.use-case";
import { GetQuotationRequestDetailsUseCase } from "../../application/use-cases/customer/get-quotation-request-details.use-case";
import { QuotationRequestController } from "../../presentation/controllers/customer/quotation-request.controller";
import { CancelQuotationRequestUseCase } from "../../application/use-cases/customer/cancel-quotation-request.use-case";
import { GetRecentQuotationRequestsUseCase } from "../../application/use-cases/customer/get-recent-quotation-requests.use-case";
import { notificationService } from "../../../notification/infrastructure/container/notification.container";
import { PrismaEnterpriseQuotationRepository } from "../repositories/prisma-enterprise-quotation.respository";
import { GetAvailableQuotationsUseCase } from "../../application/use-cases/enterprise/get-available-quotations.use-case";
import { MarkNotInterestedUseCase } from "../../application/use-cases/enterprise/mark-not-interested.use-case";
import { EnterpriseQuotationController } from "../../presentation/controllers/enterprise/enterprise-quotation.controller";

const quotationRequestRepository = new PrismaQuotationRequestRepository();
const createQuotationRequestUseCase = new CreateQuotationRequestUseCase(quotationRequestRepository, notificationService);
const getQuotationRequestsUseCase = new GetQuotationRequestsUseCase(quotationRequestRepository);
const getQuotationRequestDetailsUseCase = new GetQuotationRequestDetailsUseCase(quotationRequestRepository);
const cancelQuotationRequestUseCase = new CancelQuotationRequestUseCase(quotationRequestRepository);
const getRecentQuotationRequestsUseCase = new GetRecentQuotationRequestsUseCase(quotationRequestRepository);

export const quotationRequestController = new QuotationRequestController(
    createQuotationRequestUseCase,
    getQuotationRequestsUseCase,
    getQuotationRequestDetailsUseCase,
    cancelQuotationRequestUseCase,
    getRecentQuotationRequestsUseCase
);

const enterpriseQuotationRepository = new PrismaEnterpriseQuotationRepository();
const getAvailableQuotationsUseCase = new GetAvailableQuotationsUseCase(enterpriseQuotationRepository);
const markNotInterestedUseCase = new MarkNotInterestedUseCase(enterpriseQuotationRepository);

export const enterpriseQuotationController = new EnterpriseQuotationController(getAvailableQuotationsUseCase, markNotInterestedUseCase);