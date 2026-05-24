import {ReferralHistory, User} from '../models/index.js';

import { Op } from 'sequelize';

class ReferralHistoryRepository {

  async create(historyData) {

    try {
      return await ReferralHistory.create(historyData);
    } catch (error) {
      throw new Error(
        `Error creating referral history: ${error.message}`
      );
    }
  }

  async findByReferralId(referralId, filters = {}) {
    try {
      const where = {
        referralId
      };
      // Filtro por acción (CREATED, ACCEPTED, etc.)
      if (filters.action) {
        where.action = filters.action;
      }
      // Filtro por usuario que realizó el cambio
      if (filters.changedBy) {
        where.changedBy = filters.changedBy;
      }
      // Filtro por rango de fechas
      if (filters.from || filters.to) {

        where.createdAt = {};
        if (filters.from) {
          where.createdAt[Op.gte] = filters.from;
        }
        if (filters.to) {
          where.createdAt[Op.lte] = filters.to;
        }
      }

      return await ReferralHistory.findAll({

        where,
        include: [
          {
            model: User,
            as: 'changedByUser',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ],

        order: [
          ['createdAt', 'ASC']
        ]
      });

    } catch (error) {
      throw new Error(
        `Error fetching referral history: ${error.message}`
      );
    }
  }

  async findById(id) {
    try {
      return await ReferralHistory.findByPk(id, {
        include: [
          {
            model: User,
            as: 'changedByUser',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ]

      });

    } catch (error) {
      throw new Error(
        `Error fetching referral history item: ${error.message}`
      );
    }
  }
}

export default new ReferralHistoryRepository();
