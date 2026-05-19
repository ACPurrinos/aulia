import Role from '../models/Role.js'

class RolRepository {

    async saveRol(RolData) {
        try {
            return await Role.create(RolData);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllRoles(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await Role.findAndCountAll({
            limit: PAGE_LIMIT,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
        } catch (error) {
            console.log('Find Error: ', error);
        }      
    }

    async findRolById(id) {
        try {
            return await Role.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async findByName(name){
        try {
            return await Role.findOne(
                {where: {
                name: name
                }
            })
        } catch (error) {
            console.log('Find name Error: ', error);
        }
    }

    async updateRol(id, data) {
        try {
        const [rowsAffected, [updated]] = await Role.update(data, { where: { id }, returning: true});
        if (rowsAffected === 0) throw new Error('Update error');
        return updated;
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteRol(id) {
        try {
            const deleted = await Role.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}

export default new RolRepository();


