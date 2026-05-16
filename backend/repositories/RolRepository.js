import Rol from '../models/Rol.js'

class RolRepository {

    async saveRol(RolData) {
        try {
            return await Rol.create(RolData);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllRols(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await Rol.findAndCountAll({
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
            return await Rol.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async updateRol(id, data) {
        try {
            const rol = await this.findById(id);
        if (!rol) return null;

        return await Rol.update(data);
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteRol(id) {
        try {
            const deleted = await Rol.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}




