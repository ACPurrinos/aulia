import Student from '../models/Student.js';
import User from '../models/User.js';

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
<<<<<<< HEAD
        const [rowsAffected, [updated]] = await Student.update(data, { where: { id }, returning: true});
        if (rowsAffected === 0) throw new Error('Update error');
        return updated;
=======
            const student = await this.findStudentById(id);
        if (!student) return null;

        return await Student.update(data);
>>>>>>> services-andrea
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