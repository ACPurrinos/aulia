import ReferralMessage from '../models/ReferralMessage.js'

class ReferralMessageRepository {

    async saveReferralMessage(referralData) {
        try {
            return await ReferralMessage.create(referralData);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllReferralMessages(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await ReferralMessage.findAndCountAll({
            limit: PAGE_LIMIT,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
        } catch (error) {
            console.log('Find Error: ', error);
        }      
    }

    async findReferralMessageById(id) {
        try {
            return await ReferralMessage.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async updateReferral(id, data) {
        try {
            const referralMessage = await this.findById(id);
        if (!referralMessage) return null;

        return await ReferralMessage.update(data);
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteReferral(id) {
        try {
            const deleted = await ReferralMessage.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}
