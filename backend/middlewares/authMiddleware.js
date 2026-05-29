import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token requerido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY, {
            algorithms: ["HS256"],
        });
        req.user = decoded; // contiene { id, username, role name}
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.name === "TokenExpiredError"
                ? "Expired token"
                : "Invalid token",
        });
    }
};

export const authorize = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
            message: `Access denied: requires ${roles.join(" or ")}` 
        });
    }

    next();
};