// tests/referralService.unit.test.js
import { jest } from '@jest/globals';

// Mocks
const referralRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
};

const caseFileService = {
    getOrCreateByStudent: jest.fn()
};

const referralHistoryService = {
    registerHistory: jest.fn()
};

const mockTransaction = {
    commit: jest.fn().mockResolvedValue(true),
    rollback: jest.fn().mockResolvedValue(true)
};

const sequelize = {
    transaction: jest.fn().mockResolvedValue(mockTransaction)
};

await jest.unstable_mockModule('../repositories/ReferralRepository.js', () => ({
    default: referralRepository
}));

await jest.unstable_mockModule('../services/CaseFileService.js', () => ({
    default: caseFileService
}));

await jest.unstable_mockModule('../services/ReferralHistoryService.js', () => ({
    default: referralHistoryService
}));

await jest.unstable_mockModule('../data/db.js', () => ({
    default: sequelize
}));

const { default: referralService } = await import('../services/ReferralService.js');
const { ReferralStatusEnum, ReferralActionEnum } = await import('../enums/index.js');

// Fixtures
const REFERRAL_DATA = {
    studentId: 10,
    category: 'Dificultades de Aprendizaje',
    description: 'Necesita apoyo'
};

const PENDING_REFERRAL = {
    id: 1,
    ...REFERRAL_DATA,
    referrerId: 5,
    status: ReferralStatusEnum.PENDING  
};

const IN_PROGRESS_REFERRAL = {
    ...PENDING_REFERRAL,
    status: ReferralStatusEnum.IN_PROGRESS       
};

const CLOSED_REFERRAL = {
    ...PENDING_REFERRAL,
    status: ReferralStatusEnum.CLOSED          
};


