import { PrismaQuotationRequestRepository } from "../repositories/prisma-quotation-request.repository";
import { CreateQuotationRequestUseCase } from "../../application/use-cases/customer/create-quotation-request.use-case";
import { GetQuotationRequestsUseCase } from "../../application/use-cases/customer/get-quotation-requests.use-case";
import { GetQuotationRequestDetailsUseCase } from "../../application/use-cases/customer/get-quotation-request-details.use-case";
import { QuotationRequestController } from "../../presentation/controllers/customer/quotation-request.controller";

const quotationRequestRepository = new PrismaQuotationRequestRepository();
const createQuotationRequestUseCase = new CreateQuotationRequestUseCase(quotationRequestRepository);
const getQuotationRequestsUseCase = new GetQuotationRequestsUseCase(quotationRequestRepository);
const getQuotationRequestDetailsUseCase = new GetQuotationRequestDetailsUseCase(quotationRequestRepository);

export const quotationRequestController = new QuotationRequestController(
    createQuotationRequestUseCase,
    getQuotationRequestsUseCase,
    getQuotationRequestDetailsUseCase
);
