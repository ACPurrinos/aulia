import roleService from '../services/roleService.js';

const findRoleById = async(req, res)=>{
    try {
        const id = req.params.id;
        const foundRole = await roleService.findRoleByid(id);
        res.status(200).json(foundRole);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getAllRoles = async(req, res)=>{
    try {
        const { page } = req.query;
        const roles = await roleService.findAllRoles(page);
        if(roleService.length !== 0){
            res.status(200).json(roles);
        }else{
            res.status(400).json({message: 'No roles found'})
        } 
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const roleController = {
    findRoleById,
    getAllRoles
}

export default roleController;