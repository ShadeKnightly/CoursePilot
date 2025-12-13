import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // This will have { sub: userId, role: userRole, username, iat, exp }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
