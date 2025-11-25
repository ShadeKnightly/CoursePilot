import jwt from 'jsonwebtoken';
import config from '../config/config';

const generateToken = (user) => {
  // Create a token payload using user information
  return jwt.sign(
    { id: user.id, username: user.username },
    config.jwtSecret,                        // Sign the token with the secret key
    { expiresIn: config.jwtExpiresIn }       // Set token expiration time
  );
};

export default generateToken;
