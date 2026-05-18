import {
  Alert,
  Student,
  User,
  Referral
} from '../models/index.js';

import { AlertStatusEnum } from '../enums/index.js';

class AlertRepository {

  async create(alertData) {
    try {
      return await Alert.create(alertData);
    } catch (error) {
      throw new Error(`Error creating alert: ${error.message}`);

    }
  }

  async getAll() {
    try {
      return await Alert.findAll({
        include: [
          {
            model: Student,
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          },
          {
            model: User,
            as: 'creator',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ],
            required: false
          },
          {
            model: Referral,
            attributes: [
              'id',
              'status'
            ],
            required: false
          }
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      });

    } catch (error) {
      throw new Error(`Error fetching alerts: ${error.message}`);
    }
  }

  async getById(id) {
    try {

      return await Alert.findByPk(id, {
        include: [
          {
            model: Student,
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          },
          {
            model: User,
            as: 'creator',
            attributes: [
              'id',
              'firstName',
              'lastName'
            ],
            required: false
          },
          {
            model: Referral,
            required: false
          }
        ]
      });
    } catch (error) {
      throw new Error(`Error fetching alert: ${error.message}`);

    }
  }

  async getPendingAlerts() {
    try {

      return await Alert.findAll({
        where: {
          status: AlertStatusEnum.PENDING
        },
        include: [
          {
            model: Student,
            attributes: [
              'id',
              'firstName',
              'lastName'
            ]
          }
        ],
        order: [
          ['priority', 'DESC'],
          ['createdAt', 'ASC']
        ]
      });
    } catch (error) {
      throw new Error(`Error fetching pending alerts: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {

      const alert = await Alert.findByPk(id);
      if (!alert) {
        return null;
      }
      return await alert.update(updateData);
    } catch (error) {
      throw new Error(`Error updating alert: ${error.message}`);
    }
  }

  async delete(id) {
    try {

      const alert = await Alert.findByPk(id);
      if (!alert) {
        return false;
      }
      await alert.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting alert: ${error.message}`);
    }
  }
}

export default new AlertRepository();