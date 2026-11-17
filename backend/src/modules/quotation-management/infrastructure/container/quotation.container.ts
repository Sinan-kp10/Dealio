import { PrismaQuotationRequestRepository } from "../repositories/prisma-quotation-request.repository";
import { CreateQuotationRequestUseCase } from "../../application/use-cases/customer/create-quotation-request.use-case";
import { GetQuotationRequestsUseCase } from "../../application/use-cases/customer/get-quotation-requests.use-case";
import { QuotationRequestController } from "../../presentation/controllers/customer/quotation-request.controller";

const quotationRequestRepository = new PrismaQuotationRequestRepository();
const createQuotationRequestUseCase = new CreateQuotationRequestUseCase(quotationRequestRepository);
const getQuotationRequestsUseCase = new GetQuotationRequestsUseCase(quotationRequestRepository);

export const quotationRequestController = new QuotationRequestController(createQuotationRequestUseCase,getQuotationRequestsUseCase);
