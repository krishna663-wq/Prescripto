import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: No token provided. Please login again.'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed: Token is invalid or has expired. Please login again.'
      });
    }

    next();
  } catch (error) {
    console.error("Auth User Error:", error);
    return res.status(500).json({
      success: false,
      message: 'Server error: Unable to authenticate user. Please try again later.'
    });
  }
};

export default authUser;
