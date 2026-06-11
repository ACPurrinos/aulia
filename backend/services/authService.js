import UserRepository from "../repositories/UserRepository.js";
import RolRepository from "../repositories/RolRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const loginUser = async (user) => {
    try { 
        if (!user.username.toLowerCase().trim() || !user.password.trim()) {
        throw new Error('Username and password are required');
        }
        const foundUser = await UserRepository.findUserByUsernameWithPassword(user.username.toLowerCase().trim());
        if (!foundUser) {
        throw new Error('Invalid credentials');
        }
        const foundRole = await RolRepository.findRolById(foundUser.roleId);
        
        const isMatch = await bcrypt.compare(user.password, foundUser.password);
        if (!isMatch) {
        throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ 
            id: foundUser.id,
            username: foundUser.username,
            role: foundRole.name
            }, 
            process.env.SECRET_KEY, 
            {expiresIn: "1h"});

        return {islogin: true, token: token, userId: foundUser.id, email: foundUser.email, role: foundRole.name};
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};


const authService = {
    loginUser
}

export default authService;