import { rateLimit } from 'express-rate-limit';

const rareLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

export default rareLimiter;
