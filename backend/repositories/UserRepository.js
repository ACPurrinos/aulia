import User from '../models/User.js'
import Role from '../models/Role.js'

class UserRepository {

    async saveUser(UserData, options = {}) {
        try {
            return await User.create(UserData, {
                transaction: options.transaction
            });
        } catch (error) {
            console.log('Save Error: ', error);
            throw error;
        }
    } 

    async findAllUsers(page = 1){
        try {
            const PAGE_LIMIT = 10;
            const currentPage = Math.max(1, parseInt(page) || 1);
            const offset = (page - 1) * PAGE_LIMIT;
            
            const { count, rows } = await User.findAndCountAll({
                limit: PAGE_LIMIT,
                offset: offset,
                order: [['createdAt', 'DESC']]
            });
            return {
                data: rows,
                totalItems: count,
                totalPages: Math.ceil(count / PAGE_LIMIT),
                currentPage,
                include: [{
                    model: Role,
                    attributes: ['name']
                }]
            };
        } catch (error) {
            console.log('Find Error: ', error);
            throw error;
        }      
    }

    async findActiveUsers(page = 1){
        try {
            const PAGE_LIMIT = 10;
            const currentPage = Math.max(1, parseInt(page) || 1);
            const offset = (page - 1) * PAGE_LIMIT;
            
            const { count, rows } = await User.findAndCountAll({
                where: {
                    active: true
                },
                limit: PAGE_LIMIT,
                offset: offset,
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Role,
                    attributes: ['name']
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


    async findUserById(id) {
        try {
            return await User.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async findUserByIdWithRole(id) {
        try {
            return await User.findByPk(id, {
        include: [{ model: Role }]
    });
        } catch (error) {
            console.log('Find Error: ', error);
        }    
    }

    async findUserByIdWithPassword(id){
        try {
            return await User.scope('withPassword').findByPk(id);
        } catch (error) {
            console.log('Find with password Error: ', error);
        }
    };

    async findUserByUsernameWithPassword(username){
        try {
            return await User.scope('withPassword').findOne(
                {where: {
                username: username
                }
            });
        } catch (error) {
            console.log('Find with password Error: ', error);
        }
    };

    async findByUsername(username, options={}){
        try {
            return await User.findOne(
                {
                where: {
                    username: username
                },
                transaction: options.transaction
            })
        } catch (error) {
            console.log('Find username Error: ', error);
        }
    }

    async findByEmail(email, options={}){
        try {
            return await User.findOne(
                {
                where: {
                    email: email
                },
                transaction: options.transaction
            })
        } catch (error) {
            console.log('Find email Error: ', error);
        }
    }

    async updateUser(id, data) {
        try {
        const [rowsAffected, [updated]] = await User.update(data, { where: { id }, returning: true});
        if (rowsAffected === 0) throw new Error('Update error');
        return updated;
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

export default new UserRepository();