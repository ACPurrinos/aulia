import userService from "../services/userService.js";

const saveUser = async (req, res) => {
    try {
        const created = await userService.createUser(req.body);
        res.status(201).json({ message: created.message, user: created.user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 

const listUsers = async (req, res)=>{
    try {
        const users = await userService.findAllUsers();
        if(users.length !== 0){
            res.status(200).json(users);
        }else{
            res.status(400).json({message: 'No users found'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}    

const findUserById = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await userService.findUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userService.updateUser(id, req.body);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        res.status(200).json({ cliente: result.cliente, message: result.message });
    } catch (error) {
        res.status(400).json({message: error.message});
    }    
};


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userService.deleteUser(id);

        if (!result){
            return res.status(400).json({error: 'User not found'});
        }
        res.status(200).json( {message: 'Deleted sucessfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const userController = {
    saveUser, 
    findUserById,
    listUsers,
    updateUser,
    deleteUser
}

export default userController;