describe('ReferralService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        mockTransaction.commit.mockResolvedValue(true);
        mockTransaction.rollback.mockResolvedValue(true);
        referralHistoryService.registerHistory.mockResolvedValue(true);
    });

    describe('createReferral', () => {

        test('creates referral and registers history', async () => {
            referralRepository.create.mockResolvedValue(PENDING_REFERRAL);

            const result = await referralService.createReferral(REFERRAL_DATA, 5);

            expect(referralRepository.create).toHaveBeenCalledWith({
                ...REFERRAL_DATA,
                referrerId: 5,
                status: ReferralStatusEnum.PENDING
            });
            expect(referralHistoryService.registerHistory).toHaveBeenCalledWith({
                referralId: PENDING_REFERRAL.id,
                action: ReferralActionEnum.CREATED,
                notes: 'Derivación creada',
                changedBy: 5
            });
            expect(result).toEqual(PENDING_REFERRAL);
        });

        test('throws if repository fails', async () => {
            referralRepository.create.mockRejectedValue(new Error('DB error'));

            await expect(
                referralService.createReferral(REFERRAL_DATA, 5)
            ).rejects.toThrow('Error creating referral: DB error');
        });
    });

    describe('acceptReferral', () => {

        beforeEach(() => {
            referralRepository.findById.mockResolvedValue(PENDING_REFERRAL);
            caseFileService.getOrCreateByStudent.mockResolvedValue({ id: 99 });
            referralRepository.update.mockResolvedValue(IN_PROGRESS_REFERRAL);
        });

        test('accepts referral, links case file and commits transaction', async () => {
            const result = await referralService.acceptReferral(1, 7, 'todo bien');

            expect(referralRepository.findById).toHaveBeenCalledWith(1, { transaction: mockTransaction });
            expect(caseFileService.getOrCreateByStudent).toHaveBeenCalledWith(
                PENDING_REFERRAL.studentId,
                { transaction: mockTransaction }
            );
            expect(referralRepository.update).toHaveBeenCalledWith(
                1,
                expect.objectContaining({
                    status: ReferralStatusEnum.IN_PROGRESS,
                    reviewedBy: 7,
                    caseFileId: 99
                }),
                { transaction: mockTransaction }
            );
            expect(referralHistoryService.registerHistory).toHaveBeenCalledWith(
                expect.objectContaining({
                    action: ReferralActionEnum.ACCEPTED,
                    notes: 'todo bien',
                    changedBy: 7
                })
            );
            expect(mockTransaction.commit).toHaveBeenCalled();
            expect(result).toEqual(IN_PROGRESS_REFERRAL);
        });

        test('throws and rollbacks if referral not found', async () => {
            referralRepository.findById.mockResolvedValue(null);

            await expect(
                referralService.acceptReferral(1, 7)
            ).rejects.toThrow('Error accepting referral: Referral not found');

            expect(mockTransaction.rollback).toHaveBeenCalled();
            expect(mockTransaction.commit).not.toHaveBeenCalled();
        });

        test('throws and rollbacks if referral is not PENDING', async () => {
            referralRepository.findById.mockResolvedValue(IN_PROGRESS_REFERRAL);

            await expect(
                referralService.acceptReferral(1, 7)
            ).rejects.toThrow('Error accepting referral: Referral already processed');

            expect(mockTransaction.rollback).toHaveBeenCalled();
        });

        test('throws and rollbacks if case file creation fails', async () => {
            caseFileService.getOrCreateByStudent.mockRejectedValue(new Error('CaseFile error'));

            await expect(
                referralService.acceptReferral(1, 7)
            ).rejects.toThrow('Error accepting referral: CaseFile error');

            expect(mockTransaction.rollback).toHaveBeenCalled();
            expect(mockTransaction.commit).not.toHaveBeenCalled();
        });
    });

    describe('rejectReferral', () => {

        beforeEach(() => {
            referralRepository.findById.mockResolvedValue(PENDING_REFERRAL);
            referralRepository.update.mockResolvedValue({
                ...PENDING_REFERRAL,
                status: ReferralStatusEnum.REJECTED
            });
        });

        test('rejects referral and registers history', async () => {
            const result = await referralService.rejectReferral(1, 7, 'no aplica');

            expect(referralRepository.update).toHaveBeenCalledWith(
                1,
                expect.objectContaining({
                    status: ReferralStatusEnum.REJECTED,
                    reviewedBy: 7
                })
            );
            expect(referralHistoryService.registerHistory).toHaveBeenCalledWith(
                expect.objectContaining({
                    action: ReferralActionEnum.REJECTED,
                    notes: 'no aplica',
                    changedBy: 7
                })
            );
            expect(result.status).toBe(ReferralStatusEnum.REJECTED);
        });

        test('throws if referral not found', async () => {
            referralRepository.findById.mockResolvedValue(null);

            await expect(
                referralService.rejectReferral(1, 7)
            ).rejects.toThrow('Error rejecting referral: Referral not found');
        });

        test('throws if referral is not PENDING', async () => {
            referralRepository.findById.mockResolvedValue(IN_PROGRESS_REFERRAL);

            await expect(
                referralService.rejectReferral(1, 7)
            ).rejects.toThrow('Error rejecting referral: Referral already processed');
        });
    });

    describe('requestMoreInfo', () => {

        beforeEach(() => {
            referralRepository.findById.mockResolvedValue(PENDING_REFERRAL);
            referralRepository.update.mockResolvedValue({
                ...PENDING_REFERRAL,
                status: ReferralStatusEnum.MORE_INFO
            });
        });

        test('requests more info and registers history', async () => {
            const result = await referralService.requestMoreInfo(1, 7, 'falta documentación');

            expect(referralRepository.update).toHaveBeenCalledWith(
                1,
                expect.objectContaining({
                    status: ReferralStatusEnum.MORE_INFO,
                    reviewedBy: 7
                })
            );
            expect(referralHistoryService.registerHistory).toHaveBeenCalledWith(
                expect.objectContaining({
                    action: ReferralActionEnum.MORE_INFO_REQUESTED,
                    notes: 'falta documentación'
                })
            );
            expect(result.status).toBe(ReferralStatusEnum.MORE_INFO);
        });

        test('throws if referral not found', async () => {
            referralRepository.findById.mockResolvedValue(null);

            await expect(
                referralService.requestMoreInfo(1, 7)
            ).rejects.toThrow('Error requesting more info: Referral not found');
        });

        test('throws if referral is CLOSED', async () => {
            referralRepository.findById.mockResolvedValue(CLOSED_REFERRAL);

            await expect(
                referralService.requestMoreInfo(1, 7)
            ).rejects.toThrow('Error requesting more info: Referral is closed');
        });

        test('allows requesting more info on IN_PROGRESS referral', async () => {
            referralRepository.findById.mockResolvedValue(IN_PROGRESS_REFERRAL);
            referralRepository.update.mockResolvedValue({
                ...IN_PROGRESS_REFERRAL,
                status: ReferralStatusEnum.MORE_INFO
            });

            const result = await referralService.requestMoreInfo(1, 7, 'más docs');

            expect(result.status).toBe(ReferralStatusEnum.MORE_INFO);
        });
    });

    describe('getAllReferrals', () => {

        test('returns all referrals', async () => {
            const referrals = [PENDING_REFERRAL, IN_PROGRESS_REFERRAL];
            referralRepository.findAll.mockResolvedValue(referrals);

            expect(await referralService.getAllReferrals()).toEqual(referrals);
        });
    });
    
    describe('getReferralById', () => {

        test('returns referral when found', async () => {
            referralRepository.findById.mockResolvedValue(PENDING_REFERRAL);

            expect(await referralService.getReferralById(1)).toEqual(PENDING_REFERRAL);
        });

        test('throws when referral not found', async () => {
            referralRepository.findById.mockResolvedValue(null);

            await expect(
                referralService.getReferralById(1)
            ).rejects.toThrow('Referral not found');
        });
    });
});