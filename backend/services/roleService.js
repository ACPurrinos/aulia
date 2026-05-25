import RolRepository from "../repositories/RolRepository.js";


const findAllRoles = async(page = 1)=>{
    try {
        const roles = await RolRepository.findAllRoles(page);
        return roles;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findRoleByid = async(id)=>{
    try{
        const rol = await RolRepository.findRolById(id);

        if(!rol){
            throw new Error('Rol not found');
        }
        return rol;
    }catch(error){
        throw new Error(error.message);
    }
} 

const roleService = {
    findAllRoles,
    findRoleByid
}

export default roleService;