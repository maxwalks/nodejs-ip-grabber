const expressRatelimit = require('express-rate-limit')

const ratelimit = expressRatelimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "You have exceeded the rate limit. Please try again in 15 minutes.",
  headers: true
});

module.exports = ratelimit;