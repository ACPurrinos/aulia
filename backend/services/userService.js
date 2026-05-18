import UserRepository from '../repositories/UserRepository.js';
import RolRepository from '../repositories/RolRepository.js';
import bcrypt from "bcryptjs";

const createUser = async(user)=>{
    try {
        const foundUsername = await UserRepository.findByUsername(user.username);

        if(foundUsername){
            throw new Error ('The username already exists');        
        }
        const foundUser = await UserRepository.findByEmail(user.email);

        if(foundUser){
            throw new Error ('The user already exists') 
        }
        const foundRole = await RolRepository.findByName(user.role);
        
        if(!foundRole){
            throw new Error ('The role dont exists'); 
        }

        

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password.trim(), salt);

        const us = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: hashedPassword,
            active: true,
            roleId: foundRole.id,
        });
        const savedUser = await us.save();
        if(savedUser){
            const userDto = createUserDto(savedUser);
            return {message: 'User created successfully', user: userDto};
        }else{
            throw new Error('Error while saving user');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserById = async(id)=>{
    try {
        const foundUser = await UserRepository.findUserById(id); 
        if(!foundUser) throw new Error('No user found');
        
        const userDto = createUserDto(foundUser);
        return userDto; 
    } catch (error) {
        throw new Error(error.message);
    }
}

const findAllUsers = async()=>{
    try {
        const users = await UserRepository.findAllUsers();
        if(users.lenght === 0){
            throw new Error('There arent users');
        }
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateUser = async(id, user)=>{
    try {
        const foundUser = await UserRepository.findUserById(id);
        if(!foundUser) throw new Error('No user found');

        if(user.role){
            const foundRole = await RolRepository.findByName(user.role);
            if(!foundRole){
                throw new Error ('The role dont exists'); 
            }
            user.roleId = foundRole.id;
            delete user.role;
        }
        if (user.password) {
            const foundUserWithPassword = await UserRepository.findUserByIdWithPassword(id);
            const isSamePassword = await bcrypt.compare(user.password.trim(), foundUserWithPassword.password);

            if (!isSamePassword) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            } else {
                user.password = foundUserWithPassword.password;
            }
        }       
        const updateUser = await UserRepository.updateUser(id, user);
        return {message: 'User updated successfully', user: updateUser};
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteUser = async(id)=>{
    try {
        const foundUser = await UserRepository.findUserById(id);
        if(!foundUser) throw new Error('No user found');

        const deleted = await UserRepository.deleteUser(id);
        if(!deleted) throw new Error('Error while deleting user');

        return deleted;
    } catch (error) {
        throw new Error(error.message);
    }
}

function createUserDto(user){
    const userDto = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        active: user.active
    };
    return userDto;
}

const userService = {
    createUser,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser
}

export default userService;