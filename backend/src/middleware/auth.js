import { env } from '../config/env.js';

export function requireAdmin(req, res, next) {
  if (req.headers['x-admin-token'] !== env.adminToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
}
