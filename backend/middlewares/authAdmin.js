import jwt from 'jsonwebtoken';

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers; // Token sent from frontend

    // Check if token exists
    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: No token provided. Please login as admin.'
      });
    }

    let tokenDecoded;
    try {
      tokenDecoded = jwt.verify(atoken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: Token is invalid or has expired. Please login again.'
      });
    }

    // Check if the decoded token belongs to admin
    if (tokenDecoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to perform this action.'
      });
    }

    // Proceed to next middleware or controller
    next();
  } catch (error) {
    console.error('Admin Auth Middleware Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error: Unable to authenticate admin. Please try again later.'
    });
  }
};

export default authAdmin;
