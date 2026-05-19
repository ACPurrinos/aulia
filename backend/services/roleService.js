import RolRepository from "../repositories/RolRepository.js";


const findAllRoles = async()=>{
    try {
        const roles = await RolRepository.findAllRoles();
        if(roles.length === 0) {
            throw new Error('There are no roles');
        }
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