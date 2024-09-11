import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
// token Generation
export function signToken(user) {
  return jwt.sign({ userId: user.id}, SECRET_KEY,{expiresIn:'1h'});
}
// token Verification
export function verifyToken(token) {
  try {
  jwt.verify(token, SECRET_KEY);
    
  } catch (error) {
    return null;
  }
}
