import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};


