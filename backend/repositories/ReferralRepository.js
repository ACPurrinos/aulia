import Referral from '../models/Referral.js'

class ReferralRepository {

    async saveReferral(referralData) {
        try {
            return await Referral.create(referralData);
        } catch (error) {
            console.log('Save Error: ', error);
        }
    } 

    async findAllReferrals(){
        try {
            const PAGE_LIMIT = 10;
        const DEFAULT_PAGE = 1;

        const offset = (DEFAULT_PAGE - 1) * PAGE_LIMIT;
        
        return await Referral.findAndCountAll({
            limit: PAGE_LIMIT,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
        } catch (error) {
            console.log('Find Error: ', error);
        }      
    }

    async findReferralById(id) {
        try {
            return await Referral.findByPk(id);    
        } catch (error) {
            console.log('Find Error: ', error);
        }       
    }

    async updateReferral(id, data) {
        try {
            const referral = await this.findById(id);
        if (!referral) return null;

        return await Referral.update(data);
        } catch (error) {
            console.log('Update Error: ', error);
        }     
    }

    async deleteReferral(id) {
        try {
            const deleted = await Referral.destroy({ where: { id } });
        return deleted > 0;
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }
}
