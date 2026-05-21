import checkInService from '../services/checkInService.js';

const saveCheckIn = async(req, res)=>{
    try {
        const result = await checkInService.saveCheckIn(req.body);
        res.status(201).json({message: result.message, checkIn: result.checkIn});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getSummary = async(req, res)=>{
    try {
        const summary = await checkInService.getDailySummary();
        res.status(200).json({summary});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getHelperRequest = async(req, res)=>{
    try {
        const helperReq = await checkInService.getUrgentHelperRequest();
        res.status(200).json({helperReq});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const checkInController = {
    saveCheckIn,
    getHelperRequest,
    getSummary
}

export default checkInController;