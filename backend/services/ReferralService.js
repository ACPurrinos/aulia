import ReferralRepository from '../repositories/ReferralRepository.js';
import CaseFileRepository from '../repositories/CaseFileRepository.js';
import ReferralHistoryService from './ReferralHistoryService.js';

import {
  ReferralStatusEnum,
  ReferralActionEnum,
  CaseFileStatus
} from '../enums/index.js';

class ReferralService {

  // DOCENTE crea derivación
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
        notes: 'Derivación creada.',
        changedBy: userId
      });

      return referral;

    } catch (error) {
      throw new Error(`Error creating referral: ${error.message}`);
    }
  }

  // GABINETE acepta derivación
  async acceptReferral(referralId, userId, notes = '') {

    try {

      const referral = await ReferralRepository.getById(referralId);

      if (!referral) {
        throw new Error('Referral not found.');
      }

      if (referral.status !== ReferralStatusEnum.PENDING) {
        throw new Error('Referral has already been processed.');
      }

      // Buscar legajo único del alumno
      let caseFile = await CaseFileRepository.getByStudentId(
        referral.studentId
      );

      // Si no existe → crear
      if (!caseFile) {

        caseFile = await CaseFileRepository.create({
          studentId: referral.studentId
        });

      }

      // Si existe pero estaba cerrado → reabrir
      else if (caseFile.status === CaseFileStatus.CLOSED) {

        await CaseFileRepository.update(caseFile.id, {
          status: CaseFileStatus.OPEN
        });

      }

      // Actualizar derivación
      const updatedReferral = await ReferralRepository.update(
        referralId,
        {
          status: ReferralStatusEnum.IN_PROGRESS,
          reviewedAt: new Date(),
          reviewedBy: userId,
          caseFileId: caseFile.id
        }
      );

      // Registrar historial
      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.ACCEPTED,
        notes,
        changedBy: userId
      });

      return updatedReferral;

    } catch (error) {
      throw new Error(`Error accepting referral: ${error.message}`);
    }
  }

  // GABINETE rechaza derivación
  async rejectReferral(referralId, userId, notes) {

    try {

      const referral = await ReferralRepository.getById(referralId);

      if (!referral) {
        throw new Error('Referral not found.');
      }

      if (referral.status !== ReferralStatusEnum.PENDING) {
        throw new Error('Referral has already been processed.');
      }

      const updatedReferral = await ReferralRepository.update(
        referralId,
        {
          status: ReferralStatusEnum.REJECTED,
          reviewedAt: new Date(),
          reviewedBy: userId
        }
      );

      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.REJECTED,
        notes,
        changedBy: userId
      });

      return updatedReferral;

    } catch (error) {
      throw new Error(`Error rejecting referral: ${error.message}`);
    }
  }

  // GABINETE solicita más información
  async requestMoreInfo(referralId, userId, notes) {

    try {

      const referral = await ReferralRepository.getById(referralId);

      if (!referral) {
        throw new Error('Referral not found.');
      }

      const updatedReferral = await ReferralRepository.update(
        referralId,
        {
          status: ReferralStatusEnum.MORE_INFO
        }
      );

      await ReferralHistoryService.registerHistory({
        referralId,
        action: ReferralActionEnum.MORE_INFO_REQUESTED,
        notes,
        changedBy: userId
      });

      return updatedReferral;

    } catch (error) {
      throw new Error(`Error requesting more information: ${error.message}`);
    }
  }

}

export default new ReferralService();