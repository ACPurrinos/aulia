import User from '../models/User.js'

class UserRepository {

    async saveUser(UserData) {
        try {
            return await User.create(UserData);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllUsers(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await User.findAndCountAll({
            limit: PAGE_LIMIT,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
        } catch (error) {
            console.log('Find Error: ', error);
        }      
    }

    async findUserById(id) {
        try {
            return await User.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async updateUser(id, data) {
        try {
            const user = await this.findById(id);
        if (!user) return null;

        return await User.update(data);
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteUser(id) {
        try {
            const deleted = await User.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}
