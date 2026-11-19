import { PrismaQuotationRequestRepository } from "../repositories/prisma-quotation-request.repository";
import { CreateQuotationRequestUseCase } from "../../application/use-cases/customer/create-quotation-request.use-case";
import { GetQuotationRequestsUseCase } from "../../application/use-cases/customer/get-quotation-requests.use-case";
import { GetQuotationRequestDetailsUseCase } from "../../application/use-cases/customer/get-quotation-request-details.use-case";
import { QuotationRequestController } from "../../presentation/controllers/customer/quotation-request.controller";
import { CancelQuotationRequestUseCase } from "../../application/use-cases/customer/cancel-quotation-request.use-case";
import { GetRecentQuotationRequestsUseCase } from "../../application/use-cases/customer/get-recent-quotation-requests.use-case";

const quotationRequestRepository = new PrismaQuotationRequestRepository();
const createQuotationRequestUseCase = new CreateQuotationRequestUseCase(quotationRequestRepository);
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
