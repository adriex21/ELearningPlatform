const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/Users');

const jwtOptions = {
    secretOrKey: "secret",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  
  
  const tokenTypes = {
      ACCESS: 'access',
      REFRESH: 'refresh',
      RESET_PASSWORD: 'resetPassword',
      VERIFY_EMAIL: 'verifyEmail',
    };
    
  
  const jwtVerify = async (payload, done) => {
    try {
      const user = await User.findOne({_id:payload.sub});
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  };
  
  const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
  
  module.exports = {
    jwtStrategy,
  };