import Student from '../models/Student.js'

class StudentRepository {

    async saveStudent(StudentData) {
        try {
            return await Student.create(StudentData);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllStudents(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await Student.findAndCountAll({
            limit: PAGE_LIMIT,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
        } catch (error) {
            console.log('Find Error: ', error);
        }      
    }

    async findStudentById(id) {
        try {
            return await Student.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async findStudentByIdUser(id) {
        try {
            return await Student.findOne({where:{userId: id}});    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async updateStudent(id, data) {
        try {
            const student = await this.findStudentById(id,{ where: { id }});
        if (!student) return null;

        const [rowsAffected] = await Student.update(data, { where: { id }});
        if (rowsAffected === 0) throw new Error('Update error');
        return await this.findStudentById(id);
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteStudent(id) {
        try {
            const deleted = await Student.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}

export default new StudentRepository();