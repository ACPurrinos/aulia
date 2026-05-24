import ReferralRepository from '../repositories/ReferralRepository.js';
import CaseFileService from './CaseFileService.js';
import ReferralHistoryService from './ReferralHistoryService.js';

import {
  ReferralStatusEnum,
  ReferralActionEnum
} from '../enums/index.js';

class ReferralService {

  // CREAR derivación (docente)
  async createReferral(referralData, userId) {

    try {

      const referral = await ReferralRepository.create({
        ...referralData,
        referrerId: userId,
        status: ReferralStatusEnum.PENDING
      });

      await ReferralHistoryService.registerHistory({
        referralId: referral.id,
        action: ReferralActionEnum.CREATED,
        notes: 'Derivación creada',
        changedBy: userId
      });

      return referral;

    } catch (error) {
      throw new Error(`Error creating referral: ${error.message}`);
    }
  }

  // ACEPTAR derivación (gabinete)
  async acceptReferral(referralId, userId, notes = '') {

    try {

      const referral = await ReferralRepository.findById(referralId);

      if (!referral) throw new Error('Referral not found');

      if (referral.status !== ReferralStatusEnum.PENDING) {
        throw new Error('Referral already processed');
      }

      const caseFile = await CaseFileService.getOrCreateByStudent(
        referral.studentId
      );

      const updated = await ReferralRepository.update(referralId, {
        status: ReferralStatusEnum.IN_PROGRESS,
        reviewedAt: new Date(),
        reviewedBy: userId,
        caseFileId: caseFile.id
      });

      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.ACCEPTED,
        notes,
        changedBy: userId
      });

      return updated;

    } catch (error) {
      throw new Error(`Error accepting referral: ${error.message}`);
    }
  }

  // RECHAZAR derivación
  async rejectReferral(referralId, userId, notes = '') {

    try {

      const referral = await ReferralRepository.findById(referralId);

      if (!referral) throw new Error('Referral not found');

      if (referral.status !== ReferralStatusEnum.PENDING) {
        throw new Error('Referral already processed');
      }

      const updated = await ReferralRepository.update(referralId, {
        status: ReferralStatusEnum.REJECTED,
        reviewedAt: new Date(),
        reviewedBy: userId
      });

      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.REJECTED,
        notes,
        changedBy: userId
      });

      return updated;

    } catch (error) {
      throw new Error(`Error rejecting referral: ${error.message}`);
    }
  }

  // PEDIR más info
  async requestMoreInfo(referralId, userId, notes = '') {

    try {

      const referral = await ReferralRepository.findById(referralId);

      if (!referral) throw new Error('Referral not found');

      if (referral.status === ReferralStatusEnum.CLOSED) {
        throw new Error('Referral is closed');
      }

      const updated = await ReferralRepository.update(referralId, {
        status: ReferralStatusEnum.MORE_INFO,
        reviewedAt: new Date(),
        reviewedBy: userId
      });

      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.MORE_INFO_REQUESTED,
        notes,
        changedBy: userId
      });

      return updated;

    } catch (error) {
      throw new Error(`Error requesting more info: ${error.message}`);
    }
  }

  async getAllReferrals() {
  return await ReferralRepository.findAll();
}

async getReferralById(id) {
  const referral = await ReferralRepository.findById(id);

  if (!referral) {
    throw new Error('Referral not found');
  }

  return referral;
}


}

export default new ReferralService();