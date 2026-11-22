import { PrismaEnterpriseProposalRepository } from "../repositories/prisma-enterprise-proposal.repository";
import { CreateProposalUseCase } from "../../application/use-cases/enterprise/create-proposal.use-case";
import { EnterpriseProposalController } from "../../presentation/controllers/enterprise/enterprise-proposal.controller";

const enterpriseProposalRepository = new PrismaEnterpriseProposalRepository();
const createProposalUseCase = new CreateProposalUseCase(enterpriseProposalRepository);

export const enterpriseProposalController = new EnterpriseProposalController(createProposalUseCase);
