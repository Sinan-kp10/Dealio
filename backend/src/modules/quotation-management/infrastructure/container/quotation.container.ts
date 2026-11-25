import { CreateQuotationRequestUseCase } from "../../application/use-cases/customer/create-quotation-request.use-case";
import { GetQuotationRequestsUseCase } from "../../application/use-cases/customer/get-quotation-requests.use-case";
import { GetQuotationRequestDetailsUseCase } from "../../application/use-cases/customer/get-quotation-request-details.use-case";
import { QuotationRequestController } from "../../presentation/controllers/customer/quotation-request.controller";
import { CancelQuotationRequestUseCase } from "../../application/use-cases/customer/cancel-quotation-request.use-case";
import { GetRecentQuotationRequestsUseCase } from "../../application/use-cases/customer/get-recent-quotation-requests.use-case";
import { notificationService } from "../../../notification/infrastructure/container/notification.container";
import { GetAvailableQuotationsUseCase } from "../../application/use-cases/enterprise/get-available-quotations.use-case";
import { MarkNotInterestedUseCase } from "../../application/use-cases/enterprise/mark-not-interested.use-case";
import { GetCustomerQuotationDetailsUseCase } from "../../application/use-cases/enterprise/get-customer-quotation-details.use-case";
import { EnterpriseQuotationController } from "../../presentation/controllers/enterprise/enterprise-quotation.controller";
import { GetAcceptedProposalsUseCase } from "../../application/use-cases/enterprise/get-accepted-proposal.use-case";
import { EnterpriseAcceptedProposalController } from "../../presentation/controllers/enterprise/enterprise-accepted-proposal.controller";
import { PrismaQuotationRequestRepository } from "../repositories/customer/prisma-quotation-request.repository";
import { PrismaEnterpriseQuotationRepository } from "../repositories/enterprise/prisma-enterprise-quotation.respository";
import { PrismaEnterpriseAcceptedProposalRepository } from "../repositories/enterprise/prisma-enterprise-accepted-proposal.repository";

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
const getCustomerQuotationDetailsUseCase = new GetCustomerQuotationDetailsUseCase(enterpriseQuotationRepository);

export const enterpriseQuotationController = new EnterpriseQuotationController(
    getAvailableQuotationsUseCase,
    markNotInterestedUseCase,
    getCustomerQuotationDetailsUseCase
);

const enterpriseAcceptedProposalRepository = new PrismaEnterpriseAcceptedProposalRepository();
const getAcceptedProposalsUseCase = new GetAcceptedProposalsUseCase(enterpriseAcceptedProposalRepository);

export const enterpriseAcceptedProposalController = new EnterpriseAcceptedProposalController(
    getAcceptedProposalsUseCase
);
