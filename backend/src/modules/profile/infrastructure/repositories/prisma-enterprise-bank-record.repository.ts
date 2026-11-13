import { prisma } from "../../../../infrastructure/database/prisma/prisma-client";
import { bank_account_type } from "../../../../../generated/prisma/client";
import { ActiveBankRecordDto, BankRecordRequestDto, SaveEnterpriseBankRecordRequestDto,} from "../../application/dto/enterprise-bank-details.dto";
import { EnterpriseUserDto } from "../../application/dto/enterprise-profile.dto";
import { IEnterprisBankRecordRepository } from "../../domain/repositories/enterprise-bank-record.repository";
import { EnterpriseBankMapper } from "../mapper/enterprise-bank-record.mapper";

export class PrismaEnterpriseBankRecordRepository implements IEnterprisBankRecordRepository {

    findById = async (userId: string): Promise<EnterpriseUserDto | null> => {
        const user = await prisma.users.findUnique({
            where : {id : userId},
            select : {id : true, enterprise_id : true}
        })

        if (!user || !user.enterprise_id) return null;

        return {
            userId : user.id,
            enterpriseId : user.enterprise_id
        }
    }

    getBankRecord = async (enterpriseId: string): Promise<{ activeBankRecord: ActiveBankRecordDto | null; pendingRequest: BankRecordRequestDto | null; }> => {
        const [activeBankRecord, pendingBankRecord] = await Promise.all([
            prisma.enterprise_bank_accounts.findFirst({
                where: { enterprise_id: enterpriseId, is_primary: true },
            }),
            prisma.enterprise_bank_accounts_requests.findFirst({
                where : {enterprise_id : enterpriseId},
                orderBy : {created_at : "desc"}
            })
        ])

        return {
            activeBankRecord : activeBankRecord ? EnterpriseBankMapper.toActiveBankRecordDto(activeBankRecord) : null,
            pendingRequest : pendingBankRecord && pendingBankRecord.status !== "VERIFIED" ? EnterpriseBankMapper.toRequestDto(pendingBankRecord) : null
        }
    }

    createBankRecordRequest = async (enterpriseId: string, data: SaveEnterpriseBankRecordRequestDto): Promise<BankRecordRequestDto> => {
        const bankRecord = await prisma.enterprise_bank_accounts_requests.create({
            data: {
                enterprise_id: enterpriseId,
                account_holder_name: data.accountHolderName,
                account_number: data.bankAccountNumber,
                ifsc_code: data.ifscCode,
                account_type: data.accountType as bank_account_type,
                upi_id: data.upiId || null,
                status: "PENDING",
            },
        });

        return EnterpriseBankMapper.toRequestDto(bankRecord);
    };
}