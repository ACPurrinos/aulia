import { CheckIn, Student, User } from '../models/index.js';
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
<<<<<<< HEAD
      include: [{ model: Student, attributes: ['id'], 
                  include: [{ model: User, attributes: ['lastName', 'firstName']}] }]
=======
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
>>>>>>> services-andrea
    });
  }

  // Alertas específicas: alumnos que marcaron "helpRequested" en verdadero
  async getUrgentHelpRequests() {
    return await CheckIn.findAll({
      where: { helpRequested: true },
<<<<<<< HEAD
      include: [{ model: Student, attributes: ['id'], 
                  include: [{ model: User, attributes: ['lastName', 'firstName']}] }],
=======
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
>>>>>>> services-andrea
      order: [['createdAt', 'DESC']]
    });
  }
}

export default new CheckInRepository();