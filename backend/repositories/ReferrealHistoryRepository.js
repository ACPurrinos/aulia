import ReferralHistory from '../models/ReferralHistory.js'

class ReferralRepository {

    async saveReferralHistory(referralData) {
        try {
            return await ReferralHistory.create(referralData);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllReferralHistories(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await ReferralHistory.findAndCountAll({
            limit: PAGE_LIMIT,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
        } catch (error) {
            console.log('Find Error: ', error);
        }      
    }

    async findReferralHistoryById(id) {
        try {
            return await ReferralHistory.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async updateReferralHistory(id, data) {
        try {
            const referralHistory = await this.findById(id);
        if (!referralHistory) return null;

        return await ReferralHistory.update(data);
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteReferralHistory(id) {
        try {
            const deleted = await ReferralHistory.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}
