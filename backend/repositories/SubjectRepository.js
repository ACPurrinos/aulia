import Subject from "../models/Subject";

class SubjectRepository{

    async saveSubject(data) {
        try {
            return await Subject.create(data);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllSubjects(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await Subject.findAndCountAll({
            limit: PAGE_LIMIT,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
        } catch (error) {
            console.log('Find Error: ', error);
        }      
    }

    async findSubjectById(id) {
        try {
            return await Subject.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async findSubjectByName(name) {
        try {
            return await Subject.findByOne(name);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async updateSubject(id, data) {
        try {
        const [rowsAffected, [updated]] = await Subject.update(data, { where: { id }, returning: true});
        if (rowsAffected === 0) throw new Error('Update error');
        return updated;
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteSubject(id) {
        try {
            const deleted = await Subject.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}

export default new SubjectRepository();