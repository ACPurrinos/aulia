import authService from '../services/authService.js';


const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);

        res.cookie('access_token', result.token, {
            httpOnly: true,    // Evitar que JavaScript acceda a la cookie
            secure: true,      // Se envía solo por HTTPS 
            sameSite: 'none', // Evita ataques CSRF
            maxAge: 3600000  // Tiempo de vida (1 hora en milisegundos)
        });

        return res.status(200).json({ 
            isLogin: true, 
            userid: result.userId,
            email: result.email,
            role: result.role,
            token: result.token // Eliminar en prodcción ya que se guarda en la cookie
        });

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

const authController = {
    login
}

export default authController;