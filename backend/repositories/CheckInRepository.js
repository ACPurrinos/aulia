import { CheckIn, Student } from '../models/index.js';
import { Op } from 'sequelize';

class CheckInRepository {
  async create(checkInData) {
    return await CheckIn.create(checkInData);
  }

  // Trae los check-ins de hoy para monitorear el humor del colegio
  async getDailySummary() {
    const today = new Date().setHours(0, 0, 0, 0);
    return await CheckIn.findAll({
      where: {
        createdAt: {
          [Op.gte]: today
        }
      },
      include: [
        {
          model: Student,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: [
                'id',
                'firstName',
                'lastName'
              ]
            }
          ]
        }
      ]
    });
  }

  // Alertas específicas: alumnos que marcaron "helpRequested" en verdadero
  async getUrgentHelpRequests() {
    return await CheckIn.findAll({
      where: { helpRequested: true },
      include: [
        {
          model: Student,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: [
                'id',
                'firstName',
                'lastName'
              ]
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }
}

export default new CheckInRepository();