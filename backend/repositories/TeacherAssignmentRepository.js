import Subject from '../models/Subject.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import TeacherAssignment from '../models/TeacherAssignment.js'

class TeacherAssignmentRepository {

    async saveTeacherAssignment(TeacherAssignmentData) {
        try {
            return await TeacherAssignment.create(TeacherAssignmentData);
        } catch (error) {
            console.log('Save Error: ', error);
            throw error;
        }
    } 

    async findAllTeacherAssignments(page = 1){
        try {
            const PAGE_LIMIT = 10;

            const offset = (page - 1) * PAGE_LIMIT;
            
            return await TeacherAssignment.findAndCountAll({
                limit: PAGE_LIMIT,
                offset: offset,
                order: [['createdAt', 'DESC']],
                include: [
                { model: Course, attributes: ['grade', 'division'] },
                { model: Subject, attributes: ['name'] },
                { model: User, attributes: ['lastName', 'firstName'] }
            ]
            });
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }      
    }

    async findTeacherAssignmentById(id) {
    try {
        return await TeacherAssignment.findByPk(id, { 
            include: [
                { model: Course, attributes: ['grade', 'division'] },
                { model: Subject, attributes: ['name'] },
                { model: User, attributes: ['lastName', 'firstName'] }
            ]
        });    
    } catch (error) {
        console.error('Find Error: ', error);
        throw error;
    }       
}
    async findTeacherAssignmentByUser(useIrd) {
        try {
            return await TeacherAssignment.findAll({where: {teacherId: userId}});    
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }       
    }


    async updateTeacherAssignment(id, data) {
        try {
            const [rowsAffected, [updated]] = await TeacherAssignment.update(data, { where: { id }, returning: true});
            if (rowsAffected === 0) throw new Error('Update error');
            return updated;
        } catch (error) {
            console.log('Update Error: ', error);
            throw error;
        }     
    }

    async deleteTeacherAssignment(id) {
        try {
            const deleted = await TeacherAssignment.destroy({ where: { id } });
            return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
            throw error;
        }
    }
}

export default new TeacherAssignmentRepository();
