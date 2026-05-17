import ReferralRepository from '../repositories/ReferralRepository.js';
import CaseFileRepository from '../repositories/CaseFileRepository.js';
import ReferralHistoryService from './ReferralHistoryService.js';


class ReferralService {

  async createReferral(referralData, teacherId) {

    try {

      const newReferral = await ReferralRepository.create({
        ...referralData,
        referrerId: teacherId,
        status: ReferralStatusEnum.PENDING
      });

      await ReferralHistoryService.registerHistory({
        referralId: newReferral.id,
        action: ReferralActionEnum.CREATED,
        oldStatus: null,
        newStatus: ReferralStatusEnum.PENDING,
        comment: 'Derivación creada por el docente.',
        changedBy: teacherId
      });

      return newReferral;

    } catch (error) {
      throw new Error(`Error creating referral: ${error.message}`);
    }
  }

  async acceptReferral(referralId, cabinetUserId, observations = '') {

    try {

      const referral = await ReferralRepository.getById(referralId);

      if (!referral) {
        throw new Error('Referral not found.');
      }

      if (referral.status !== ReferralStatusEnum.PENDING) {
        throw new Error('Referral has already been processed.');
      }

      let caseFile = await CaseFileRepository.getOpenByStudentId(
        referral.studentId
      );

      if (!caseFile) {

        caseFile = await CaseFileRepository.create({
          studentId: referral.studentId,
          referralId: referral.id,
          subject: `Seguimiento de ${referral.category}`,
          priority: 'Medium',
          status: 'Open'
        });
      }

      const updatedReferral = await ReferralRepository.update(referralId, {
        status: ReferralStatusEnum.IN_PROGRESS,
        reviewedAt: new Date(),
        reviewedBy: cabinetUserId
      });

      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.ACCEPTED,
        oldStatus: ReferralStatusEnum.PENDING,
        newStatus: ReferralStatusEnum.IN_PROGRESS,
        comment: observations,
        changedBy: cabinetUserId
      });

      return {
        referral: updatedReferral,
        caseFile
      };

    } catch (error) {
      throw new Error(`Error accepting referral: ${error.message}`);
    }
  }

  async rejectReferral(referralId, cabinetUserId, reason) {

    try {

      if (!reason) {
        throw new Error('Rejection reason is required.');
      }

      const referral = await ReferralRepository.getById(referralId);

      if (!referral) {
        throw new Error('Referral not found.');
      }

      if (referral.status !== ReferralStatusEnum.PENDING) {
        throw new Error('Referral has already been processed.');
      }

      const updatedReferral = await ReferralRepository.update(referralId, {
        status: ReferralStatusEnum.REJECTED,
        reviewedAt: new Date(),
        reviewedBy: cabinetUserId
      });

      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.REJECTED,
        oldStatus: ReferralStatusEnum.PENDING,
        newStatus: ReferralStatusEnum.REJECTED,
        comment: reason,
        changedBy: cabinetUserId
      });

      return updatedReferral;

    } catch (error) {
      throw new Error(`Error rejecting referral: ${error.message}`);
    }
  }

  async requestMoreInfo(referralId, cabinetUserId, comment) {

    try {

      const referral = await ReferralRepository.getById(referralId);

      if (!referral) {
        throw new Error('Referral not found.');
      }

      const updatedReferral = await ReferralRepository.update(referralId, {
        status: ReferralStatusEnum.MORE_INFO
      });

      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.MORE_INFO_REQUESTED,
        oldStatus: referral.status,
        newStatus: ReferralStatusEnum.MORE_INFO,
        comment,
        changedBy: cabinetUserId
      });

      return updatedReferral;

    } catch (error) {
      throw new Error(`Error requesting more information: ${error.message}`);
    }
  }
}

export default new ReferralService();