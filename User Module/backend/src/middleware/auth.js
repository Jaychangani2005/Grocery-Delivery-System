const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  try {
    // For development, we'll use a simple token check
    // In production, you would verify the token with jwt.verify()
    if (token.startsWith('mock-jwt-token-')) {
      // Extract user ID from the token (for demo purposes)
      const userId = 1; // Default to user ID 1 for testing
      req.user = { id: userId };
      next();
    } else {
      return res.status(403).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken
}; 