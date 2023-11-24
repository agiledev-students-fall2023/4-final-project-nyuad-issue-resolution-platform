export default function checkReferer(req, res, next) {
    // Bypass referer check if in testing environment
    if (process.env.NODE_ENV === 'test') {
        return next();
      }
    const referer = req.headers.referer;
    if (!referer || !referer.startsWith(process.env.FRONTEND_URL)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  }
