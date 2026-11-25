import { PrismaEnterpriseProposalRepository } from "../repositories/enterprise/prisma-enterprise-proposal.repository";
import { CreateProposalUseCase } from "../../application/use-cases/enterprise/create-proposal.use-case";
import { WithdrawnProposalUseCase } from "../../application/use-cases/enterprise/widthdrawn-proposal.use-case";
import { EnterpriseProposalController } from "../../presentation/controllers/enterprise/enterprise-proposal.controller";
import { notificationService } from "../../../notification/infrastructure/container/notification.container";
import { PrismaCustomerProposalRepository } from "../repositories/customer/prisma-customer-proposal.repository";
import { GetReceivedProposalsUseCase } from "../../application/use-cases/customer/get-received-proposals.use-case";
import { GetReceivedProposalDetailsUseCase } from "../../application/use-cases/customer/get-received-proposal-details.use-case";
import { AcceptReceivedProposalUseCase } from "../../application/use-cases/customer/accept-received-proposal.use-case";
import { CustomerProposalController } from "../../presentation/controllers/customer/customer-proposal.controller";

const enterpriseProposalRepository = new PrismaEnterpriseProposalRepository();
const createProposalUseCase = new CreateProposalUseCase(enterpriseProposalRepository, notificationService);
const withdrawnProposalUseCase = new WithdrawnProposalUseCase(enterpriseProposalRepository);

export const enterpriseProposalController = new EnterpriseProposalController(createProposalUseCase, withdrawnProposalUseCase);

const customerProposalRepository = new PrismaCustomerProposalRepository();
const getReceivedProposalsUseCase = new GetReceivedProposalsUseCase(customerProposalRepository);
const getReceivedProposalDetailsUseCase = new GetReceivedProposalDetailsUseCase(customerProposalRepository);
const acceptReceivedProposalUseCase = new AcceptReceivedProposalUseCase(customerProposalRepository, notificationService);

export const customerProposalController = new CustomerProposalController(
    getReceivedProposalsUseCase,
    getReceivedProposalDetailsUseCase,
    acceptReceivedProposalUseCase
);
