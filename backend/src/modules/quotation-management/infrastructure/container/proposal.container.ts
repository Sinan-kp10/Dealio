import { PrismaEnterpriseProposalRepository } from "../repositories/prisma-enterprise-proposal.repository";
import { CreateProposalUseCase } from "../../application/use-cases/enterprise/create-proposal.use-case";
import { EnterpriseProposalController } from "../../presentation/controllers/enterprise/enterprise-proposal.controller";
import { notificationService } from "../../../notification/infrastructure/container/notification.container";

const enterpriseProposalRepository = new PrismaEnterpriseProposalRepository();
const createProposalUseCase = new CreateProposalUseCase(enterpriseProposalRepository, notificationService);

export const enterpriseProposalController = new EnterpriseProposalController(createProposalUseCase);
