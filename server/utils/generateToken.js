import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (user) => {
  // Create a token payload using user information
  // Use standard JWT claim 'sub' for subject (user ID)
  return jwt.sign(
    { 
      sub: user.userID,      // Subject (user ID) - standard JWT claim
      username: user.username,
      role: user.role || 'student'  // Include role for authorization
    },
    config.jwtSecret,                        // Sign the token with the secret key
    { expiresIn: config.jwtExpiresIn }       // Set token expiration time
  );
};

export default generateToken;
