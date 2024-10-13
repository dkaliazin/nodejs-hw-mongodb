import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';
import { findSessionByAccessToken } from '../services/auth.js';
export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await findSessionByAccessToken(token);

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
  return next(createHttpError(401, 'Access token expired'));
}
  //check userid

  console.log('Session:', session);
  console.log('User ID:', session.userId);
  //userId
  const user = await UsersCollection.findById(session.userId);
  //check user
  console.log('user:', user);
  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;
  //res
  console.log('User set in request:', req.user);
  next();
};
