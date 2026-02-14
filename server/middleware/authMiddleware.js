const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      
      token = req.headers.authorization.split(' ')[1];

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = await User.findById(decoded.id).select('-password');

      
      if (!req.user) {
        return res.status(401).json({ message: 'பயனர் கண்டறியப்படவில்லை!' });
      }

      next(); 
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      res.status(401).json({ message: 'அனுமதி இல்லை, டோக்கன் தவறானது!' });
    }
  }

  
  if (!token) {
    res.status(401).json({ message: 'அனுமதி இல்லை, டோக்கன் வழங்கப்படவில்லை!' });
  }
};

module.exports = { protect };