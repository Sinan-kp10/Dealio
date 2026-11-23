import { PrismaEnterpriseProposalRepository } from "../repositories/prisma-enterprise-proposal.repository";
import { CreateProposalUseCase } from "../../application/use-cases/enterprise/create-proposal.use-case";
import { EnterpriseProposalController } from "../../presentation/controllers/enterprise/enterprise-proposal.controller";
import { notificationService } from "../../../notification/infrastructure/container/notification.container";
import { PrismaCustomerProposalRepository } from "../repositories/prisma-customer-proposal.repository";
import { GetReceivedProposalsUseCase } from "../../application/use-cases/customer/get-received-proposals.use-case";
import { CustomerProposalController } from "../../presentation/controllers/customer/customer-proposal.controller";

const enterpriseProposalRepository = new PrismaEnterpriseProposalRepository();
const createProposalUseCase = new CreateProposalUseCase(enterpriseProposalRepository, notificationService);

export const enterpriseProposalController = new EnterpriseProposalController(createProposalUseCase);

const customerProposalRepository = new PrismaCustomerProposalRepository();
const getReceivedProposalsUseCase = new GetReceivedProposalsUseCase(customerProposalRepository);

export const customerProposalController = new CustomerProposalController(getReceivedProposalsUseCase);
