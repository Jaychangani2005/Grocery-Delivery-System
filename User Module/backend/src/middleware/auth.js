const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user info to request
    req.user = {
      id: decoded.userId,
      role: decoded.role || 'user'
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

module.exports = {
  authenticateToken,
  isAdmin
}; 