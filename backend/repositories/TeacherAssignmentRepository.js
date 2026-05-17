import TeacherAssignment from '../models/TeacherAssignment.js'

class TeacherAssignmentRepository {

    async saveTeacherAssignment(TeacherAssignmentData) {
        try {
            return await TeacherAssignment.create(TeacherAssignmentData);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllTeacherAssignments(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await TeacherAssignment.findAndCountAll({
            limit: PAGE_LIMIT,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
        } catch (error) {
            console.log('Find Error: ', error);
        }      
    }

    async findTeacherAssignmentById(id) {
        try {
            return await TeacherAssignment.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async updateTeacherAssignment(id, data) {
        try {
            const teacher = await this.findTeacherAssignmentById(id);
        if (!teacher) return null;

        const [rowsAffected] = await TeacherAssignment.update(data, { where: { id }});
        if (rowsAffected === 0) throw new Error('Update error');
        return await this.findTeacherAssignmentById(id);
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteTeacherAssignment(id) {
        try {
            const deleted = await TeacherAssignment.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}
