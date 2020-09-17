import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
// Valida nossas rotas, autenticação dela
// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não autorizado.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userUid = decoded.uid;
    req.userUid = decoded.name;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
