import { Op } from 'sequelize';
import { Student, CaseFile, User, Course, TeacherAssignment, Subject } from '../models/index.js';
import { CaseFileStatus } from '../enums/index.js';


class StudentRepository {

    async saveStudent(StudentData, options={}) {
        try {
            return await Student.create(StudentData, {
            transaction: options.transaction
            });
        } catch (error) {
            console.log('Save Error: ', error);
            throw error;
        }
    } 

    async findAllStudents(page = 1){
        try {
            const PAGE_LIMIT = 10;
            const currentPage = Math.max(1, parseInt(page) || 1);
            const offset = (page - 1) * PAGE_LIMIT;
            
            const { count, rows } = await Student.findAndCountAll({
                limit: PAGE_LIMIT,
                offset: offset,
                order: [['createdAt', 'DESC']],
                include: [{
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Course,
                    attributes: ['grade', 'level', 'division']
                }]
            });
            return {
                data: rows,
                totalItems: count,
                totalPages: Math.ceil(count / PAGE_LIMIT),
                currentPage,
            };
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }      
    }

    async findStudentsWithoutOpenCaseFile(page = 1) {
        try {
            const PAGE_LIMIT = 10;
            const currentPage = Math.max(1, parseInt(page) || 1);
            const offset = (currentPage - 1) * PAGE_LIMIT;

            const { count, rows } = await Student.findAndCountAll({
                limit: PAGE_LIMIT,
                offset: offset,
                order: [['createdAt', 'DESC']],
                // Evita que Sequelize rompa el conteo y la paginación al filtrar por el LEFT JOIN
                subQuery: false, 
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Course,
                        attributes: ['grade', 'level', 'division']
                    },
                    {
                        model: CaseFile,
                        where: {
                            status: CaseFileStatus.OPEN
                        },
                        required: false, // LEFT JOIN: Trae al estudiante aunque no tenga CaseFile abierto
                        attributes: []   // No queremos datos vacíos de CaseFile en el resultado final
                    }
                ],
                where: {
                    // Si el ID del CaseFile abierto es NULL, el estudiante entra en la lista
                    '$CaseFile.id$': {
                        [Op.is]: null
                    }
                }
            });
            return {
                data: rows,
                totalItems: count,
                totalPages: Math.ceil(count / PAGE_LIMIT),
                currentPage,
            };
        } catch (error) {
            console.error('Error fetching students without open case file:', error);
            throw new Error(`Error fetching students without open case file: ${error.message}`);
        }      
    }


    async findAllStudentsByTeacher(teacherId, page = 1) {
        try {
            const PAGE_LIMIT = 10;
            const currentPage = Math.max(1, parseInt(page) || 1);
            const offset = (currentPage - 1) * PAGE_LIMIT;

            const courseIds = await TeacherAssignment.findAll({
                where: { teacherId },
                attributes: ['courseId'],
                raw: true
            }).then(rows => [...new Set(rows.map(r => r.courseId))]);

            if (!courseIds.length) {
                return { data: [], totalItems: 0, totalPages: 0, currentPage };
            }

            const { count, rows } = await Student.findAndCountAll({
                where: {
                    courseId: { [Op.in]: courseIds },
                    active: true
                },
                limit: PAGE_LIMIT,
                offset,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Course,
                        attributes: ['grade', 'level', 'division']
                    }
                ],
                distinct: true
            });

            return {
                data: rows,
                totalItems: count,
                totalPages: Math.ceil(count / PAGE_LIMIT),
                currentPage,
            };

        } catch (error) {
            console.log('FindStudentsByTeacher Error:', error);
            throw error;
        }
    }    

    async findActiveStudents(page = 1){
        try {
            const PAGE_LIMIT = 10;
            const currentPage = Math.max(1, parseInt(page) || 1);
            const offset = (page - 1) * PAGE_LIMIT;
            
            const { count, rows } = await Student.findAndCountAll({
                where: {
                    active: true
                },
                limit: PAGE_LIMIT,
                offset: offset,
                order: [['createdAt', 'DESC']],
                include: [{
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Course,
                    attributes: ['grade', 'level', 'division']
                }],
            });
            return {
                data: rows,
                totalItems: count,
                totalPages: Math.ceil(count / PAGE_LIMIT),
                currentPage,
            };
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }         
    }

    async findStudentById(id) {
        try {
            return await Student.findByPk(id, {
            include: [{
                model: User,
                attributes: ['firstName', 'lastName'] 
            },
            {
                model: Course,
                attributes: ['grade', 'level', 'division']
            }]
        });    
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }       
    }

    async findStudentByUserId(id) {
        try {
            return await Student.findOne({where:{userId: id}, include: [
                {
                model: User,
                attributes: ['active'] 
                },
                {
                    model: Course,
                    attributes: ['grade', 'level', 'division']
                }]
            });    
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }       
    }

    async updateStudent(id, data) {
        try {
        const [rowsAffected, [updated]] = await Student.update(data, { where: { id }, returning: true});
        if (rowsAffected === 0) throw new Error('Update error');
        return updated;
        } catch (error) {
            console.log('Update Error: ', error);
            throw error;
        }     
    }

    async deleteStudent(id) {
        try {
            const deleted = await Student.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
            throw error;
        }
    }
}

export default new StudentRepository();