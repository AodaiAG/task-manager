// Includes middleware functions responsible for authentication-related operations,
// such as verifying tokens before allowing access to certain routes.

const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get the token from the request headers, query parameters, or cookies
  const token = req.headers['authorization'];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key

    // Attach the decoded payload to the request object for use in subsequent middleware or routes
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = {
  verifyToken,
};
