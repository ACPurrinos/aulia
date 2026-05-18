import { Course, Student, TeacherAssignment, Subject, User } from '../models/index.js';

class CourseRepository {

  // 1. Crear un nuevo curso (ej: "1° Año A - Secundaria")
  async create(courseData) {
    return await Course.create(courseData);
  }

  // 2. Traer todos los cursos activos del año escolar actual
  async getAllActive() {
    return await Course.findAll({
      where: { active: true },
      order: [
        ['level', 'ASC'],
        ['grade', 'ASC'],
        ['division', 'ASC']
      ]
    });
  }

  // 3. Buscar un curso por su ID (sin más detalles)
  async getById(id) {
    return await Course.findByPk(id);
  }

  // 4. Traer la lista de alumnos de un curso (La "lista de asistencia" o la división)
  async getCourseWithStudents(id) {
    return await Course.findByPk(id, {
      include: [
        {
          model: Student,
          where: { active: true },
          required: false, // Si el curso está vacío, igual nos trae los datos del curso
          attributes: ['id', 'birthDate'],
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
      order: [[Student, User, 'lastName', 'ASC']]
    });
  }

  // 5. Traer las materias y profesores asignados a este curso (Para el panel escolar)
  async getCoursePlantaDocente(id) {
    return await Course.findByPk(id, {
      include: [
        {
          model: TeacherAssignment,
          include: [
            { model: Subject, attributes: ['name'] },
            { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] } // El docente
          ]
        }
      ]
    });
  }

  // 6. Dar de baja un curso (borrado lógico cambiando el flag active)
  async deactivate(id) {
    const course = await Course.findByPk(id);
    if (!course) return null;
    return await course.update({ active: false });
  }
}

export default new CourseRepository();