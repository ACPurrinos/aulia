import { Op } from 'sequelize';
import Student from '../models/Student.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import TeacherAssignment from '../models/TeacherAssignment.js';
import Subject from '../models/Subject.js';

class StudentRepository {

    async saveStudent(StudentData) {
        try {
            return await Student.create(StudentData);
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

    async findStudentById(id) {
        try {
            return await Student.findByPk(id, {
            include: [{
                model: User,
                attributes: ['firstName', 'lastName'] 
            }]
        });    
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }       
    }

    async findStudentByIdUser(id) {
        try {
            return await Student.findOne({where:{userId: id}});    
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