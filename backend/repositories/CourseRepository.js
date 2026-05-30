import { Course, Student, TeacherAssignment, Subject, User } from '../models/index.js';

class CourseRepository {

  // 1. Crear un nuevo curso (ej: "1° Año A - Secundaria")
  async create(courseData) {
    try {
      return await Course.create(courseData);
    } catch (error) {
      throw error
    }   
  }

  // 2. Traer todos los cursos activos del año escolar actual
  async getAllActive() {
    try {
      return await Course.findAll({
      where: { active: true },
      order: [
        ['level', 'ASC'],
        ['grade', 'ASC'],
        ['division', 'ASC']
      ]
    });
    } catch (error) {
      throw error
    }  
  }

  // 3. Buscar un curso por su ID (sin más detalles)
  async getById(id) {
    try {
      return await Course.findByPk(id);
    } catch (error) {
      throw error
    }   
  }

  // 4. Traer la lista de alumnos de un curso (La "lista de asistencia" o la división)
  async getCourseWithStudents(id) {
    try {
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
    } catch (error) {
      throw error
    } 
  }

  // 5. Traer las materias y profesores asignados a este curso (Para el panel escolar)
  async getCoursePlantaDocente(id) {
    try {
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
    } catch (error) {
      throw error
    }   
  }

  // 6. Dar de baja un curso (borrado lógico cambiando el flag active)
  async desactivate(id) {
    try {
      const course = await Course.findByPk(id);
    if (!course) return null;
    return await course.update({ active: false });
    } catch (error) {
      throw error
    }   
  }
}

export default new CourseRepository();